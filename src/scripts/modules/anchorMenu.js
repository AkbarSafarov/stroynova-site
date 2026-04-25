/**
 * Anchor menu - якорное меню
 */

export const initAnchorMenu = () => {
    const section = document.querySelector('.section--anchor-menu');

    if(!section) return;

    const buttons = section.querySelectorAll('.anchor-menu li a');

    buttons.forEach((item) => {
        item.addEventListener('click', () => {
            buttons.forEach((el) => el.classList.remove('active'));
            item.classList.add('active')
        })
    })
}