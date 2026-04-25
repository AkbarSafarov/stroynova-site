import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const initAboutProjectSlider = () => {
    const el = document.querySelector('.about-project__images .swiper');
    if (!el) return;

    new Swiper(el, {
        modules: [Navigation, Pagination, Autoplay, A11y],
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.section--about-project .swiper-pagination-custom',
            clickable: true,
        }
    });
};
