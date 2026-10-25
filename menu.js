// 閲覧アプリ：左上の「≡」メニュー
// 画面上部に固定バー（≡ ボタン＋アプリ名＋今の画面名）を置き、≡ を押すと左から画面一覧が開く
(function () {
    const PAGES = [
        { href: 'index.html', label: 'Dashboard' },
        { href: 'passzone.html', label: 'Pass Zone' },
        { href: 'dd.html', label: 'Down & Distance' },
        { href: 'personnel.html', label: 'Personnel' },
        { href: 'formation.html', label: 'Formation' },
        { href: 'play.html', label: 'Play Diagram' },
        { href: 'member.html', label: 'Member List' },
        { href: 'cadence.html', label: 'Cadence' }
    ];
    // Netlify は /passzone のような拡張子なしURLでも開けるので、ファイル名の先頭で判定する
    const path = location.pathname.split('/').pop() || 'index.html';
    const current = PAGES.find(p => p.href.replace('.html', '') === path.replace('.html', '')) || PAGES[0];

    const css = `
    .sidebar, .tb-nav { display: none !important; }
    .tbm-bar { position: fixed; top: 0; left: 0; right: 0; height: 52px; z-index: 3000; display: flex; align-items: center; gap: 10px;
        padding: 0 12px; background: #fff; border-bottom: 1px solid #e2e8f0; font-family: Inter, -apple-system, sans-serif; box-sizing: border-box; }
    .tbm-btn { width: 40px; height: 40px; border: none; background: none; border-radius: 8px; cursor: pointer; display: flex;
        flex-direction: column; justify-content: center; align-items: center; gap: 5px; padding: 0; }
    .tbm-btn:active { background: #f1f5f9; }
    .tbm-btn span { display: block; width: 22px; height: 2.5px; background: #1e293b; border-radius: 2px; }
    .tbm-title { font-weight: 700; color: #3b82f6; font-size: 1rem; }
    .tbm-page { margin-left: auto; font-size: 0.85rem; color: #64748b; font-weight: 600; }
    .tbm-spacer { height: 52px; flex-basis: 100%; width: 100%; flex-shrink: 0; }
    .tbm-overlay { position: fixed; inset: 0; z-index: 3100; background: rgba(15, 23, 42, 0.45); opacity: 0; pointer-events: none; transition: opacity .2s; }
    .tbm-drawer { position: fixed; top: 0; bottom: 0; left: 0; width: 260px; max-width: 80vw; z-index: 3200; background: #fff;
        transform: translateX(-100%); visibility: hidden; transition: transform .22s ease, visibility .22s; box-shadow: 4px 0 20px rgba(0,0,0,.15);
        font-family: Inter, -apple-system, sans-serif; display: flex; flex-direction: column; padding: 14px 12px; box-sizing: border-box; }
    .tbm-open .tbm-overlay { opacity: 1; pointer-events: auto; }
    .tbm-open .tbm-drawer { transform: translateX(0); visibility: visible; }
    .tbm-head { display: flex; align-items: center; justify-content: space-between; margin: 0 4px 14px; }
    .tbm-head b { color: #3b82f6; font-size: 1.05rem; }
    .tbm-close { border: none; background: none; font-size: 1.6rem; line-height: 1; color: #475569; cursor: pointer; padding: 4px 8px; }
    .tbm-drawer a { display: block; padding: 13px 14px; margin-bottom: 4px; border-radius: 10px; text-decoration: none; color: #334155; font-weight: 600; font-size: 1rem; }
    .tbm-drawer a.active { background: #3b82f6; color: #fff; }
    .tbm-drawer a:not(.active):active { background: #f1f5f9; }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const bar = document.createElement('div');
    bar.className = 'tbm-bar';
    bar.innerHTML = '<button class="tbm-btn" type="button" aria-label="メニューを開く"><span></span><span></span><span></span></button>' +
        '<span class="tbm-title">Scouting Report</span><span class="tbm-page"></span>';
    bar.querySelector('.tbm-page').textContent = current.label;

    const overlay = document.createElement('div');
    overlay.className = 'tbm-overlay';

    const drawer = document.createElement('nav');
    drawer.className = 'tbm-drawer';
    drawer.innerHTML = '<div class="tbm-head"><b>メニュー</b><button class="tbm-close" type="button" aria-label="閉じる">×</button></div>';
    PAGES.forEach(p => {
        const a = document.createElement('a');
        a.href = p.href;
        a.textContent = p.label;
        if (p === current) a.className = 'active';
        drawer.appendChild(a);
    });

    // パスワードを保存している人向けに、メニューからもログアウトできるように
    const logout = document.createElement('a');
    logout.href = '#';
    logout.textContent = 'ログアウト';
    logout.style.cssText = 'margin-top:auto;color:#64748b;font-weight:500;border:1px solid #e2e8f0;text-align:center;';
    logout.addEventListener('click', e => { e.preventDefault(); if (window.TBSecure) window.TBSecure.logout(); });
    drawer.appendChild(logout);

    const spacer = document.createElement('div');
    spacer.className = 'tbm-spacer';

    document.body.prepend(spacer);
    document.body.append(bar, overlay, drawer);

    const open = () => document.documentElement.classList.add('tbm-open');
    const close = () => document.documentElement.classList.remove('tbm-open');
    bar.querySelector('.tbm-btn').addEventListener('click', open);
    overlay.addEventListener('click', close);
    drawer.querySelector('.tbm-close').addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    // 戻るボタンで戻ってきたときに開いたままにならないように
    window.addEventListener('pageshow', close);
})();
