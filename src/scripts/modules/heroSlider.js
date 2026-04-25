import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const initHeroSlider = () => {
  const el = document.querySelector('.hero-slider');
  if (!el) return;

  new Swiper(el, {
    modules: [Navigation, Pagination, Autoplay, A11y],
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
      navigation: {
          nextEl: ".section--hero .arrow--next",
          prevEl: ".section--hero .arrow--prev",
      },
    pagination: {
      el: '.section--hero .swiper-pagination-custom',
      clickable: true,
    },
    a11y: {
      prevSlideMessage: 'Предыдущий слайд',
      nextSlideMessage: 'Следующий слайд',
    },
  });
};
