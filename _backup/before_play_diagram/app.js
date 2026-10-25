// State
const IS_VIEWER = document.body.dataset.mode === 'viewer';
const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
let rawGamesData = []; // Array of { gameName: string, data: array }
let parsedGamesData = []; // Array of processed game data
let runPassChartInstance = null;
let personnelChartInstance = null;
let deepDiveChartInstances = [];
let perRpTrendChartInstance = null;

// DOM Elements
const fileInput = document.getElementById('file-input');
const uploadStatus = document.getElementById('upload-status');
const dropZone = document.getElementById('drop-zone');
const emptyState = document.getElementById('empty-state');
const dashboardContent = document.getElementById('dashboard-content');
const alertsContainer = document.getElementById('alerts-container');
const personnelSelect = document.getElementById('personnel-select');
const favoritePlaysTable = document.getElementById('favorite-plays-table').querySelector('tbody');
const clearBtn = document.getElementById('clear-btn');

// Filters & Matrix UI
const filterBar = document.getElementById('filter-bar');
const filterDown = document.getElementById('filter-down');
const filterDistance = document.getElementById('filter-distance');
const trendsMatrixHead = document.getElementById('trends-matrix-head');
const trendsMatrixBody = document.getElementById('trends-matrix-body');
const exportCsvBtn = document.getElementById('export-csv-btn');

// Settings UI
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const settingsSave = document.getElementById('settings-save');
const settingsCancel = document.getElementById('settings-cancel');
const settingShortMin = document.getElementById('setting-short-min');
const settingShortMax = document.getElementById('setting-short-max');
const settingMedMin = document.getElementById('setting-med-min');
const settingMedMax = document.getElementById('setting-med-max');
const settingLongMin = document.getElementById('setting-long-min');
const optShort = document.getElementById('opt-short');
const optMed = document.getElementById('opt-med');
const optLong = document.getElementById('opt-long');

let distShortMin = 1;
let distShortMax = 3;
let distMedMin = 4;
let distMedMax = 7;
let distLongMin = 8;

// Event Listeners
if (fileInput) fileInput.addEventListener('change', handleFileUpload);
personnelSelect.addEventListener('change', updateDeepDive);
if (clearBtn) clearBtn.addEventListener('click', clearData);
const exportAppBtn = document.getElementById('export-app-btn');
if (exportAppBtn) exportAppBtn.addEventListener('click', exportAppData);
filterDown.addEventListener('change', handleFilterChange);
filterDistance.addEventListener('change', handleFilterChange);
exportCsvBtn.addEventListener('click', exportMatrixToCSV);

settingsBtn.addEventListener('click', () => {
    settingShortMin.value = distShortMin;
    settingShortMax.value = distShortMax;
    settingMedMin.value = distMedMin;
    settingMedMax.value = distMedMax;
    settingLongMin.value = distLongMin;
    settingsModal.style.display = 'flex';
});

settingsCancel.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

settingsSave.addEventListener('click', () => {
    const sMin = parseInt(settingShortMin.value);
    const sMax = parseInt(settingShortMax.value);
    const mMin = parseInt(settingMedMin.value);
    const mMax = parseInt(settingMedMax.value);
    const lMin = parseInt(settingLongMin.value);
    
    if (!isNaN(sMin) && !isNaN(sMax) && !isNaN(mMin) && !isNaN(mMax) && !isNaN(lMin)) {
        applyDistanceSettings({ shortMin: sMin, shortMax: sMax, medMin: mMin, medMax: mMax, longMin: lMin });
        
        settingsModal.style.display = 'none';
        handleFilterChange();
    } else {
        alert("正しい数値を入力してください。");
    }
});

function applyDistanceSettings(st) {
    distShortMin = st.shortMin;
    distShortMax = st.shortMax;
    distMedMin = st.medMin;
    distMedMax = st.medMax;
    distLongMin = st.longMin;

    optShort.textContent = `Short (${distShortMin}-${distShortMax}yd)`;
    optMed.textContent = `Middle (${distMedMin}-${distMedMax}yd)`;
    optLong.textContent = `Long (${distLongMin}yd+)`;
}

function handleFilterChange() {
    processData();
    renderDashboard();
}

function clearData() {
    rawGamesData = [];
    parsedGamesData = [];
    fileInput.value = '';
    
    if (runPassChartInstance) { runPassChartInstance.destroy(); runPassChartInstance = null; }
    if (personnelChartInstance) { personnelChartInstance.destroy(); personnelChartInstance = null; }
    deepDiveChartInstances.forEach(c => c.destroy());
    deepDiveChartInstances = [];
    document.getElementById('deep-dive-charts').innerHTML = '';
    
    alertsContainer.innerHTML = '';
    alertsContainer.style.display = '';
    const noMatchMsg = document.getElementById('no-match-msg');
    if (noMatchMsg) noMatchMsg.style.display = 'none';
    favoritePlaysTable.innerHTML = '';
    trendsMatrixHead.innerHTML = '';
    trendsMatrixBody.innerHTML = '';
    personnelSelect.innerHTML = '<option value="">Select Personnel...</option>';
    
    uploadStatus.textContent = 'ファイルを選択、またはここにドラッグ＆ドロップ';
    dashboardContent.style.display = 'none';
    filterBar.style.display = 'none';
    clearBtn.style.display = 'none';
    exportAppBtn.style.display = 'none';
    emptyState.style.display = 'flex';
}

const dragOverlay = document.getElementById('drag-overlay');
let dragCounter = 0;

// Global Drag and Drop Overlay
if (!IS_VIEWER) {
document.body.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dragCounter++;
    if (parsedGamesData.length > 0) { 
        dragOverlay.style.display = 'flex';
    }
});
document.body.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dragCounter--;
    if (dragCounter === 0) {
        dragOverlay.style.display = 'none';
    }
});
document.body.addEventListener('dragover', (e) => {
    e.preventDefault();
});
document.body.addEventListener('drop', (e) => {
    e.preventDefault();
    dragCounter = 0;
    dragOverlay.style.display = 'none';
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        handleFileUpload({ target: fileInput });
    }
});
}

