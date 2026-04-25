export const initPrivacyTabs = () => {
    const nav = document.querySelector('.privacy-tabs__nav');
    if (!nav) return;

    const btns   = nav.querySelectorAll('.privacy-tabs__btn');
    const panels = document.querySelectorAll('.privacy-panel');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const panelId = btn.getAttribute('aria-controls');

            btns.forEach(b => {
                b.classList.remove('privacy-tabs__btn--active');
                b.setAttribute('aria-selected', 'false');
            });
            panels.forEach(p => { p.hidden = true; });

            btn.classList.add('privacy-tabs__btn--active');
            btn.setAttribute('aria-selected', 'true');

            const target = document.getElementById(panelId);
            if (target) target.hidden = false;
        });
    });
};
