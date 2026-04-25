/**
 * Project documents - Документы
 */

export const projectDocs = () => {
    const section = document.querySelector('.section--documents-block');
    if(!section) return;
    const desktopMore = section.querySelector('.documents-block__more-btn a');
    const mobileMore = section.querySelector('.documents-block__mobile-more a');
    const projectDocuments = section.querySelectorAll('.documents-block__item');



    desktopMore.addEventListener('click', () => {
        desktopMore.classList.toggle('active')
        section.querySelector('.documents-block__body').classList.toggle('active')
    })

    mobileMore.addEventListener('click', () => {
        mobileMore.classList.toggle('active');

        mobileMore.classList.contains('active') ? mobileMore.textContent = mobileMore.dataset.text : mobileMore.textContent = mobileMore.dataset.text2;

        projectDocuments.forEach((item, index) => {
            if(index > 2) {
                item.classList.toggle('active');
            }
        });
    })
};