// Drag and Drop support function
function setupDragAndDrop(element) {
    element.addEventListener('dragover', (e) => {
        e.preventDefault();
        element.classList.add('drag-active');
    });
    element.addEventListener('dragleave', (e) => {
        e.preventDefault();
        element.classList.remove('drag-active');
    });
    element.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter = 0;
        if (dragOverlay) dragOverlay.style.display = 'none';
        element.classList.remove('drag-active');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            handleFileUpload({ target: fileInput });
        }
    });
}

if (!IS_VIEWER) {
    setupDragAndDrop(dropZone);
    setupDragAndDrop(emptyState);
    window.addEventListener('load', () => {
        const extraSaved = window.TBShared && window.TBShared.loadExtra ? window.TBShared.loadExtra() : null;
        if (extraSaved) {
            clearBtn.style.display = 'flex';
            exportAppBtn.style.display = 'flex';
            if (rawGamesData.length === 0 && extraSaved.pdfFileName) {
                uploadStatus.textContent = `PDF（${extraSaved.pdfFileName}）読み込み済み`;
            }
        }
    });
}

async function handleFileUpload(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const pdfFiles = files.filter(f => /\.pdf$/i.test(f.name) || f.type === 'application/pdf');
    const excelFiles = files.filter(f => !(/\.pdf$/i.test(f.name) || f.type === 'application/pdf'));

    uploadStatus.textContent = `${files.length} ファイルを読み込み中...`;
    
    // クリアボタンが押されるまでデータを蓄積（追加）するように変更
    try {
        // 1. PDF（Member List / Cadence）の取り込み
        let importedPdfName = null;
        if (pdfFiles.length > 0 && window.TBScoutingExtra && window.TBScoutingExtra.importFromPdfFile) {
            for (const pf of pdfFiles) {
                await window.TBScoutingExtra.importFromPdfFile(pf);
                importedPdfName = pf.name;
            }
        }

        // 2. Excel / CSV（試合データ）の取り込み
        for (let i = 0; i < excelFiles.length; i++) {
            const file = excelFiles[i];
            const baseGameName = file.name.split('.')[0];
            
            const data = await readExcelFile(file);
            
            // If single file with multiple sheets, use sheets as games
            if (excelFiles.length === 1 && data.length > 1) {
                // Filter out empty sheets
                const validSheets = data.filter(sheet => sheet.data && sheet.data.length > 0);
                validSheets.forEach(sheet => {
                    // 重複チェック
                    if (!rawGamesData.some(g => g.gameName === sheet.gameName)) {
                        rawGamesData.push(sheet);
                    }
                });
            } else {
                // 1ファイル1試合の場合
                // 重複チェック
                if (!rawGamesData.some(g => g.gameName.includes(baseGameName))) {
                    rawGamesData.push({
                        gameName: `Game ${rawGamesData.length + 1} (${baseGameName})`,
                        data: data[0].data
                    });
                }
            }
        }

        const extraSaved = window.TBShared && window.TBShared.loadExtra ? window.TBShared.loadExtra() : null;
        const pdfLabel = (importedPdfName || (extraSaved && extraSaved.pdfFileName))
            ? ` ＋ PDF（${importedPdfName || extraSaved.pdfFileName}）`
            : '';

        if (rawGamesData.length > 0) {
            processData();
            renderDashboard();
            uploadStatus.textContent = `読み込み完了（${parsedGamesData.length} 試合${pdfLabel}）`;
            showDashboard();
        } else if (importedPdfName) {
            uploadStatus.textContent = `PDF（${importedPdfName}）から Member List・Cadence を取り込みました！`;
        }

        clearBtn.style.display = 'flex';
        exportAppBtn.style.display = 'flex';
    } catch (error) {
        console.error("Error reading file:", error);
        uploadStatus.textContent = "読み込みエラー: " + (error.message || "ファイルの解析に失敗しました。");
    }
}

function showDashboard() {
    emptyState.style.display = 'none';
    dashboardContent.style.display = 'grid';
    filterBar.style.display = 'flex';
}

// 母体：閲覧アプリ用のデータファイル（data.json）を書き出す
async function exportAppData() {
    const hasExtra = !!(window.TBShared && window.TBShared.loadExtra && window.TBShared.loadExtra());
    if (rawGamesData.length === 0 && !hasExtra) return;
    if (!window.TBSecure || !window.TBSecure.cryptoAvailable()) {
        alert('このブラウザでは暗号化できません。Chrome か Safari の最新版で開いてください。');
        return;
    }
    const password = await window.TBSecure.askNewPassword();
    if (!password) return;
    const payload = {
        version: 1,
        exportedAt: new Date().toISOString(),
        settings: { shortMin: distShortMin, shortMax: distShortMax, medMin: distMedMin, medMax: distMedMax, longMin: distLongMin },
        games: rawGamesData,
        // 4つの分析画面用：読み込んだ元のExcel/CSVファイル
        files: (window.TBShared && window.TBShared.load()) ? window.TBShared.load().files : [],
        // Down & Distance 画面のヤード設定（未設定なら初期値のまま）
        ddSettings: (window.TBShared && window.TBShared.loadDdSettings()) || null,
        // Member List / Cadence のデータ
        scoutingExtra: (window.TBShared && window.TBShared.loadExtra && window.TBShared.loadExtra()) || (window.TBScoutingExtra && window.TBScoutingExtra.getExtraData()) || null
    };
    // パスワードで暗号化してから書き出す
    const encrypted = await window.TBSecure.encrypt(payload, password);
    const blob = new Blob([JSON.stringify(encrypted)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// 閲覧アプリ：公開されている data.json を読み込んで表示する
async function loadPublishedData() {
    const statusEl = document.getElementById('viewer-status');
    try {
        const payload = await window.TBSecure.getPublished();
        rawGamesData = payload.games || [];
        if (payload.settings) applyDistanceSettings(payload.settings);
        processData();
        if (parsedGamesData.length === 0) throw new Error('no games');
        renderDashboard();
        showDashboard();
        if (statusEl && payload.exportedAt) {
            const d = new Date(payload.exportedAt);
            statusEl.textContent = `最終更新：${d.toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}（${parsedGamesData.length} 試合）`;
        }
    } catch (err) {
        console.error('Error loading data.json:', err);
        if (statusEl) statusEl.textContent = 'データを読み込めませんでした。' + (/https/.test(err.message) ? err.message : '');
        const msg = emptyState.querySelector('p');
        if (msg) msg.textContent = 'まだデータが公開されていないか、通信に失敗しました。';
    }
}

if (IS_VIEWER) loadPublishedData();

function readExcelFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetsData = [];
                
                workbook.SheetNames.forEach(sheetName => {
                    const sheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
                    sheetsData.push({ gameName: sheetName, data: json });
                });
                
                resolve(sheetsData);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = reject;
        reader.readAsBinaryString(file);
    });
}

