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
        const heroSection = document.querySelector('.apt-hero');
        const observer = new IntersectionObserver(
            ([entry]) => {
                stickyBar.style.transform = entry.isIntersecting ? 'translateY(100%)' : 'translateY(0)';
            },
            { threshold: 0.2 }
        );
        if (heroSection) observer.observe(heroSection);
        stickyBar.style.transition = 'transform 0.3s ease';
        stickyBar.style.transform  = 'translateY(100%)';
    }

    document.querySelectorAll('.apt-hero__action-btn[aria-label="В избранное"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const svg = btn.querySelector('use');
            const isSaved = btn.classList.toggle('is-saved');
            btn.setAttribute('aria-label', isSaved ? 'Убрать из избранного' : 'В избранное');
            btn.style.color = isSaved ? 'var(--stroinova-green, #4a7c59)' : '';
        });
    });
};
