import Swiper from 'swiper';
import { Pagination, Autoplay, A11y, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const initProjectMainSlider = () => {
    const el = document.querySelector('.projects-slider');
    if (!el) return;

    const wrapper = el.querySelector('.swiper-wrapper');

    const originalHTML = wrapper.innerHTML;

    const buildMobile = () => {
        const cards = [];
        wrapper.querySelectorAll('.project-card').forEach(card => {
            cards.push(card.cloneNode(true));
        });
        wrapper.innerHTML = '';
        cards.forEach(card => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.appendChild(card);
            wrapper.appendChild(slide);
        });
    };

    const restoreDesktop = () => {
        wrapper.innerHTML = originalHTML;
    };

    let swiper = null;
    let isMobile = null;

    const init = () => {
        const mobile = window.innerWidth <= 991;

        if (mobile === isMobile) return;
        isMobile = mobile;

        if (swiper) {
            swiper.destroy(true, true);
            swiper = null;
        }

        if (mobile) {
            buildMobile();
            swiper = new Swiper(el, {
                modules: [Navigation, Pagination, Autoplay, A11y],
                slidesPerView: 1.1,
                spaceBetween: 9,
                loop: true,
                autoplay: { delay: 5000, disableOnInteraction: false },
                navigation: {
                    nextEl: '.projects-map__footer .arrow--next',
                    prevEl: '.projects-map__footer .arrow--prev',
                },
                pagination: {
                    el: '.section--projects-map .swiper-pagination-custom',
                    clickable: true,
                },
                a11y: {
                    prevSlideMessage: 'Предыдущий слайд',
                    nextSlideMessage: 'Следующий слайд',
                },
            });
        } else {
            restoreDesktop();
            swiper = new Swiper(el, {
                modules: [Navigation, Pagination, Autoplay, A11y],
                slidesPerView: 1,
                spaceBetween: 12,
                loop: true,
                autoplay: { delay: 5000, disableOnInteraction: false },
                navigation: {
                    nextEl: '.projects-map__footer .arrow--next',
                    prevEl: '.projects-map__footer .arrow--prev',
                },
                pagination: {
                    el: '.section--projects-map .swiper-pagination-custom',
                    clickable: true,
                },
                a11y: {
                    prevSlideMessage: 'Предыдущий слайд',
                    nextSlideMessage: 'Следующий слайд',
                },
            });
        }
    };

    init();
    window.addEventListener('resize', init);
};
