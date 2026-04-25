/**
 * Project plans - Выберите планировку
 */

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

export const projectPlansTabs = () => {
    const section = document.querySelector('.project-plans');
    if(!section) return;

    const tabsTitles = section.querySelectorAll('.project-plans__tabs-title a');
    const tabsBodys = section.querySelectorAll('.project-plans__tabs-body');



    section.querySelectorAll('a[data-pswp-width]').forEach(link => {
        const img = new Image();
        img.onload = function() {
            link.dataset.pswpWidth = this.naturalWidth;
            link.dataset.pswpHeight = this.naturalHeight;
        };
        img.src = link.href;
    });

    const lightbox = new PhotoSwipeLightbox({
        gallery: '.project-plans__tabs-body',
        children: '.pswp-item',
        secondaryZoomLevel: 'fit',
        maxZoomLevel: 2,
        pswpModule: PhotoSwipe,
    });

    lightbox.init();

    section.querySelectorAll('.zoom-trigger').forEach(btn => {
        btn.addEventListener('click', function () {
            const imageLink = this.closest('.image').querySelector('.pswp-item');
            imageLink.click();
        });
    });

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
};
