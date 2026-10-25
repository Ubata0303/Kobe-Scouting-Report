// Tendency Breaker パスワード保護
// 母体：data.json をパスワードで暗号化して書き出す
// 閲覧アプリ：暗号化された data.json をパスワードで復号して表示する
// 暗号化：PBKDF2-SHA256（ランダムなsalt）で鍵を作り、AES-GCM（ランダムなIV）で暗号化
(function () {
    const ITERATIONS = 310000;
    const PASS_KEY = 'tb-viewer-pass'; // 「この端末に保存」したときのみ使用

    // ---------- 暗号化・復号 ----------
    function toB64(bytes) {
        let bin = '';
        for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
        return btoa(bin);
    }
    function fromB64(b64) {
        const bin = atob(b64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return bytes;
    }
    async function deriveKey(password, salt, iterations) {
        const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
        return crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
            material, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
    }
    async function encrypt(obj, password) {
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await deriveKey(password, salt, ITERATIONS);
        const plain = new TextEncoder().encode(JSON.stringify(obj));
        const ct = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plain));
        return { version: 2, enc: true, salt: toB64(salt), iv: toB64(iv), iterations: ITERATIONS, ciphertext: toB64(ct) };
    }
    async function decrypt(env, password) {
        const key = await deriveKey(password, fromB64(env.salt), env.iterations);
        const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(env.iv) }, key, fromB64(env.ciphertext));
        return JSON.parse(new TextDecoder().decode(plain));
    }
    function cryptoAvailable() {
        return !!(window.crypto && crypto.subtle);
    }

    // ---------- 画面（パスワード入力） ----------
    const OVERLAY_CSS = 'position:fixed;inset:0;z-index:5000;background:rgba(15,23,42,0.55);display:flex;align-items:center;justify-content:center;padding:16px;font-family:Inter,-apple-system,sans-serif;';
    const BOX_CSS = 'background:#fff;border-radius:14px;padding:22px;width:100%;max-width:360px;box-shadow:0 20px 40px rgba(0,0,0,0.2);color:#0f172a;';
    const INPUT_CSS = 'width:100%;box-sizing:border-box;padding:12px;border:1px solid #cbd5e1;border-radius:8px;font-size:16px;margin-top:6px;';
    const BTN_CSS = 'padding:10px 16px;border-radius:8px;border:none;font-size:15px;font-weight:600;cursor:pointer;';

    function el(tag, css, text) {
        const e = document.createElement(tag);
        if (css) e.style.cssText = css;
        if (text) e.textContent = text;
        return e;
    }

    // 母体：書き出し用パスワードを2回入力してもらう（キャンセルで null）
    function askNewPassword() {
        return new Promise(resolve => {
            const ov = el('div', OVERLAY_CSS);
            const box = el('div', BOX_CSS);
            box.appendChild(el('h3', 'margin:0 0 6px;font-size:1.1rem;', '閲覧アプリ用のパスワード'));
            box.appendChild(el('p', 'margin:0 0 14px;font-size:0.85rem;color:#475569;line-height:1.5;', 'このパスワードを知っている人だけがスマホ版でデータを見られます。忘れると誰も見られなくなるので、控えておいてください。'));
            const p1 = el('input', INPUT_CSS); p1.type = 'password'; p1.placeholder = 'パスワード（6文字以上）'; p1.autocomplete = 'new-password';
            const p2 = el('input', INPUT_CSS); p2.type = 'password'; p2.placeholder = 'もう一度入力'; p2.autocomplete = 'new-password';
            const err = el('div', 'color:#dc2626;font-size:0.85rem;min-height:1.2em;margin-top:8px;');
            const row = el('div', 'display:flex;gap:8px;justify-content:flex-end;margin-top:12px;');
            const cancel = el('button', BTN_CSS + 'background:#e2e8f0;color:#0f172a;', 'キャンセル');
            const ok = el('button', BTN_CSS + 'background:#3b82f6;color:#fff;', '暗号化して書き出す');
            row.append(cancel, ok);
            box.append(p1, p2, err, row);
            ov.appendChild(box);
            document.body.appendChild(ov);
            p1.focus();
            const close = v => { ov.remove(); resolve(v); };
            cancel.onclick = () => close(null);
            const submit = () => {
                if (p1.value.length < 6) { err.textContent = '6文字以上で入力してください。'; return; }
                if (p1.value !== p2.value) { err.textContent = '2回のパスワードが一致しません。'; return; }
                close(p1.value);
            };
            ok.onclick = submit;
            p2.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
        });
    }

    // 閲覧アプリ：パスワード入力画面。check(password) が true を返すまで繰り返す
    function askPassword(check) {
        return new Promise(resolve => {
            const ov = el('div', OVERLAY_CSS + 'background:#f1f5f9;');
            const box = el('div', BOX_CSS);
            box.appendChild(el('h3', 'margin:0 0 6px;font-size:1.2rem;', 'Tendency Breaker'));
            box.appendChild(el('p', 'margin:0 0 14px;font-size:0.9rem;color:#475569;', 'パスワードを入力してください。'));
            const form = el('form', '');
            const p = el('input', INPUT_CSS); p.type = 'password'; p.placeholder = 'パスワード'; p.autocomplete = 'current-password';
            const label = el('label', 'display:flex;align-items:center;gap:8px;margin-top:12px;font-size:0.9rem;color:#334155;');
            const remember = el('input', 'width:18px;height:18px;'); remember.type = 'checkbox';
            label.append(remember, document.createTextNode('この端末に保存する（次から入力不要）'));
            const err = el('div', 'color:#dc2626;font-size:0.85rem;min-height:1.2em;margin-top:8px;');
            const ok = el('button', BTN_CSS + 'background:#3b82f6;color:#fff;width:100%;margin-top:8px;', '開く');
            ok.type = 'submit';
            form.append(p, label, err, ok);
            box.appendChild(form);
            ov.appendChild(box);
            document.body.appendChild(ov);
            p.focus();
            form.addEventListener('submit', async e => {
                e.preventDefault();
                if (!p.value) return;
                ok.disabled = true; ok.textContent = '確認中...'; err.textContent = '';
                const good = await check(p.value, remember.checked);
                if (good) { ov.remove(); resolve(); return; }
                ok.disabled = false; ok.textContent = '開く';
                err.textContent = 'パスワードが違います。もう一度入力してください。';
                p.select();
            });
        });
    }

    // ---------- 閲覧アプリ：data.json の取得（高速キャッシュ対応） ----------
    const CACHE_DB = 'tb-viewer-cache-db';
    const CACHE_STORE = 'cache';

    function openCacheDb() {
        return new Promise((resolve, reject) => {
            if (typeof indexedDB === 'undefined') return reject(new Error('no idb'));
            try {
                const req = indexedDB.open(CACHE_DB, 1);
                req.onupgradeneeded = () => {
                    const db = req.result;
                    if (!db.objectStoreNames.contains(CACHE_STORE)) db.createObjectStore(CACHE_STORE);
                };
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => reject(req.error);
            } catch (e) { reject(e); }
        });
    }
    function cacheGet(key) {
        return openCacheDb().then(db => new Promise((resolve) => {
            const tx = db.transaction(CACHE_STORE, 'readonly');
            const req = tx.objectStore(CACHE_STORE).get(key);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => resolve(null);
        })).catch(() => null);
    }
    function cacheSet(entries) {
        return openCacheDb().then(db => new Promise((resolve) => {
            const tx = db.transaction(CACHE_STORE, 'readwrite');
            const st = tx.objectStore(CACHE_STORE);
            for (const [k, v] of Object.entries(entries)) {
                if (v === null || v === undefined) st.delete(k);
                else st.put(v, k);
            }
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => resolve(false);
        })).catch(() => false);
    }
    function cacheClear() {
        return openCacheDb().then(db => {
            const tx = db.transaction(CACHE_STORE, 'readwrite');
            tx.objectStore(CACHE_STORE).clear();
        }).catch(() => {});
    }

    function getSaved() {
        try { return sessionStorage.getItem(PASS_KEY) || localStorage.getItem(PASS_KEY); } catch (e) { return null; }
    }
    function savePass(pw, persist) {
        try {
            sessionStorage.setItem(PASS_KEY, pw); // 同じタブ内の画面移動では聞き直さない
            if (persist) localStorage.setItem(PASS_KEY, pw);
        } catch (e) { /* 保存できなくても表示は続ける */ }
    }
    function logout() {
        try { sessionStorage.removeItem(PASS_KEY); localStorage.removeItem(PASS_KEY); } catch (e) { }
        cacheClear();
        location.reload();
    }

    let published = null;
    async function getPublished() {
        if (published) return published;

        const isPlayPage = /play\.html/i.test(location.pathname);
        const saved = getSaved();

        // パスワード保存済みなら、HEADリクエストでdata.jsonの更新有無だけ確認し、未更新ならIndexedDBから瞬時に復元
        let remoteSig = '';
        if (saved) {
            try {
                const headRes = await fetch('data.json', { method: 'HEAD', cache: 'no-cache' });
                if (headRes.ok) {
                    remoteSig = (headRes.headers.get('etag') || '') + '|' + (headRes.headers.get('last-modified') || '') + '|' + (headRes.headers.get('content-length') || '');
                }
                if (remoteSig && remoteSig !== '||') {
                    const cachedMeta = await cacheGet('meta');
                    if (cachedMeta && cachedMeta.sig === remoteSig) {
                        const light = await cacheGet('light');
                        if (light) {
                            if (isPlayPage) {
                                const diagrams = await cacheGet('diagrams');
                                if (light.scoutingExtra && Array.isArray(diagrams)) {
                                    light.scoutingExtra.playDiagrams = diagrams;
                                }
                            }
                            published = light;
                            published.__encrypted = true;
                            addLogoutButton();
                            return published;
                        }
                    }
                }
            } catch (_) {}
        }

        const res = await fetch('data.json', { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        if (!remoteSig) {
            remoteSig = (res.headers.get('etag') || '') + '|' + (res.headers.get('last-modified') || '') + '|' + (res.headers.get('content-length') || '');
        }
        const payload = await res.json();
        if (!payload.enc) return (published = payload);
        if (!cryptoAvailable()) throw new Error('この接続では暗号を解除できません（https で開いてください）。');

        if (saved) {
            try { published = await decrypt(payload, saved); savePass(saved, false); }
            catch (e) { try { localStorage.removeItem(PASS_KEY); sessionStorage.removeItem(PASS_KEY); } catch (_) { } }
        }
        if (!published) {
            await askPassword(async (pw, persist) => {
                try { published = await decrypt(payload, pw); savePass(pw, persist); return true; }
                catch (e) { return false; }
            });
        }
        published.__encrypted = true;
        addLogoutButton();

        // 復号済みデータを「軽量本体（全画面用）」と「図面配列（Play Diagram専用）」に分けてIndexedDBにキャッシュ
        try {
            const diagrams = (published.scoutingExtra && Array.isArray(published.scoutingExtra.playDiagrams))
                ? published.scoutingExtra.playDiagrams
                : [];
            const lightCopy = Object.assign({}, published);
            if (lightCopy.scoutingExtra) {
                lightCopy.scoutingExtra = Object.assign({}, lightCopy.scoutingExtra, { playDiagrams: [] });
            }
            cacheSet({
                meta: { sig: remoteSig || String(payload.salt || ''), savedAt: Date.now() },
                light: lightCopy,
                diagrams: diagrams
            });
        } catch (_) {}

        return published;
    }

    function addLogoutButton() {
        if (document.getElementById('tb-logout-btn')) return;
        const btn = el('button', 'padding:4px 10px;border-radius:6px;border:1px solid #cbd5e1;background:#fff;color:#334155;font:500 0.8rem Inter,sans-serif;cursor:pointer;', 'ログアウト');
        btn.id = 'tb-logout-btn';
        btn.onclick = logout;
        const place = () => {
            const host = document.getElementById('tb-shared-banner') || (document.getElementById('viewer-status') || {}).parentElement;
            if (host) { btn.style.marginLeft = 'auto'; host.appendChild(btn); }
            else { btn.style.cssText += 'position:fixed;right:12px;bottom:12px;z-index:4000;'; document.body.appendChild(btn); }
        };
        // バナーが作られた後に置く
        setTimeout(place, 0);
    }

    window.TBSecure = { encrypt, decrypt, askNewPassword, getPublished, cryptoAvailable, logout };
})();