// 1つのシートに複数試合が入っている場合、OPP TEAM（＋SEASON）ごとに試合を分ける
// 同じ相手の行が途中で離れていても、同じ相手なら1つのグループにまとめる
function splitGamesByOpponent(game) {
    const rows = game.data || [];
    let headerRowIdx = -1, oppCol = -1, seasonCol = -1;
    for (let i = 0; i < rows.length; i++) {
        const cells = (rows[i] || []).map(c => String(c || '').trim().toUpperCase());
        const hasType = cells.includes('PLAY TYPE(D)') || cells.includes('PLAY TYPE');
        if (hasType && cells.includes('PERSONNEL') && cells.includes('OFF FORM')) {
            headerRowIdx = i;
            oppCol = cells.findIndex(c => c === 'OPP TEAM' || c === 'OPPONENT');
            seasonCol = cells.indexOf('SEASON');
            break;
        }
    }
    if (headerRowIdx === -1 || oppCol === -1) return [game];

    const head = rows.slice(0, headerRowIdx + 1);
    const groups = new Map();
    const keyOrder = [];
    let currentKey = null;

    for (let i = headerRowIdx + 1; i < rows.length; i++) {
        const row = rows[i] || [];
        const opp = String(row[oppCol] || '').trim();
        const season = seasonCol !== -1 ? String(row[seasonCol] || '').trim() : '';
        const key = opp ? `${season}|${opp}` : currentKey; // 空欄の行は直前の試合に含める
        if (!key) continue;
        currentKey = key;

        if (!groups.has(key)) {
            groups.set(key, []);
            keyOrder.push(key);
        }
        groups.get(key).push(row);
    }
    if (keyOrder.length <= 1) return [game];
    return keyOrder.map((key, idx) => ({
        gameName: `${game.gameName} #${idx + 1}`,
        data: head.concat(groups.get(key))
    }));
}

// 試合名（または対戦相手名）を特定する
function getGameTargetName(game) {
    const rows = game.data || [];
    let headerRowIdx = -1, oppCol = -1, seasonCol = -1;
    for (let i = 0; i < Math.min(rows.length, 30); i++) {
        const cells = (rows[i] || []).map(c => String(c || '').trim().toUpperCase());
        const hasType = cells.includes('PLAY TYPE(D)') || cells.includes('PLAY TYPE');
        if (hasType && cells.includes('PERSONNEL') && cells.includes('OFF FORM')) {
            headerRowIdx = i;
            oppCol = cells.findIndex(c => c === 'OPP TEAM' || c === 'OPPONENT');
            seasonCol = cells.indexOf('SEASON');
            break;
        }
    }
    if (headerRowIdx !== -1 && oppCol !== -1) {
        for (let i = headerRowIdx + 1; i < rows.length; i++) {
            const row = rows[i] || [];
            const opp = String(row[oppCol] || '').trim();
            const season = seasonCol !== -1 ? String(row[seasonCol] || '').trim() : '';
            if (opp) {
                return season ? `${season} vs ${opp}` : `vs ${opp}`;
            }
        }
    }
    return game.gameName;
}

// 同じ対戦相手（同じ試合名）のデータは、シートやファイルが分かれていても1つの試合に合体する
function mergeGamesByName(gameList) {
    const map = new Map();
    const order = [];

    gameList.forEach(game => {
        const targetName = getGameTargetName(game);
        const rows = game.data || [];

        let headerRowIdx = -1;
        for (let i = 0; i < Math.min(rows.length, 30); i++) {
            const cells = (rows[i] || []).map(c => String(c || '').trim().toUpperCase());
            const hasType = cells.includes('PLAY TYPE(D)') || cells.includes('PLAY TYPE');
            if (hasType && cells.includes('PERSONNEL') && cells.includes('OFF FORM')) {
                headerRowIdx = i;
                break;
            }
        }
        const head = headerRowIdx !== -1 ? rows.slice(0, headerRowIdx + 1) : (rows.length > 0 ? [rows[0]] : []);
        const headerRow = headerRowIdx !== -1 ? rows[headerRowIdx] : (rows[0] || []);
        const body = headerRowIdx !== -1 ? rows.slice(headerRowIdx + 1) : rows.slice(1);

        if (!map.has(targetName)) {
            map.set(targetName, { gameName: targetName, head, headerRow, rows: [] });
            order.push(targetName);
        }
        const item = map.get(targetName);

        // ヘッダー列が一致していればそのまま追加、異なれば列順を合わせる
        const baseHeader = (item.headerRow || []).map(c => String(c || '').trim().toUpperCase());
        const curHeader = (headerRow || []).map(c => String(c || '').trim().toUpperCase());
        const isSameHeader = baseHeader.length === curHeader.length && baseHeader.every((c, idx) => c === curHeader[idx]);

        if (isSameHeader) {
            item.rows.push(...body);
        } else {
            const colMap = baseHeader.map(colName => curHeader.indexOf(colName));
            body.forEach(row => {
                const alignedRow = colMap.map(colIdx => (colIdx !== -1 ? row[colIdx] : ''));
                item.rows.push(alignedRow);
            });
        }
    });

    return order.map(name => {
        const item = map.get(name);
        return {
            gameName: item.gameName,
            data: item.head.concat(item.rows)
        };
    });
}

