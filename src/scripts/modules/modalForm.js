import { applyPhoneMask } from './validateForm.js';
import { trapFocus } from '../utils/a11y.js';

const RULES = {
    name:  { validate: (v) => v.trim().length >= 2 && /^[а-яёА-ЯЁa-zA-Z\s\-]+$/.test(v.trim()), message: 'Введите имя (минимум 2 буквы)' },
    phone: { validate: (v) => /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(v), message: 'Введите корректный номер телефона' },
};

const showErr = (wrap, msg) => {
    let b = wrap.querySelector('.modal-form__error');
    if (!b) { b = document.createElement('span'); b.className = 'modal-form__error'; b.setAttribute('role', 'alert'); wrap.appendChild(b); }
    b.textContent = msg;
};

const clearErr = (wrap) => wrap.querySelector('.modal-form__error')?.remove();

const setupModal = (modal) => {
    if (!modal) return null;

    const form         = modal.querySelector('.modal-form__form');
    const closeBtn     = modal.querySelector('.modal-form__close');
    const overlay      = modal.querySelector('.modal-form__overlay');
    const submitBtn    = modal.querySelector('.modal-form__submit');
    const card         = modal.querySelector('.modal-form__card');

    const nameInput    = form.querySelector('[name="name"]');
    const phoneInput   = form.querySelector('[name="phone"]');
    const consentInput = form.querySelector('[name="consent"]');

    const nameField   = nameInput.closest('.modal-form__field');
    const nameWrap    = nameInput.closest('.modal-form__input-wrap');
    const phoneField  = phoneInput.closest('.modal-form__field');
    const phoneWrap   = phoneInput.closest('.modal-form__input-wrap');
    const consentWrap = consentInput.closest('.modal-form__checkbox-wrap');

    applyPhoneMask(phoneInput);

    const vName    = () => { const ok = RULES.name.validate(nameInput.value);   ok ? (nameField.classList.remove('is-invalid'),  clearErr(nameWrap))  : (nameField.classList.add('is-invalid'),  showErr(nameWrap, RULES.name.message));  return ok; };
    const vPhone   = () => { const ok = RULES.phone.validate(phoneInput.value); ok ? (phoneField.classList.remove('is-invalid'), clearErr(phoneWrap)) : (phoneField.classList.add('is-invalid'), showErr(phoneWrap, RULES.phone.message)); return ok; };
    const vConsent = () => { const ok = consentInput.checked; ok ? (consentWrap.classList.remove('is-invalid'), clearErr(consentWrap)) : (consentWrap.classList.add('is-invalid'), showErr(consentWrap, 'Необходимо ваше согласие')); return ok; };

    nameInput.addEventListener('blur',      vName);
    phoneInput.addEventListener('blur',     vPhone);
    consentInput.addEventListener('change', vConsent);
    nameInput.addEventListener('input',  () => { if (nameField.classList.contains('is-invalid'))  { vName(); } });
    phoneInput.addEventListener('input', () => { if (phoneField.classList.contains('is-invalid')) { vPhone(); } });

    const resetErrors = () => {
        [nameField, phoneField].forEach(f => f.classList.remove('is-invalid'));
        [nameWrap, phoneWrap, consentWrap].forEach(w => clearErr(w));
        consentWrap.classList.remove('is-invalid');
    };

    let releaseTrap = null;

    const close = () => {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        form.reset();
        resetErrors();
        if (releaseTrap) { releaseTrap(); releaseTrap = null; }
    };

    const open = () => {
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            releaseTrap = trapFocus(card);
        }, 50);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const ok = vName() & vPhone() & vConsent();
        if (!ok) { form.querySelector('.is-invalid input, .is-invalid')?.focus(); return; }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправлено!';
        setTimeout(() => { close(); submitBtn.disabled = false; submitBtn.textContent = 'Отправить'; }, 2000);
    });

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') { close(); }
    });

    return { modal, open, close };
};

export const initModalForm = () => {
    const bookModal    = document.getElementById('modal-book');
    const consultModal = document.getElementById('modal-consult');

    const book    = setupModal(bookModal);
    const consult = setupModal(consultModal);

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-modal-open]');
        if (!btn) return;

        const isBook = btn.dataset.modalOpen === 'book';
        const instance = isBook ? book : consult;
        if (!instance) return;

        if (isBook) {
            const subtitleEl = bookModal.querySelector('#modal-book-subtitle');
            const h = document.getElementById('apt-title');
            if (subtitleEl) { subtitleEl.textContent = h ? h.textContent.trim() : ''; }
        }

        instance.open();
    });
};
