/**
 * Project steps - Ход строительства
 */

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, A11y, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const initStepsSlider = () => {
    const section = document.querySelector('.project-steps');

    if (!section) return;

    const sliders = section.querySelectorAll('.project-steps__slider');
    const customSelect = section.querySelector('.custom-select');
    const tabsTitles = section.querySelectorAll('.project-steps__tabs-title');
    const tabsBodys = section.querySelectorAll('.project-steps__tabs-body');

    if (sliders) {
        const sliderData = new Map();
        // храним данные для каждого слайдера: { swiper, originalHTML }

        function initSwiper(el, data) {
            const nextBtn = el.parentElement.querySelector('.arrow--next');
            const prevBtn = el.parentElement.querySelector('.arrow--prev');

            if (data.swiper) {
                data.swiper.destroy(true, true);
            }

            data.swiper = new Swiper(el, {
                modules: [Navigation, Pagination, Autoplay, A11y, Grid],
                loop: true,
                navigation: {
                    nextEl: nextBtn,
                    prevEl: prevBtn,
                },
                a11y: {
                    prevSlideMessage: 'Предыдущий слайд',
                    nextSlideMessage: 'Следующий слайд',
                },
                slidesPerView: 1.1,
                spaceBetween: 13,
                breakpoints: {
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    }
                }
            });
        }

        function restructureSlider(el) {
            const isMobile = window.innerWidth < 639;
            const swiperWrapper = el.querySelector('.swiper-wrapper');

            let data = sliderData.get(el);

            if (!data) {
                data = {
                    swiper: null,
                    originalHTML: swiperWrapper.innerHTML
                };
                sliderData.set(el, data);
            }

            if (isMobile) {
                const allImages = [];
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data.originalHTML;

                const slides = tempDiv.querySelectorAll('.swiper-slide');

                slides.forEach(slide => {
                    const images = slide.querySelectorAll('.image');
                    images.forEach(img => {
                        allImages.push(img.cloneNode(true));
                    });
                });

                swiperWrapper.innerHTML = '';

                allImages.forEach(image => {
                    const newSlide = document.createElement('div');
                    newSlide.className = 'swiper-slide';
                    newSlide.appendChild(image);
                    swiperWrapper.appendChild(newSlide);
                });
            } else {
                swiperWrapper.innerHTML = data.originalHTML;
            }

            initSwiper(el, data);
        }

        function initAllSliders() {
            sliders.forEach(el => {
                restructureSlider(el);
            });
        }

        initAllSliders();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                sliders.forEach(el => {
                    restructureSlider(el);
                });
            }, 250);
        });
    }

    if(customSelect) {
        const select = customSelect.querySelector('.custom-select__text');
        const selectDropdown = customSelect.querySelector('.custom-select__dropdown');
        const selectItems = customSelect.querySelectorAll('.custom-select__item');

        select.addEventListener('click', () => {
            select.classList.toggle('active');
            selectDropdown.classList.toggle('active');
        })

        selectItems.forEach((item) => {
            item.querySelector('a').addEventListener('click', () => {
                const selectedYear = item.querySelector('a').textContent;

                select.querySelector('span').textContent = selectedYear;

                selectItems.forEach((el) => el.querySelector('a').classList.remove('selected'));
                item.querySelector('a').classList.add('selected');

                select.classList.remove('active');
                selectDropdown.classList.remove('active');

                tabsTitles.forEach((title) => {
                    title.classList.remove('visible')

                    if(title.dataset.year == selectedYear) {
                        title.classList.add('visible');
                    }
                })


                const firstVisibleTab = [...tabsTitles].find((title) =>
                    title.classList.contains('visible')
                );

                if (firstVisibleTab) {
                    const link = firstVisibleTab.querySelector('a');
                    if (link) {
                        link.click();
                    }
                }
            })
        })
    }

    function myTabClicks(e) {
        e.preventDefault();

        tabsTitles.forEach(tab => tab.querySelector('a').classList.remove("active"));
        tabsBodys.forEach(body => body.classList.remove("active"));

        const clickedLink = e.currentTarget;
        const clickedTab = clickedLink.closest('.project-steps__tabs-title');

        clickedLink.classList.add("active");

        const year = clickedTab.dataset.year;
        const tabText = clickedLink.textContent.trim();

        const targetBody = [...tabsBodys].find(body => {
            return body.dataset.year === year && body.dataset.tab === tabText;
        });

        if (targetBody) {
            targetBody.classList.add("active");
        }
    }

    tabsTitles.forEach((title) => {
        const link = title.querySelector('a');
        link.addEventListener('click', myTabClicks);
    });
};
