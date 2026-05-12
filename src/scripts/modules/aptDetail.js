/**
 * Project plans - Выберите планировку
 */

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';


export const initAptDetail = () => {

    const tabBtns  = document.querySelectorAll('[data-plan-tab]');
    const tabPanelMap = {
        layout: 'plan-layout',
        dims:   'plan-dims',
        floor:  'plan-floor',
        genplan:'plan-genplan',
        view:   'plan-view',
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.planTab;

            tabBtns.forEach(b => b.classList.remove('apt-tabs__btn--active'));
            btn.classList.add('apt-tabs__btn--active');

            Object.values(tabPanelMap).forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.remove('apt-plan-panel--active');
            });

            const target = document.getElementById(tabPanelMap[key]);
            if (target) target.classList.add('apt-plan-panel--active');
        });
    });

    const stickyBar = document.getElementById('apt-sticky-bar');
    if (stickyBar) {
        stickyBar.style.transition = 'transform 0.3s ease';
        stickyBar.style.transform  = 'translateY(100%)';

        const heroSection = document.querySelector('.apt-hero');
        const heroObserver = new IntersectionObserver(
            ([entry]) => {
                stickyBar.style.transform = entry.isIntersecting ? 'translateY(100%)' : 'translateY(0)';
            },
            { threshold: 0.2 }
        );
        if (heroSection) heroObserver.observe(heroSection);

        const footer = document.querySelector('.footer');
        if (footer) {
            const footerObserver = new IntersectionObserver(
                ([entry]) => {
                    stickyBar.classList.toggle('apt-sticky-bar--hidden', entry.isIntersecting);
                },
                { threshold: 0 }
            );
            footerObserver.observe(footer);
        }
    }

    document.querySelectorAll('.apt-hero__action-btn[aria-label="В избранное"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const svg = btn.querySelector('use');
            const isSaved = btn.classList.toggle('is-saved');
            btn.setAttribute('aria-label', isSaved ? 'Убрать из избранного' : 'В избранное');
            btn.style.color = isSaved ? 'var(--stroinova-green, #4a7c59)' : '';
        });
    });

    const aptViewer = document.querySelector('.apt-hero__viewer');
    if(!aptViewer) return;

    aptViewer.querySelectorAll('a[data-pswp-width]').forEach(link => {
        const img = new Image();
        img.onload = function() {
            link.dataset.pswpWidth = this.naturalWidth;
            link.dataset.pswpHeight = this.naturalHeight;
        };
        img.src = link.href;
    });

    aptViewer.querySelectorAll('.apt-plan-panel').forEach(item => {

        const lightbox = new PhotoSwipeLightbox({
            gallery: item,
            children: '.pswp-item',
            secondaryZoomLevel: 'fit',
            maxZoomLevel: 2,
            pswpModule: PhotoSwipe,
        });

        lightbox.init();
    });




};
