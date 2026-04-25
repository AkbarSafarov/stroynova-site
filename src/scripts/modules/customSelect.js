/**
 * Custom select — replaces native <select> in filters
 * Trigger: .c-select[data-name]
 */

const setupOne = (select) => {
    const trigger   = select.querySelector('.c-select__trigger');
    const dropdown  = select.querySelector('.c-select__dropdown');
    const valueEl   = select.querySelector('.c-select__value');
    const hidden    = select.querySelector('.c-select__hidden');
    if (!trigger || !dropdown) return;

    const isOpen = () => trigger.getAttribute('aria-expanded') === 'true';

    const open = () => {
        trigger.setAttribute('aria-expanded', 'true');
        dropdown.hidden = false;
    };

    const close = () => {
        trigger.setAttribute('aria-expanded', 'false');
        dropdown.hidden = true;
    };

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen() ? close() : open();
    });

    dropdown.querySelectorAll('.c-select__option').forEach(option => {
        option.addEventListener('click', () => {
            dropdown.querySelectorAll('.c-select__option')
                .forEach(o => o.setAttribute('aria-selected', 'false'));
            option.setAttribute('aria-selected', 'true');
            if (valueEl)  valueEl.textContent  = option.textContent.trim();
            if (hidden)   hidden.value         = option.dataset.value ?? '';
            close();
            trigger.focus();
        });
    });

    document.addEventListener('click', (e) => {
        if (!select.contains(e.target)) close();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen()) { close(); trigger.focus(); }
    });
};

export const initCustomSelects = () => {
    document.querySelectorAll('.c-select').forEach(setupOne);
};

export const resetCustomSelect = (select) => {
    if (!select) return;
    const options  = select.querySelectorAll('.c-select__option');
    const valueEl  = select.querySelector('.c-select__value');
    const hidden   = select.querySelector('.c-select__hidden');
    options.forEach(o => o.setAttribute('aria-selected', 'false'));
    if (options[0]) {
        options[0].setAttribute('aria-selected', 'true');
        if (valueEl) valueEl.textContent = options[0].textContent.trim();
        if (hidden)  hidden.value = options[0].dataset.value ?? '';
    }
};