function processData() {
    const rawSplit = rawGamesData.flatMap(splitGamesByOpponent);
    const games = mergeGamesByName(rawSplit);
    parsedGamesData = games.map(game => {
        const plays = [];
        let totalPlays = 0;
        let totalRun = 0;
        let totalPass = 0;
        let unfilteredPlays = 0; // フィルターをかける前のRun/Passプレー数

        const rows = game.data;
        
        // Find header row and column indices dynamically
        let headerRowIdx = -1;
        let colIdx = { type: -1, per: -1, form: -1, play: -1, opp: -1, season: -1, down: -1, dist: -1 };
        
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            let foundType = -1, foundPer = -1, foundForm = -1, foundPlay = -1, foundOpp = -1, foundSeason = -1, foundDown = -1, foundDist = -1;
            
            for (let j = 0; j < row.length; j++) {
                const cell = String(row[j] || '').trim().toUpperCase();
                if (cell === 'PLAY TYPE(D)' || cell === 'PLAY TYPE') foundType = j;
                else if (cell === 'PERSONNEL') foundPer = j;
                else if (cell === 'OFF FORM') foundForm = j;
                else if (cell === 'OFF PLAY') foundPlay = j;
                else if (cell === 'OPP TEAM' || cell === 'OPPONENT') foundOpp = j;
                else if (cell === 'SEASON') foundSeason = j;
                else if (cell === 'DN' || cell === 'DOWN') foundDown = j;
                else if (cell === 'DIST' || cell === 'DISTANCE') foundDist = j;
            }
            
            if (foundType !== -1 && foundPer !== -1 && foundForm !== -1) {
                headerRowIdx = i;
                colIdx = { 
                    type: foundType, per: foundPer, form: foundForm, 
                    play: foundPlay !== -1 ? foundPlay : 21,
                    opp: foundOpp, season: foundSeason,
                    down: foundDown, dist: foundDist
                };
                break;
            }
        }

        if (headerRowIdx === -1) {
            headerRowIdx = 0;
            colIdx = { type: 13, per: 14, form: 15, play: 21, opp: -1, season: -1, down: -1, dist: -1 }; 
        }

        let oppName = "";
        let seasonName = "";
        
        const filterDownVal = filterDown ? filterDown.value : 'ALL';
        const filterDistVal = filterDistance ? filterDistance.value : 'ALL';

        for (let i = headerRowIdx + 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length === 0) continue;

            if (!oppName && colIdx.opp !== -1 && row[colIdx.opp]) {
                oppName = String(row[colIdx.opp]).trim();
            }
            if (!seasonName && colIdx.season !== -1 && row[colIdx.season]) {
                seasonName = String(row[colIdx.season]).trim();
            }

            const typeCell = String(row[colIdx.type] || "").trim().toLowerCase();
            const perCell = String(row[colIdx.per] || "").trim();
            const formCell = String(row[colIdx.form] || "").trim();
            const playCell = String(row[colIdx.play] || "").trim();
            const downCell = colIdx.down !== -1 ? String(row[colIdx.down] || "").trim() : "";
            // DIST：「inches」などインチを表す文字は Short 扱い（1ヤード未満）。空欄や他の文字は「距離不明」
            const distRaw = colIdx.dist !== -1 ? String(row[colIdx.dist] ?? "").trim() : "";
            const isInches = /inch/i.test(distRaw) || /^(in|inc|ins)\.?$/i.test(distRaw) || /^<\s*1/.test(distRaw);
            const distCell = isInches ? 0.5 : parseFloat(distRaw);

            if (typeCell === 'run' || typeCell === 'pass') unfilteredPlays += 1;

            // Apply Filters
            if (filterDownVal !== 'ALL' && downCell !== filterDownVal) continue;
            
            if (filterDistVal !== 'ALL') {
                // 距離がわからない行は、Short/Middle/Long を選んだときは数えない
                if (isNaN(distCell)) continue;
                if (filterDistVal === 'SHORT' && !isInches && (distCell < distShortMin || distCell > distShortMax)) continue;
                if (filterDistVal === 'MEDIUM' && (distCell < distMedMin || distCell > distMedMax)) continue;
                if (filterDistVal === 'LONG' && distCell < distLongMin) continue;
            }

            if (typeCell === 'run' || typeCell === 'pass') {
                plays.push({
                    per: perCell,
                    formation: formCell,
                    type: typeCell,
                    favoritePlays: playCell
                });
            }
        }

        // Calculate totals for the game based on parsed plays
        const perStats = {};
        plays.forEach(p => {
            if (!perStats[p.per]) perStats[p.per] = { run: 0, pass: 0, formations: {} };
            if (!perStats[p.per].formations[p.formation]) perStats[p.per].formations[p.formation] = { run: 0, pass: 0, plays: [] };
            
            perStats[p.per][p.type] += 1;
            perStats[p.per].formations[p.formation][p.type] += 1;
            
            if (p.favoritePlays) {
                perStats[p.per].formations[p.formation].plays.push({ type: p.type, text: p.favoritePlays });
            }
            
            totalPlays += 1;
            if (p.type === 'run') totalRun += 1;
            if (p.type === 'pass') totalPass += 1;
        });

        // Aggregate favorite plays (e.g. 3x ISO PAP -> "ISO PAP (3)")
        Object.keys(perStats).forEach(per => {
            Object.keys(perStats[per].formations).forEach(form => {
                const rawPlays = perStats[per].formations[form].plays;
                const playCounts = {};
                rawPlays.forEach(rp => {
                    const key = `[${rp.type.toUpperCase()}] ${rp.text}`;
                    playCounts[key] = (playCounts[key] || 0) + 1;
                });
                
                const aggregatedPlays = Object.keys(playCounts)
                    .map(key => ({ text: `${key} <span style="opacity: 0.6">(${playCounts[key]})</span>`, count: playCounts[key] }))
                    .sort((a,b) => b.count - a.count)
                    .map(item => item.text);
                
                perStats[per].formations[form].aggregatedPlays = aggregatedPlays;
            });
        });

        let finalGameName = game.gameName;
        if (oppName) {
            if (seasonName) {
                finalGameName = `${seasonName} vs ${oppName}`;
            } else {
                finalGameName = `vs ${oppName}`;
            }
        }

        return {
            gameName: finalGameName,
            unfilteredPlays,
            totalPlays,
            totalRun,
            totalPass,
            runPercent: totalPlays ? (totalRun / totalPlays) * 100 : 0,
            passPercent: totalPlays ? (totalPass / totalPlays) * 100 : 0,
            perStats
        };
    }).filter(g => g.unfilteredPlays > 0); // プレーが1つもない試合（空のシートなど）だけ除く。フィルターで0件になった試合は残す

    // 同じ相手名・試合名のデータは mergeGamesByName で1つに自動統合されます
}

