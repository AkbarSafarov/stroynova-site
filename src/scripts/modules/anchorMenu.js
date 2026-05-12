/**
 * Anchor menu - якорное меню
 */

export const initAnchorMenu = () => {
    const section = document.querySelector('.section--anchor-menu');

    if (!section) return;

    const sectionTop = section.offsetTop;
    const toggleAnchor = () => {
        section.classList.toggle('anchor--scrolled', window.scrollY > sectionTop);
    };

    toggleAnchor();
    window.addEventListener('scroll', toggleAnchor, { passive: true });

    const buttons = section.querySelectorAll('.anchor-menu li a');

    buttons.forEach((item) => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const header = document.querySelector('.header');
            const offset = (header ? header.offsetHeight : 0) + section.offsetHeight;
            const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({ top: targetTop, behavior: 'smooth' });

            buttons.forEach((el) => el.classList.remove('active'));
            item.classList.add('active');
        });
    });
}
