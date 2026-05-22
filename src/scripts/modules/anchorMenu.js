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

    const setActive = (link) => {
        buttons.forEach((el) => el.classList.remove('active'));
        if (link) link.classList.add('active');
    };

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
            setActive(item);
        });
    });

    const anchors = [];
    buttons.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (target) anchors.push({ target, link });
    });

    if (!anchors.length) return;

    const menuHeight = section.offsetHeight;
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;
    const triggerOffset = headerHeight + menuHeight;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const matched = anchors.find((a) => a.target === entry.target);
                    if (matched) setActive(matched.link);
                }
            });
        },
        {
            rootMargin: `-${triggerOffset}px 0px -50% 0px`,
            threshold: 0,
        }
    );

    anchors.forEach(({ target }) => observer.observe(target));
};
