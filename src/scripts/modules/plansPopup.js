/**
 * "Показать N квартиры"
 */
import { trapFocus } from '../utils/a11y.js';

export const initPlansPopup = () => {
    const popup = document.getElementById('plans-popup');
    if (!popup) return;

    const overlay = popup.querySelector('.plans-popup__overlay');
    const closeBtn = popup.querySelector('.plans-popup__close');
    const container = popup.querySelector('.plans-popup__container');

    let releaseTrap = null;

    const open = () => {
        popup.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            releaseTrap = trapFocus(container);
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

    document.querySelectorAll('.plans-show-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            open();
        });
    });
};
