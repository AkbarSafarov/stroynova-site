const initSortDropdown = (dropdown) => {
    const trigger = dropdown.querySelector('.catalog-sort__trigger');
    const current = dropdown.querySelector('.catalog-sort__current');
    const options = dropdown.querySelectorAll('.catalog-sort__option');

    if (!trigger) return;

    const open   = () => { dropdown.classList.add('is-open');    trigger.setAttribute('aria-expanded', 'true'); };
    const close  = () => { dropdown.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); };
    const toggle = () => dropdown.classList.contains('is-open') ? close() : open();

    trigger.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });

    options.forEach(opt => {
        opt.addEventListener('click', () => {
            options.forEach(o => { o.classList.remove('is-active'); o.setAttribute('aria-selected', 'false'); });
            opt.classList.add('is-active');
            opt.setAttribute('aria-selected', 'true');
            if (current) current.textContent = opt.textContent;
            close();
            dropdown.dispatchEvent(new CustomEvent('sort-change', { detail: { value: opt.dataset.value }, bubbles: true }));
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) close();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
};

export const initCatalogSort = () => {
    document.querySelectorAll('.catalog-sort__dropdown').forEach(initSortDropdown);
};
