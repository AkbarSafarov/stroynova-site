import Swiper from 'swiper';
import { Navigation, Pagination, A11y } from 'swiper/modules';

export const initAboutCompany = () => {
    // ---- Галерея ----
    const galleryEl = document.querySelector('.about-gallery-slider');
    if (galleryEl) {
        new Swiper(galleryEl, {
            modules: [Pagination, A11y],
            loop: true,
            pagination: {
                el: '.about-gallery-pagination',
                clickable: true,
            },
            a11y: {
                prevSlideMessage: 'Предыдущий слайд галереи',
                nextSlideMessage: 'Следующий слайд галереи',
            },
        });
    }

    // ---- Награды: табы по годам + ленивая инициализация слайдеров ----
    const awardsSection = document.querySelector('.awards-section');
    if (awardsSection) {
        const yearBtns  = awardsSection.querySelectorAll('.awards-year-btn');
        const panels    = awardsSection.querySelectorAll('.awards-tab');
        const swipers   = {};

        function initAwardsSwiper(panel) {
            const year = panel.dataset.year;
            if (swipers[year]) return swipers[year];
            const el = panel.querySelector('.awards-slider');
            if (!el) return null;
            swipers[year] = new Swiper(el, {
                modules: [Navigation, A11y],
                loop: false,
                navigation: {
                    nextEl: panel.querySelector('.arrow--next'),
                    prevEl: panel.querySelector('.arrow--prev'),
                },
                a11y: {
                    prevSlideMessage: 'Предыдущая награда',
                    nextSlideMessage: 'Следующая награда',
                },
            });
            return swipers[year];
        }

        const firstPanel = awardsSection.querySelector('.awards-tab:not([hidden])');
        if (firstPanel) initAwardsSwiper(firstPanel);

        yearBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const year = btn.dataset.awardsYear;

                yearBtns.forEach(b => {
                    b.classList.remove('awards-year-btn--active');
                    b.setAttribute('aria-selected', 'false');
                });
                panels.forEach(p => { p.hidden = true; });

                btn.classList.add('awards-year-btn--active');
                btn.setAttribute('aria-selected', 'true');

                const target = awardsSection.querySelector(`#awards-panel-${year}`);
                if (target) {
                    target.hidden = false;
                    const sw = initAwardsSwiper(target);
                    if (sw) sw.update();
                }
            });
        });
    }
};
