export const initDocsReadMore = () => {
    const intro = document.querySelector('.js-docs-intro');
    const btn = document.querySelector('.js-docs-intro-btn');
    if (!intro || !btn) return;

    btn.addEventListener('click', () => {
        intro.classList.add('is-expanded');
        btn.setAttribute('aria-expanded', 'true');
    });
};
