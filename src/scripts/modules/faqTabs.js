export const initFaqTabs = () => {
    const page = document.querySelector('.faq-page');
    if (!page) return;

    const sortDropdown = document.querySelector('.faq-sort__dropdown');
    const trigger      = sortDropdown?.querySelector('.faq-sort__trigger');
    const current      = sortDropdown?.querySelector('.faq-sort__current');
    const options      = sortDropdown ? sortDropdown.querySelectorAll('.faq-sort__option') : [];

    const navBtns = page.querySelectorAll('.faq-page__nav-btn');
    const groups  = page.querySelectorAll('.faq-page__group');

    if (!groups.length) return;

    const switchTab = (tabId) => {
        navBtns.forEach(btn => {
            const active = btn.dataset.faqTab === tabId;
            btn.classList.toggle('faq-page__nav-btn--active', active);
            btn.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        groups.forEach(group => {
            const active = group.id === `faq-tab-${tabId}`;
            group.hidden = !active;
            group.classList.toggle('faq-page__group--active', active);
        });
    };

    const openDrop  = () => {
        if (!sortDropdown) return;
        sortDropdown.classList.add('is-open');
        trigger?.setAttribute('aria-expanded', 'true');
    };
    const closeDrop = () => {
        if (!sortDropdown) return;
        sortDropdown.classList.remove('is-open');
        trigger?.setAttribute('aria-expanded', 'false');
    };
    const toggleDrop = () =>
        sortDropdown?.classList.contains('is-open') ? closeDrop() : openDrop();

    const syncDrop = (tabId) => {
        options.forEach(o => {
            const active = o.dataset.faqTab === tabId;
            o.classList.toggle('is-active', active);
            o.setAttribute('aria-selected', active ? 'true' : 'false');
            if (active && current) current.textContent = o.textContent.trim();
        });
    };

    if (trigger) {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDrop();
        });
    }

    options.forEach(option => {
        option.addEventListener('click', () => {
            const tabId = option.dataset.faqTab;
            syncDrop(tabId);
            closeDrop();
            switchTab(tabId);
        });
    });

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.faqTab;
            switchTab(tabId);
            syncDrop(tabId);
        });
    });

    document.addEventListener('click', (e) => {
        if (sortDropdown && !sortDropdown.contains(e.target)) closeDrop();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrop();
    });
};
