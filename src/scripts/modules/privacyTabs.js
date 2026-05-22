export const initPrivacyTabs = () => {
    const nav = document.querySelector('.privacy-tabs__nav');
    if (!nav) return;

    const btns   = nav.querySelectorAll('.privacy-tabs__btn');
    const panels = document.querySelectorAll('.privacy-panel');

    const activate = (btn) => {
        btns.forEach(b => {
            b.classList.remove('privacy-tabs__btn--active');
            b.setAttribute('aria-selected', 'false');
        });
        panels.forEach(p => { p.hidden = true; });

        btn.classList.add('privacy-tabs__btn--active');
        btn.setAttribute('aria-selected', 'true');

        const target = document.getElementById(btn.getAttribute('aria-controls'));
        if (target) target.hidden = false;
    };

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            activate(btn);
            const hash = btn.dataset.hash;
            if (hash) history.replaceState(null, '', '#' + hash);
        });
    });

    // Open tab by URL hash on page load
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const matched = [...btns].find(b => b.dataset.hash === hash);
        if (matched) activate(matched);
    }
};
