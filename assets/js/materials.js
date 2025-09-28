//  Codes for the materials pages:

const moreBtn = document.querySelector('.more');
moreBtn.addEventListener('click', () => {
    const moreContent = document.querySelector('.more-content');
    moreContent.classList.toggle('show-more');
    if (moreContent.classList.contains('show-more')) {
        moreBtn.innersHTML = 'Show Less';
    } else {
        moreBtn.innerHTML = 'Show More';
    } 
}
);
