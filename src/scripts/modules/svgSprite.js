/**
 * SVG Sprite loader
 */

export const loadSvgSprite = async (url) => {
  if (document.querySelector('[data-svg-sprite]')) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`SVG sprite fetch failed: ${res.status}`);
    const text = await res.text();
    const container = document.createElement('div');
    container.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
    container.setAttribute('aria-hidden', 'true');
    container.innerHTML = text;
    document.body.insertAdjacentElement('afterbegin', container);
  } catch (err) {
    console.warn('SVG sprite error:', err.message);
  }
};
