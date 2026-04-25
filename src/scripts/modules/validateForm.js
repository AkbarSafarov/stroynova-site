/**
 * Form validation + phone mask — shared across all site forms
 */

const RULES = {
    name: {
        validate: (v) => v.trim().length >= 2 && /^[а-яёА-ЯЁa-zA-Z\s\-]+$/.test(v.trim()),
        message: 'Введите имя (минимум 2 буквы)',
    },
    phone: {
        validate: (v) => /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/.test(v),
        message: 'Введите корректный номер телефона',
    },
    consent: {
        validate: (el) => el.checked,
        message: 'Необходимо ваше согласие',
    },
};

export const applyPhoneMask = (input) => {
    input.addEventListener('input', () => {
        let digits = input.value.replace(/\D/g, '');

        if (digits.startsWith('8')) digits = '7' + digits.slice(1);
        if (!digits.startsWith('7')) digits = '7' + digits;
        digits = digits.slice(0, 11);

        const d = digits.padEnd(11, '_');
        let masked = `+${d[0]}(${d[1]}${d[2]}${d[3]})-${d[4]}${d[5]}${d[6]}-${d[7]}${d[8]}-${d[9]}${d[10]}`;
        masked = masked.replace(/[_\-()]+$/, '');
        input.value = masked;
    });

    input.addEventListener('focus', () => {
        if (!input.value) input.value = '+7(';
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value === '+7(') {
            e.preventDefault();
            input.value = '';
        }
    });
};

const showInputError = (field, wrap, message) => {
    field.classList.add('is-invalid');
    let badge = wrap.querySelector('.contact-cta__error');
    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'contact-cta__error';
        badge.setAttribute('role', 'alert');
        wrap.appendChild(badge);
    }
    badge.textContent = message;
};

const clearInputError = (field, wrap) => {
    field.classList.remove('is-invalid');
    wrap.querySelector('.contact-cta__error')?.remove();
};

const showCheckboxError = (wrap, message) => {
    wrap.classList.add('is-invalid');
    let err = wrap.querySelector('.contact-cta__error');
    if (!err) {
        err = document.createElement('span');
        err.className = 'contact-cta__error';
        err.setAttribute('role', 'alert');
        wrap.appendChild(err);
    }
    err.textContent = message;
};

const clearCheckboxError = (wrap) => {
    wrap.classList.remove('is-invalid');
    wrap.querySelector('.contact-cta__error')?.remove();
};

const showAskError = (field, wrap, message) => {
    field.classList.add('is-invalid');
    let badge = wrap.querySelector('.ask-field__error');
    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'ask-field__error';
        badge.setAttribute('role', 'alert');
        wrap.appendChild(badge);
    }
    badge.textContent = message;
};

const clearAskError = (field, wrap) => {
    field.classList.remove('is-invalid');
    wrap.querySelector('.ask-field__error')?.remove();
};

const showAskConsentError = (label, message) => {
    label.classList.add('is-invalid');
    let err = label.querySelector('.ask-field__error');
    if (!err) {
        err = document.createElement('span');
        err.className = 'ask-field__error';
        err.setAttribute('role', 'alert');
        label.appendChild(err);
    }
    err.textContent = message;
};

const clearAskConsentError = (label) => {
    label.classList.remove('is-invalid');
    label.querySelector('.ask-field__error')?.remove();
};

const setupCtaForm = (form) => {
    const nameInput    = form.querySelector('[name="name"]');
    const phoneInput   = form.querySelector('[name="phone"]');
    const consentInput = form.querySelector('[name="consent"]');
    if (!nameInput || !phoneInput || !consentInput) return;

    const nameField   = nameInput.closest('.contact-cta__field');
    const nameWrap    = nameInput.closest('.contact-cta__input-wrap');
    const phoneField  = phoneInput.closest('.contact-cta__field');
    const phoneWrap   = phoneInput.closest('.contact-cta__input-wrap');
    const consentWrap = consentInput.closest('.contact-cta__checkbox-wrap');

    applyPhoneMask(phoneInput);

    const vName    = () => { const ok = RULES.name.validate(nameInput.value);    ok ? clearInputError(nameField, nameWrap)     : showInputError(nameField, nameWrap, RULES.name.message);      return ok; };
    const vPhone   = () => { const ok = RULES.phone.validate(phoneInput.value);  ok ? clearInputError(phoneField, phoneWrap)   : showInputError(phoneField, phoneWrap, RULES.phone.message);    return ok; };
    const vConsent = () => { const ok = RULES.consent.validate(consentInput);    ok ? clearCheckboxError(consentWrap)          : showCheckboxError(consentWrap, RULES.consent.message);          return ok; };

    nameInput.addEventListener('blur',      vName);
    phoneInput.addEventListener('blur',     vPhone);
    consentInput.addEventListener('change', vConsent);
    nameInput.addEventListener('input',  () => { if (nameField.classList.contains('is-invalid'))  vName(); });
    phoneInput.addEventListener('input', () => { if (phoneField.classList.contains('is-invalid')) vPhone(); });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const ok = vName() & vPhone() & vConsent();
        if (!ok) { form.querySelector('.is-invalid input, .is-invalid')?.focus(); return; }

        const submit = form.querySelector('.contact-cta__submit');
        submit.disabled = true;
        submit.textContent = 'Отправлено!';
        setTimeout(() => { form.reset(); submit.disabled = false; submit.textContent = 'Отправить'; }, 3000);
    });
};

