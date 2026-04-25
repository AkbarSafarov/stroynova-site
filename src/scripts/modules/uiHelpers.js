// Cookie banner, Telegram banner, Scroll-to-top

export const initUiHelpers = () => {
    // ---- Cookie banner ----
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieOk = document.getElementById('cookie-ok');

    if (cookieBanner && cookieOk) {
        if (localStorage.getItem('cookie-accepted')) {
            cookieBanner.classList.add('is-hidden');
        }
        cookieOk.addEventListener('click', () => {
            localStorage.setItem('cookie-accepted', '1');
            cookieBanner.classList.add('is-hidden');
        });
    }

    // ---- Telegram banner ----
    const tgBanner = document.getElementById('tg-banner');
    const tgClose = document.getElementById('tg-banner-close');

    if (tgBanner && tgClose) {
        if (sessionStorage.getItem('tg-banner-closed')) {
            tgBanner.classList.add('is-hidden');
        }
        tgClose.addEventListener('click', () => {
            sessionStorage.setItem('tg-banner-closed', '1');
            tgBanner.classList.add('is-hidden');
        });
    }

    // ---- Scroll-to-top ----
    const scrollBtn = document.getElementById('scroll-top');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            scrollBtn.hidden = window.scrollY < 400;
        }, { passive: true });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};
