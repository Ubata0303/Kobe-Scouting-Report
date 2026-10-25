// Tendency Breaker 共有データ
// どの画面でExcel/CSVを読み込んでも、そのファイルをブラウザに保存しておき、
// 他の画面を開いたときに自動で同じファイルを読み込ませる。
(function () {
    const KEY = 'tb-shared-files';
    const IS_DASHBOARD = !!document.getElementById('export-app-btn');
    // 閲覧アプリ（viewer）では、母体が書き出した data.json のファイルを使う
    const IS_VIEWER = document.body.dataset.mode === 'viewer';
    let feeding = false; // 自動読み込み中は保存しない

    function loadStore() {
        try {
            const v = JSON.parse(localStorage.getItem(KEY) || 'null');
            return v && Array.isArray(v.files) && v.files.length ? v : null;
        } catch (e) { return null; }
    }

    function saveStore(store) {
        try {
            if (store) localStorage.setItem(KEY, JSON.stringify(store));
            else localStorage.removeItem(KEY);
            return true;
        } catch (e) {
            console.warn('共有データを保存できませんでした:', e);
            return false;
        }
    }

    function fileToB64(file) {
        return new Promise((resolve, reject) => {
            const r = new FileReader();
            r.onload = () => resolve(String(r.result).split(',')[1] || '');
            r.onerror = reject;
            r.readAsDataURL(file);
        });
    }

    function b64ToFile(f) {
        const bin = atob(f.b64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return new File([bytes], f.name, { type: f.type || '' });
    }

    // ユーザーが選んだファイルを保存（Dashboardは追加、他の画面は置き換え）
    async function remember(fileList) {
        const files = Array.from(fileList || []).filter(f => /\.(xlsx|xls|csv)$/i.test(f.name));
        if (!files.length) return;
        const entries = [];
        for (const f of files) entries.push({ name: f.name, type: f.type, b64: await fileToB64(f) });
        const prev = IS_DASHBOARD ? loadStore() : null;
        const merged = prev ? prev.files.filter(p => !entries.some(e => e.name === p.name)).concat(entries) : entries;
        saveStore({ savedAt: new Date().toISOString(), files: merged });
        renderBanner();
    }

    // 複数ファイルを1つのワークブックにまとめる（1ファイルしか読めない画面用）
    const HEADER_WORDS = ['PLAY TYPE', 'OFF FORM', 'PERSONNEL', 'HASH', 'ZONE', 'DN', 'DIST', 'OFF PLAY'];
    function findHeaderRow(rows) {
        for (let i = 0; i < Math.min(rows.length, 20); i++) {
            const cells = (rows[i] || []).map(c => String(c ?? '').trim().toUpperCase());
            if (cells.filter(c => HEADER_WORDS.some(w => c.includes(w))).length >= 2) return i;
        }
        return 0;
    }
    function mergeToOneFile(files) {
        if (files.length === 1 || typeof XLSX === 'undefined') return files[0];
        let header = null;
        const out = [];
        for (const f of files) {
            const wb = XLSX.read(Uint8Array.from(atob(f.b64), c => c.charCodeAt(0)), { type: 'array' });
            const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: '' });
            const h = findHeaderRow(rows);
            const names = (rows[h] || []).map(c => String(c ?? '').trim());
            if (!header) { header = names; out.push(header); }
            const idx = header.map(n => names.findIndex(x => x.toUpperCase() === n.toUpperCase()));
            for (let i = h + 1; i < rows.length; i++) out.push(idx.map(j => (j === -1 ? '' : rows[i][j])));
        }
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(out), 'Data');
        const buf = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
        return new File([buf], `合算（${files.length}ファイル）.xlsx`);
    }

    // 保存済みファイルをこの画面のファイル入力に流し込む
    function feed(store) {
        const input = document.querySelector('input[type="file"]:not([data-no-shared-feed])');
        if (!store || !input) return;
        try {
            const dt = new DataTransfer();
            if (input.multiple) store.files.forEach(f => dt.items.add(b64ToFile(f)));
            else {
                const one = mergeToOneFile(store.files);
                dt.items.add(one instanceof File ? one : b64ToFile(one));
            }
            input.files = dt.files;
            feeding = true;
            input.dispatchEvent(new Event('change', { bubbles: true }));
        } catch (e) {
            console.warn('共有データの自動読み込みに失敗しました:', e);
        } finally {
            feeding = false;
        }
    }

    // ナビの下に「共有データ」の状態を表示
    function renderBanner(viewerText) {
        let el = document.getElementById('tb-shared-banner');
        const store = IS_VIEWER ? null : loadStore();
        const extra = IS_VIEWER ? null : loadExtra();
        if (!store && !extra && !viewerText) { if (el) el.remove(); return; }
        if (!el) {
            el = document.createElement('div');
            el.id = 'tb-shared-banner';
            el.style.cssText = 'flex-basis:100%;max-width:1000px;margin:0 auto 1rem;padding:8px 12px;border-radius:8px;background:#eff6ff;border:1px solid #bfdbfe;color:#1e3a8a;font:500 0.85rem Inter,sans-serif;display:flex;gap:12px;align-items:center;flex-wrap:wrap;';
            const anchor = document.querySelector('.tb-nav') || document.querySelector('.main-content header');
            if (anchor) anchor.insertAdjacentElement('afterend', el); else document.body.prepend(el);
        }
        if (viewerText) { el.textContent = viewerText; return; }
        const parts = [];
        if (store && store.files && store.files.length) {
            const d = new Date(store.savedAt);
            const when = d.toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            parts.push(`Excel：${store.files.map(f => f.name).join('、')}（${when}）`);
        }
        if (extra) {
            const label = extra.pdfFileName ? `PDF：${extra.pdfFileName}` : 'Member List / Cadence（更新済み）';
            parts.push(label);
        }
        el.textContent = `共有データ：${parts.join(' ＋ ')} — 全画面で自動で読み込まれます`;
        const btn = document.createElement('button');
        btn.textContent = '共有データを消す';
        btn.style.cssText = 'margin-left:auto;padding:4px 10px;border-radius:6px;border:1px solid #93c5fd;background:#fff;color:#1e3a8a;cursor:pointer;font:inherit;';
        btn.onclick = () => { saveStore(null); saveExtra(null); renderBanner(); };
        el.appendChild(btn);
    }

    // 閲覧アプリ：data.json を取得して、この画面に読み込ませる
    // ---------- Down & Distance のヤード設定 ----------
    // 設定はブラウザに保存し、変更したらすぐ集計し直す。書き出し（data.json）にも含めて閲覧アプリに引き継ぐ
    const DD_KEY = 'tb-dd-settings';
    const DD_IDS = ['d2-short-max', 'd2-med-min', 'd2-med-max', 'd2-long-min', 'd3-short-max', 'd3-med-min', 'd3-med-max', 'd3-long-min', 'd4-short-max'];
    function loadDdSettings() {
        try { return JSON.parse(localStorage.getItem(DD_KEY) || 'null'); } catch (e) { return null; }
    }
    function applyDdSettings(st) {
        if (!st) return;
        DD_IDS.forEach(id => {
            const el = document.getElementById(id);
            if (el && st[id] !== undefined && st[id] !== '') el.value = st[id];
        });
    }
    function readDdSettings() {
        const st = {};
        DD_IDS.forEach(id => { const el = document.getElementById(id); if (el) st[id] = el.value; });
        return st;
    }

    // ---------- Member List / Cadence 用のデータ保存・共有 ----------
    const EXTRA_KEY = 'tb-scouting-extra';
    function loadExtra() {
        try { return JSON.parse(localStorage.getItem(EXTRA_KEY) || 'null'); } catch (e) { return null; }
    }
    function saveExtra(partial) {
        try {
            if (!partial) {
                localStorage.removeItem(EXTRA_KEY);
                if (!IS_VIEWER) renderBanner();
                return true;
            }
            const prev = loadExtra() || {};
            const next = Object.assign({}, prev, partial, { updatedAt: new Date().toISOString() });
            localStorage.setItem(EXTRA_KEY, JSON.stringify(next));
            if (!IS_VIEWER) renderBanner();
            return true;
        } catch (e) {
            console.warn('Member/Cadenceデータを保存できませんでした:', e);
            return false;
        }
    }

    async function feedFromPublished() {
        const fileInput = document.querySelector('input[type="file"]:not([data-no-shared-feed])');
        const isExtraPage = document.body.dataset.extraPage === 'true';
        if (!fileInput && !isExtraPage) return;
        try {
            const payload = await window.TBSecure.getPublished();
            if (fileInput) {
                if (!payload.files || !payload.files.length) throw new Error('no files');
                applyDdSettings(payload.ddSettings);
                feed({ files: payload.files });
            }
            if (isExtraPage) {
                window.dispatchEvent(new CustomEvent('tb-extra-published', { detail: payload.scoutingExtra || null }));
            }
            if (payload.exportedAt) {
                const d = new Date(payload.exportedAt);
                renderBanner(`最終更新：${d.toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`);
            }
        } catch (e) {
            console.error('data.json を読み込めませんでした:', e);
            renderBanner('データを読み込めませんでした。' + (/https/.test(e.message) ? e.message : 'まだデータが公開されていないか、通信に失敗しました。'));
        }
    }

    window.TBShared = { load: loadStore, loadDdSettings, loadExtra, saveExtra, renderBanner };

    if (IS_VIEWER) {
        window.addEventListener('load', feedFromPublished);
        return;
    }

    // ユーザーの読み込み（ボタン・ドラッグ＆ドロップ）を記録
    document.addEventListener('change', e => {
        if (!feeding && e.target && e.target.type === 'file' && !e.target.hasAttribute('data-no-shared-feed')) remember(e.target.files);
    }, true);
    document.addEventListener('drop', e => {
        if (document.body.dataset.extraPage === 'true') return;
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) remember(e.dataTransfer.files);
    }, true);

    // DashboardのClearで共有データも消す
    const clearBtn = IS_DASHBOARD ? document.getElementById('clear-btn') : null;
    if (clearBtn) clearBtn.addEventListener('click', () => { saveStore(null); saveExtra(null); renderBanner(); });

    // Down & Distance：ヤード設定を変えたら保存して、すぐ集計し直す
    const ddPanel = document.getElementById('settings-panel');
    const isDdPage = ddPanel && document.getElementById(DD_IDS[0]);
    if (isDdPage) {
        ddPanel.addEventListener('change', () => {
            try { localStorage.setItem(DD_KEY, JSON.stringify(readDdSettings())); } catch (e) { }
            feed(loadStore());
        });
        const hint = ddPanel.querySelector('.settings-hint');
        if (hint) hint.textContent = '※数字を変えると、すぐに下の表に反映されます（設定は保存され、スマホ版への書き出しにも使われます）。';
    }

    window.addEventListener('load', () => {
        if (isDdPage) applyDdSettings(loadDdSettings());
        renderBanner();
        feed(loadStore());
    });
})();