const setupAskForm = (form) => {
    const nameInput    = form.querySelector('[name="name"]');
    const phoneInput   = form.querySelector('[name="phone"]');
    const consentInput = form.querySelector('[name="consent"]');
    if (!nameInput || !phoneInput || !consentInput) return;

    const nameField   = nameInput.closest('.ask-field');
    const nameWrap    = nameInput.closest('.ask-field__wrap');
    const phoneField  = phoneInput.closest('.ask-field');
    const phoneWrap   = phoneInput.closest('.ask-field__wrap');
    const consentLabel = consentInput.closest('.catalog-ask-form__consent');

    applyPhoneMask(phoneInput);

    const vName    = () => { const ok = RULES.name.validate(nameInput.value);   ok ? clearAskError(nameField, nameWrap)         : showAskError(nameField, nameWrap, RULES.name.message);       return ok; };
    const vPhone   = () => { const ok = RULES.phone.validate(phoneInput.value); ok ? clearAskError(phoneField, phoneWrap)       : showAskError(phoneField, phoneWrap, RULES.phone.message);     return ok; };
    const vConsent = () => { const ok = RULES.consent.validate(consentInput);   ok ? clearAskConsentError(consentLabel)         : showAskConsentError(consentLabel, RULES.consent.message);      return ok; };

    nameInput.addEventListener('blur',      vName);
    phoneInput.addEventListener('blur',     vPhone);
    consentInput.addEventListener('change', vConsent);
    nameInput.addEventListener('input',  () => { if (nameField.classList.contains('is-invalid'))  vName(); });
    phoneInput.addEventListener('input', () => { if (phoneField.classList.contains('is-invalid')) vPhone(); });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const ok = vName() & vPhone() & vConsent();
        if (!ok) { form.querySelector('.is-invalid input, .is-invalid')?.focus(); return; }

        const submit = form.querySelector('.catalog-ask-form__submit');
        submit.disabled = true;
        submit.textContent = 'Отправлено!';
        setTimeout(() => { form.reset(); submit.disabled = false; submit.textContent = 'Отправить'; }, 3000);
    });
};

export const initMortgageForm = () => {
    const formDiv = document.querySelector('.section--mortgage .mortgage__form');
    if (!formDiv) return;

    const phoneInput   = formDiv.querySelector('[name="phone"]');
    const consentInput = formDiv.querySelector('[name="consent"]');
    if (!phoneInput || !consentInput) return;

    const phoneField  = phoneInput.closest('.contact-cta__field');
    const phoneWrap   = phoneInput.closest('.contact-cta__input-wrap');
    const consentWrap = consentInput.closest('.contact-cta__checkbox-wrap');
    const submitBtn   = formDiv.querySelector('.mortgage__submit');

    applyPhoneMask(phoneInput);

    const vPhone   = () => { const ok = RULES.phone.validate(phoneInput.value); ok ? clearInputError(phoneField, phoneWrap) : showInputError(phoneField, phoneWrap, RULES.phone.message); return ok; };
    const vConsent = () => { const ok = RULES.consent.validate(consentInput);   ok ? clearCheckboxError(consentWrap)        : showCheckboxError(consentWrap, RULES.consent.message);         return ok; };

    phoneInput.addEventListener('blur',     vPhone);
    consentInput.addEventListener('change', vConsent);
    phoneInput.addEventListener('input', () => { if (phoneField.classList.contains('is-invalid')) vPhone(); });

    submitBtn.addEventListener('click', () => {
        const ok = vPhone() & vConsent();
        if (!ok) { phoneField.classList.contains('is-invalid') ? phoneInput.focus() : consentInput.focus(); return; }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправлено!';
        setTimeout(() => {
            phoneInput.value = '';
            consentInput.checked = false;
            clearInputError(phoneField, phoneWrap);
            clearCheckboxError(consentWrap);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Получить предложение';
        }, 3000);
    });
};

export const initContactForm = () => {
    document.querySelectorAll('.contact-cta__form').forEach(setupCtaForm);
};

export const initFaqForm = () => {
    document.querySelectorAll('.catalog-ask-form__form').forEach(setupAskForm);
};
