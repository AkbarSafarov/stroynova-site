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



    section.querySelectorAll('a.pswp-item').forEach(link => {
        const thumbImg = link.querySelector('img');
        if (!thumbImg) return;
        const apply = () => {
            if (thumbImg.naturalWidth > 0) {
                link.dataset.pswpWidth = thumbImg.naturalWidth;
                link.dataset.pswpHeight = thumbImg.naturalHeight;
            }
        };
        if (thumbImg.complete) apply();
        else thumbImg.addEventListener('load', apply, { once: true });
    });

    const lightbox = new PhotoSwipeLightbox({
        gallery: '.project-plans__tabs-body',
        children: '.pswp-item',
        secondaryZoomLevel: 'fit',
        maxZoomLevel: 2,
        pswpModule: PhotoSwipe,
    });

    lightbox.on('contentLoad', (e) => {
        const { content } = e;
        if (content.type !== 'image' || (content.data.w > 0 && content.data.h > 0)) return;
        e.preventDefault();
        const img = document.createElement('img');
        img.className = 'pswp__img';
        content.element = img;
        img.onload = () => {
            content.data.w = img.naturalWidth;
            content.data.h = img.naturalHeight;
            content.onLoaded();
        };
        img.onerror = () => content.onError();
        img.src = content.data.src;
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
