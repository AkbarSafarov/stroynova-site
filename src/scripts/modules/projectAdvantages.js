/**
 * Project advantages - Особенности и премущества проекта
 */

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const initProjectAdvSlider = () => {
    const elems = document.querySelectorAll('.tab-body-inner__slider');

    if (!elems) return;

    elems.forEach((el) => {
        new Swiper(el, {
            modules: [Navigation, Pagination, Autoplay, A11y],
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: el.querySelector('.swiper-pagination-custom'),
                clickable: true,
            },
        });
    })

    
    const tabsTitles = document.querySelectorAll(".project-advantages__tabs-title a");
    const tabsBodys = document.querySelectorAll('.project-advantages__tabs-body');

    function myTabClicks(e) {
        e.preventDefault();

        tabsTitles.forEach(tab => tab.classList.remove("active"));
        tabsBodys.forEach(body => body.classList.remove("active"));

        const clickedTab = e.currentTarget;
        clickedTab.classList.add("active");

        const index = [...tabsTitles].indexOf(clickedTab);
        tabsBodys[index].classList.add("active");
    }
    
    tabsTitles.forEach((title) => {
        title.addEventListener('click', myTabClicks)
    })

    const moreTextBtn = document.querySelectorAll('.project-advantages__more-text a');

    moreTextBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');

            btn.classList.contains('active') ? btn.textContent = btn.dataset.text : btn.textContent = btn.dataset.text2;

            btn.closest('.tab-body-inner__left').querySelector('.tab-body-inner__text').classList.toggle('show-all');
        })
    })
};
