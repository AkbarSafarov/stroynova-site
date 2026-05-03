import { trapFocus } from '../utils/a11y.js';

export const initAboutProjectPopup = () => {
    const popup = document.getElementById('about-project-popup');
    if (!popup) return;

    const overlay  = popup.querySelector('.about-project-popup__overlay');
    const closeBtn = popup.querySelector('.about-project-popup__close');
    const sheet    = popup.querySelector('.about-project-popup__sheet');

    let releaseTrap = null;

    const open = () => {
        popup.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            releaseTrap = trapFocus(sheet);
        }, 50);
    };

    const close = () => {
        popup.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (releaseTrap) { releaseTrap(); releaseTrap = null; }
    };

    overlay.addEventListener('click', close);
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && popup.getAttribute('aria-hidden') === 'false') close();
    });

    document.querySelectorAll('.about-project__btn a').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            open();
        });
    });
};
