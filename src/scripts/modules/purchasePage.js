export const initPurchasePage = () => {
    const mainBtns   = document.querySelectorAll('[data-main-tab]');
    const mainPanels = document.querySelectorAll('.pp-panel');
    if (!mainBtns.length) return;

    mainBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.mainTab;

            mainBtns.forEach(b => {
                b.classList.remove('pp-tabs__btn--active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('pp-tabs__btn--active');
            btn.setAttribute('aria-selected', 'true');

            mainPanels.forEach(p => {
                p.classList.toggle('pp-panel--active', p.id === `main-${key}`);
            });
        });
    });

    document.querySelectorAll('[data-sub-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
            const key    = btn.dataset.subTab;
            const parent = btn.closest('.pp-panel') || document;

            btn.closest('.pp-sub-tabs').querySelectorAll('[data-sub-tab]').forEach(b => {
                b.classList.remove('pp-sub-tabs__btn--active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('pp-sub-tabs__btn--active');
            btn.setAttribute('aria-selected', 'true');

            parent.querySelectorAll('.pp-sub-panel').forEach(p => {
                p.classList.toggle('pp-sub-panel--active', p.id === key);
            });
        });
    });
};