// フィルターに当てはまるプレーが1つもないときの表示切り替え
function showNoMatch(noMatch) {
    let msg = document.getElementById('no-match-msg');
    if (!msg) {
        msg = document.createElement('div');
        msg.id = 'no-match-msg';
        msg.style.cssText = 'display:none;background:#fff;border:1px solid var(--border-color);border-radius:12px;padding:32px 16px;text-align:center;color:#64748b;font-weight:600;';
        msg.textContent = 'この条件に当てはまるプレーはありません。フィルターを変えてください。';
        dashboardContent.parentNode.insertBefore(msg, dashboardContent);
    }
    msg.style.display = noMatch ? 'block' : 'none';
    dashboardContent.style.display = noMatch ? 'none' : 'grid';
    const alerts = document.getElementById('alerts-container');
    if (alerts) alerts.style.display = noMatch ? 'none' : '';
}

function renderDashboard() {
    if (parsedGamesData.every(g => g.totalPlays === 0)) {
        // データは読み込み済みだが、フィルターの結果が0件 → 前の表を残さず、その旨を表示する
        if (rawGamesData.length > 0 && filterBar.style.display !== 'none') showNoMatch(true);
        return;
    }
    if (document.getElementById('no-match-msg')) showNoMatch(false);

    renderOverviewCharts();
    populatePersonnelSelect();
    analyzeTendencyBreakers();
    
    if (personnelSelect.options.length > 1) {
        personnelSelect.selectedIndex = 1;
        updateDeepDive();
    }
}

// 折れ線グラフ（Run % / Pass %）の軸設定
// 目盛りと線は 0〜100 の範囲だけ。100% / 0% の数字は、グラフの外側の余白（上は layout.padding、下は試合名との間）に出す。
// 左右は半マスぶん内側に寄せて、端の試合の数字が軸の数字と重ならないようにする
function percentLineScales() {
    return {
        x: { offset: true, ticks: { padding: 18 }, grid: { drawTicks: false } },
        y: { min: 0, max: 100, ticks: { stepSize: 20 } }
    };
}

// 凡例（Run % / Pass %）とグラフの間に余白をとる（100% の数字が凡例と重ならないように）
const legendGapPlugin = {
    id: 'legendGap',
    beforeInit(chart) {
        const originalFit = chart.legend.fit;
        chart.legend.fit = function fit() {
            originalFit.call(this);
            this.height += 20;
        };
    }
};

// 折れ線グラフ（Run % / Pass %）で、その試合の値がもう一方より高いかどうか
function isHigherSeries(context) {
    const other = context.chart.data.datasets[1 - context.datasetIndex];
    const v = Number(context.dataset.data[context.dataIndex]);
    const o = other ? Number(other.data[context.dataIndex]) : NaN;
    if (isNaN(o) || v === o) return context.datasetIndex === 0;
    return v > o;
}

function renderOverviewCharts() {
    const labels = parsedGamesData.map(g => g.gameName);
    
    // Run / Pass Chart
    // フィルターで0件になった試合は null（線を切って、点も数字も出さない）
    const runData = parsedGamesData.map(g => g.totalPlays ? g.runPercent : null);
    const passData = parsedGamesData.map(g => g.totalPlays ? g.passPercent : null);

    if (runPassChartInstance) runPassChartInstance.destroy();
    const ctxRP = document.getElementById('runPassChart').getContext('2d');
    runPassChartInstance = new Chart(ctxRP, {
        type: 'line',
        data: {
            labels,
            datasets: [
                { label: 'Run %', data: runData, borderColor: '#ef4444', backgroundColor: '#ef4444', tension: 0, fill: false, borderWidth: 3, clip: 12 },
                { label: 'Pass %', data: passData, borderColor: '#3b82f6', backgroundColor: '#3b82f6', tension: 0, fill: false, borderWidth: 3, clip: 12 }
            ]
        },
        plugins: [ChartDataLabels, legendGapPlugin],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { left: 6, right: 26, top: 6 } },
            scales: percentLineScales(),
            plugins: { 
                legend: { position: 'top' },
                datalabels: {
                    // 値が高い方の数字は点の上、低い方は点の下に出す（同じ値ならRunが上）
                    align: function(context) { return isHigherSeries(context) ? 'top' : 'bottom'; },
                    anchor: function(context) { return isHigherSeries(context) ? 'end' : 'start'; },
                    display: function(context) { return context.dataset.data[context.dataIndex] !== null; },
                    offset: 4,
                    clamp: true,
                    clip: false,
                    formatter: function(value) {
                        return Math.round(value) + '%';
                    },
                    font: {
                        weight: 'bold'
                    },
                    color: function(context) {
                        return context.dataset.borderColor;
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + Number(context.raw).toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });

    // Personnel Usage Chart
    const allPers = new Set();
    parsedGamesData.forEach(g => Object.keys(g.perStats).forEach(p => {
        if (p) allPers.add(p);
    }));
    const perArray = Array.from(allPers);

    const datasets = perArray.map((per, index) => {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];
        const data = parsedGamesData.map(g => {
            const stats = g.perStats[per];
            if (!stats) return 0;
            return ((stats.run + stats.pass) / g.totalPlays) * 100;
        });
        return {
            label: per + ' Per',
            data,
            backgroundColor: colors[index % colors.length]
        };
    });

    if (personnelChartInstance) personnelChartInstance.destroy();
    const ctxPer = document.getElementById('personnelChart').getContext('2d');
    personnelChartInstance = new Chart(ctxPer, {
        type: 'bar',
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { x: { stacked: true }, y: { stacked: true, min: 0, max: 100 } },
            plugins: { legend: { position: isMobile() ? 'bottom' : 'right' } }
        }
    });
}

