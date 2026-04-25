/**
 * Purchase Methods — vertical tabs
 */
export const initPurchaseTabs = () => {
  const section = document.querySelector('.section--purchase');
  if (!section) return;

  const buttons = section.querySelectorAll('.purchase__nav-btn');
  const tabs    = section.querySelectorAll('.purchase__tab');

  if (!buttons.length || !tabs.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      buttons.forEach(b => {
        b.classList.remove('purchase__nav-btn--active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('purchase__nav-btn--active');
      btn.setAttribute('aria-selected', 'true');

      tabs.forEach(tab => {
        const isActive = tab.id === `tab-${target}`;
        tab.hidden = !isActive;
        tab.classList.toggle('purchase__tab--active', isActive);
      });
    });
  });
};
