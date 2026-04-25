import Swiper from 'swiper';
import { Pagination, A11y } from 'swiper/modules';

export const initPromosSlider = () => {
  const el = document.querySelector('.promos-slider');
  if (!el) return;

  new Swiper(el, {
    modules: [Pagination, A11y],
    slidesPerView: 3,
    spaceBetween: 16,
    loop: false,
    pagination: {
      el: '.swiper-pagination-promos',
      clickable: true,
    },
    a11y: {
      prevSlideMessage: 'Предыдущая акция',
      nextSlideMessage: 'Следующая акция',
    },
    breakpoints: {
      0: {
        slidesPerView: 1.15,
        spaceBetween: 12,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 14,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
    },
  });
};