function populatePersonnelSelect() {
    const allPers = new Set();
    parsedGamesData.forEach(g => Object.keys(g.perStats).forEach(p => {
        if (p) allPers.add(p);
    }));
    
    personnelSelect.innerHTML = '<option value="">Select Personnel...</option>';
    Array.from(allPers).sort().forEach(per => {
        const option = document.createElement('option');
        option.value = per;
        option.textContent = `${per} Personnel`;
        personnelSelect.appendChild(option);
    });
}

function updateDeepDive() {
    const per = personnelSelect.value;
    if (!per) return;

    deepDiveChartInstances.forEach(c => c.destroy());
    deepDiveChartInstances = [];
    const chartsContainer = document.getElementById('deep-dive-charts');
    chartsContainer.innerHTML = '';

    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b', '#ef4444', '#14b8a6', '#f43f5e', '#84cc16'];
    const globalFormColors = {};
    const globalFormUsage = {};
    let maxY = 0;
    let colorIdx = 0;

    parsedGamesData.forEach(g => {
        if (g.perStats[per]) {
            const perTotal = g.perStats[per].run + g.perStats[per].pass;
            Object.keys(g.perStats[per].formations).forEach(f => {
                const stats = g.perStats[per].formations[f];
                const formTotal = stats.run + stats.pass;
                
                // Track global usage for sorting
                if (!globalFormUsage[f]) globalFormUsage[f] = 0;
                globalFormUsage[f] += formTotal;

                // Track max percentage for Y-axis scaling
                const pct = (formTotal / perTotal) * 100;
                if (pct > Math.ceil(maxY)) maxY = Math.ceil(pct);

                if (!globalFormColors[f]) {
                    globalFormColors[f] = colors[colorIdx % colors.length];
                    colorIdx++;
                }
            });
        }
    });

    // Round maxY up to the nearest 10 for clean grid lines
    maxY = Math.ceil(maxY / 10) * 10;
    if (maxY === 0) maxY = 100;

    parsedGamesData.forEach((g) => {
        if (!g.perStats[per]) return;

        const forms = Object.keys(g.perStats[per].formations);
        if (forms.length === 0) return;

        // 試合ごとの「体型（フォーメーション）の出現回数」が多い順にソート（ユーザー要望）
        forms.sort((a, b) => {
            const totalA = g.perStats[per].formations[a].run + g.perStats[per].formations[a].pass;
            const totalB = g.perStats[per].formations[b].run + g.perStats[per].formations[b].pass;
            return totalB - totalA;
        });

        const wrapper = document.createElement('div');
        wrapper.className = 'deep-dive-chart-wrapper';
        const canvas = document.createElement('canvas');
        wrapper.appendChild(canvas);
        chartsContainer.appendChild(wrapper);

        const labels = forms;
        const data = forms.map(form => {
            const stats = g.perStats[per].formations[form];
            const perTotal = g.perStats[per].run + g.perStats[per].pass;
            return ((stats.run + stats.pass) / perTotal) * 100;
        });
        const backgroundColors = forms.map(form => globalFormColors[form]);

        const chart = new Chart(canvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Usage %',
                    data,
                    backgroundColor: backgroundColors,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    title: { display: true, text: g.gameName },
                    legend: { display: false }
                },
                scales: {
                    x: {
                        ticks: {
                            autoSkip: false,
                            minRotation: 90,
                            maxRotation: 90
                        },
                        afterFit: function(scale) {
                            scale.height = 180; // すべてのグラフで文字用のスペース（高さ）を完全に統一
                        }
                    },
                    y: { min: 0, max: maxY }
                }
            }
        });
        deepDiveChartInstances.push(chart);
    });

    favoritePlaysTable.innerHTML = '';

    // Favorite Plays Table (試合ごとに分割)
    parsedGamesData.forEach(g => {
        if (!g.perStats[per]) return;

        const forms = Object.keys(g.perStats[per].formations);
        if (forms.length === 0) return;

        // この試合での出現回数順にソート
        forms.sort((a, b) => {
            const totalA = g.perStats[per].formations[a].run + g.perStats[per].formations[a].pass;
            const totalB = g.perStats[per].formations[b].run + g.perStats[per].formations[b].pass;
            return totalB - totalA;
        });

        // 試合名のヘッダー行を追加
        const trHeader = document.createElement('tr');
        trHeader.innerHTML = `<td colspan="4" style="background-color: #f1f5f9; font-weight: bold; text-align: center; padding: 10px; color: #334155; border-bottom: 2px solid #cbd5e1;">${g.gameName}</td>`;
        favoritePlaysTable.appendChild(trHeader);

        forms.forEach(form => {
            const stats = g.perStats[per].formations[form];
            const totalRun = stats.run;
            const totalPass = stats.pass;

            if (totalRun + totalPass === 0) return;

            const runPct = Math.round((totalRun / (totalRun + totalPass)) * 100);
            const passPct = 100 - runPct;

            const playsHtml = stats.aggregatedPlays.map(p => `<div style="margin-bottom: 4px; font-size: 0.8rem; color: #475569;">${p}</div>`).join('');

            const tr = document.createElement('tr');
            const totalPlays = totalRun + totalPass;
            tr.innerHTML = `
                <td style="font-weight: 600;">${form}</td>
                <td>
                    <span class="run-badge">${runPct}%</span>
                    <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px; margin-left: 4px;">(${totalRun}/${totalPlays})</div>
                </td>
                <td>
                    <span class="pass-badge">${passPct}%</span>
                    <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px; margin-left: 4px;">(${totalPass}/${totalPlays})</div>
                </td>
                <td>${playsHtml}</td>
            `;
            favoritePlaysTable.appendChild(tr);
        });
    });

    // Update Trends Matrix
    trendsMatrixHead.innerHTML = '';
    trendsMatrixBody.innerHTML = '';

    const allFormsList = Object.keys(globalFormUsage).sort((a, b) => globalFormUsage[b] - globalFormUsage[a]);
    
    // Matrix Header
    const trHead = document.createElement('tr');
    trHead.innerHTML = `<th style="text-align: left; background: #f8fafc; position: sticky; left: 0; z-index: 10;">Formation</th>`;
    parsedGamesData.forEach(g => {
        trHead.innerHTML += `<th>${g.gameName}</th>`;
    });
    trendsMatrixHead.appendChild(trHead);

    // Find global max usage for heatmap scaling
    let maxUsageForHeatmap = 1;
    allFormsList.forEach(form => {
        parsedGamesData.forEach(g => {
            if (g.perStats[per] && g.perStats[per].formations[form]) {
                const s = g.perStats[per].formations[form];
                const pt = g.perStats[per].run + g.perStats[per].pass;
                const pct = ((s.run + s.pass) / pt) * 100;
                if (pct > maxUsageForHeatmap) maxUsageForHeatmap = pct;
            }
        });
    });

    // Matrix Body
    allFormsList.forEach(form => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td style="font-weight: bold; text-align: left; background: white; position: sticky; left: 0; border-right: 1px solid #e2e8f0;">${form}</td>`;
        
        let prevPct = null;

        parsedGamesData.forEach(g => {
            if (g.totalPlays === 0) {
                // フィルターに当てはまるプレーがない試合：「-」にして、前後の比較にも使わない
                tr.innerHTML += `<td><span style="color: #cbd5e1;">-</span></td>`;
                return;
            }
            let cellHtml = `<span style="color: #cbd5e1;">-</span>`;
            let bgColor = 'transparent';

            if (g.perStats[per] && g.perStats[per].formations[form]) {
                const s = g.perStats[per].formations[form];
                const pt = g.perStats[per].run + g.perStats[per].pass;
                const pct = Math.round(((s.run + s.pass) / pt) * 100);
                
                const alpha = Math.min(pct / maxUsageForHeatmap, 1) * 0.7; // Max alpha 0.7
                bgColor = `rgba(239, 68, 68, ${alpha})`;

                let deltaHtml = '';
                if (prevPct !== null) {
                    const diff = pct - prevPct;
                    if (diff > 0) deltaHtml = `<span style="color: #ef4444; font-size: 0.75rem; margin-left: 6px;">▲+${diff}%</span>`;
                    else if (diff < 0) deltaHtml = `<span style="color: #3b82f6; font-size: 0.75rem; margin-left: 6px;">▼${diff}%</span>`;
                }
                
                cellHtml = `<div style="font-weight: 600;">${pct}%</div>${deltaHtml}`;
                prevPct = pct;
            } else {
                if (prevPct !== null) {
                    const diff = 0 - prevPct;
                    cellHtml = `0% <span style="color: #3b82f6; font-size: 0.75rem; margin-left: 6px;">▼${diff}%</span>`;
                }
                prevPct = 0;
            }

            tr.innerHTML += `<td style="background-color: ${bgColor}; transition: background 0.2s;">${cellHtml}</td>`;
        });
        trendsMatrixBody.appendChild(tr);
    });

    // Update Personnel Run/Pass Trend Chart
    const titleEl = document.getElementById('per-rp-trend-title');
    if (titleEl) titleEl.textContent = `${per} のラン・パス比率推移`;

    const labels = parsedGamesData.map(g => g.gameName);
    const runData = [];
    const passData = [];
    
    parsedGamesData.forEach(g => {
        let r = 0, p = 0;
        if (g.perStats[per]) {
            r = g.perStats[per].run;
            p = g.perStats[per].pass;
        }
        const total = r + p;
        if (total > 0) {
            runData.push((r / total) * 100);
            passData.push((p / total) * 100);
        } else {
            // このパーソネルのプレーがない試合は点を打たない
            runData.push(null);
            passData.push(null);
        }
    });

    if (perRpTrendChartInstance) {
        perRpTrendChartInstance.destroy();
    }

    const ctx = document.getElementById('perRpTrendChart').getContext('2d');
    perRpTrendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Run %',
                    data: runData,
                    borderColor: '#ef4444',
                    backgroundColor: '#ef4444',
                    tension: 0,
                    borderWidth: 2,
                    clip: 12
                },
                {
                    label: 'Pass %',
                    data: passData,
                    borderColor: '#3b82f6',
                    backgroundColor: '#3b82f6',
                    tension: 0,
                    borderWidth: 2,
                    clip: 12
                }
            ]
        },
        plugins: [ChartDataLabels, legendGapPlugin],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { left: 6, right: 26, top: 6 } },
            plugins: {
                legend: { position: 'top' },
                datalabels: {
                    // 値が高い方の数字は点の上、低い方は点の下に出す（同じ値ならRunが上）
                    align: function(context) { return isHigherSeries(context) ? 'top' : 'bottom'; },
                    anchor: function(context) { return isHigherSeries(context) ? 'end' : 'start'; },
                    display: function(context) { return context.dataset.data[context.dataIndex] !== null; },
                    offset: 4,
                    clamp: true,
                    clip: false,
                    formatter: function(value) {
                        return Math.round(value) + '%';
                    },
                    font: {
                        weight: 'bold'
                    },
                    color: function(context) {
                        return context.dataset.borderColor;
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + Number(context.raw).toFixed(1) + '%';
                        }
                    }
                }
            },
            scales: percentLineScales()
        }
    });
}

function analyzeTendencyBreakers() {
    alertsContainer.innerHTML = '';
    // フィルターに当てはまるプレーがある試合だけで、直近2試合を比べる
    const playedGames = parsedGamesData.filter(g => g.totalPlays > 0);
    if (playedGames.length < 2) return;

    const current = playedGames[playedGames.length - 1];
    const prev = playedGames[playedGames.length - 2];

    const alerts = [];

    const currentTotal = current.totalRun + current.totalPass;
    const prevTotal = prev.totalRun + prev.totalPass;
    
    if (currentTotal >= 3 && prevTotal >= 3) {
        const curRunPct = (current.totalRun / currentTotal) * 100;
        const prevRunPct = (prev.totalRun / prevTotal) * 100;
        const runDiff = curRunPct - prevRunPct;

        if (Math.abs(runDiff) > 15) {
            const minSamples = Math.min(currentTotal, prevTotal);
            let rel = 'low';
            if (minSamples >= 10) rel = 'high';
            else if (minSamples >= 5) rel = 'med';

            alerts.push({
                rel: rel,
                title: "Run / Pass 傾向の激変",
                msg: `「${prev.gameName}」から「${current.gameName}」にかけて、Runの割合が ${Math.abs(runDiff).toFixed(1)}% ${runDiff > 0 ? '増加' : '減少'} しています。オフェンスの基本方針が大きくシフトした可能性があります。<br><span style="font-size: 0.8rem; color: #64748b;">データ: [${prev.gameName}] Run ${prev.totalRun}/${prevTotal}回 → [${current.gameName}] Run ${current.totalRun}/${currentTotal}回</span>`
            });
        }
    }

    Object.keys(current.perStats).forEach(per => {
        const curPerTotal = current.perStats[per].run + current.perStats[per].pass;
        const curPerPct = (curPerTotal / current.totalPlays) * 100;
        
        const prevStats = prev.perStats[per] || { run: 0, pass: 0 };
        const prevPerTotal = prevStats.run + prevStats.pass;
        const prevPerPct = prev.totalPlays ? (prevPerTotal / prev.totalPlays) * 100 : 0;
        
        const diff = curPerPct - prevPerPct;
        if (diff > 10 && curPerTotal > 0) {
            let rel = 'low';
            if (curPerTotal >= 10) rel = 'high';
            else if (curPerTotal >= 5) rel = 'med';

            alerts.push({
                rel: rel,
                title: `${per} パーソネルの多用`,
                msg: `「${prev.gameName}」から「${current.gameName}」にかけて、${per} パーソネルの使用率が急増しています（+${diff.toFixed(1)}% / 今試合 ${curPerTotal}回）。新しいパッケージを導入した可能性があります。`
            });
        }

        if (curPerTotal > 0 && prevPerTotal > 0) {
            const curRunPct = (current.perStats[per].run / curPerTotal) * 100;
            const prevRunPct = (prevStats.run / prevPerTotal) * 100;
            const rpDiff = curRunPct - prevRunPct;
            
            if (Math.abs(rpDiff) > 25) {
                const minSamples = Math.min(curPerTotal, prevPerTotal);
                let rel = 'low';
                if (minSamples >= 10) rel = 'high';
                else if (minSamples >= 5) rel = 'med';

                alerts.push({
                    rel: rel,
                    title: `${per} パーソネルの Run/Pass 裏かき`,
                    msg: `${per} からのRunの割合が ${rpDiff > 0 ? '急増' : '急減'}（${Math.abs(rpDiff).toFixed(1)}%変化）しています。相手OCが意図的なテンデンシー・ブレーカーを仕掛けています。<br><span style="font-size: 0.8rem; color: #64748b;">データ: [${prev.gameName}] Run ${prevStats.run}/${prevPerTotal}回 → [${current.gameName}] Run ${current.perStats[per].run}/${curPerTotal}回</span>`
                });
            }
        }
    });

    alerts.forEach(alert => {
        const div = document.createElement('div');
        div.className = `alert alert-${alert.rel}`;
        
        let relBadge = '';
        if (alert.rel === 'high') relBadge = `<span style="background: #ef4444; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; margin-left: 8px; border: 1px solid #dc2626;">信用度: 高</span>`;
        if (alert.rel === 'med') relBadge = `<span style="background: #f87171; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; margin-left: 8px; border: 1px solid #ef4444;">信用度: 中</span>`;
        if (alert.rel === 'low') relBadge = `<span style="background: #fca5a5; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; margin-left: 8px; border: 1px solid #f87171;">信用度: 低</span>`;

        div.innerHTML = `
            <div class="alert-icon"><i data-lucide="alert-triangle"></i></div>
            <div class="alert-content">
                <h4>${alert.title} ${relBadge}</h4>
                <p>${alert.msg}</p>
            </div>
        `;
        alertsContainer.appendChild(div);
    });
    
    if (alerts.length > 0) lucide.createIcons();
}

function exportMatrixToCSV() {
    const table = document.getElementById('trends-matrix-table');
    if (!table) return;
    
    let csvContent = "";
    
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
        const rowData = [];
        const cols = row.querySelectorAll('th, td');
        
        cols.forEach(col => {
            // Extract text content, strip out up/down arrows and extra spaces
            let text = col.innerText || col.textContent;
            text = text.replace(/\n/g, " ").replace(/▲/g, "").replace(/▼/g, "").trim();
            rowData.push(`"${text}"`);
        });
        
        csvContent += rowData.join(",") + "\n";
    });
    
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' }); // BOM
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    
    const p = document.getElementById('personnel-select').value || 'All';
    const d = document.getElementById('filter-down').value;
    const dist = document.getElementById('filter-distance').value;
    
    link.setAttribute("download", `Tendency_Matrix_${p}_D${d}_${dist}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
