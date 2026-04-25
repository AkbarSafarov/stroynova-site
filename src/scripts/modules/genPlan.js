/**
 * Gen plan - Ген план
 */

export const initGenPlan = () => {
    const section = document.querySelector('.section--gen-plan');

    if(!section) return;

    const buttons = section.querySelector('.gen-plan-block__header-btns');

    const appendButtons = function() {
        if(window.innerWidth <= 767) {
           section.querySelector('.gen-plan-block').append(buttons)
        } else {
            section.querySelector('.gen-plan-block__header').append(buttons)
        }
    }

    appendButtons();

    window.addEventListener('resize', () => {
        appendButtons();
    })

}