/**
 * About Tabs — full-width image tabs (О компании / История / Награды / Рейтинги)
 */
export const initAboutTabs = () => {
  const section = document.querySelector('.section--about-tabs');
  if (!section) return;

  const buttons = section.querySelectorAll('.about-tabs__nav-btn');
  const panels  = section.querySelectorAll('.about-tabs__panel');

  if (!buttons.length || !panels.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      buttons.forEach(b => {
        b.classList.remove('about-tabs__nav-btn--active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('about-tabs__nav-btn--active');
      btn.setAttribute('aria-selected', 'true');

      panels.forEach(panel => {
        const isActive = panel.id === `about-tab-${target}`;
        panel.hidden = !isActive;
        panel.classList.toggle('about-tabs__panel--active', isActive);
      });
    });
  });
};
