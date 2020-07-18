import cards from "./gallery-items.js";

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxImg: document.querySelector('.lightbox__image'),
    closeOverlayBtn: document.querySelector('.lightbox__button'),
};

let imageNumber = 0;

refs.gallery.insertAdjacentHTML('afterbegin', createMarkUp());
refs.gallery.addEventListener('click', openLightbox);

function createMarkUp() {
    const markUp = cards.reduce((acc, image, index) => {
        acc += `<li class = 'gallery__item'>
        <a class = 'gallery__link' href = ${image.original}>
        <img class = 'gallery__image' src = ${image.preview} 
        data-number ='${index + 1}'
        data-source = ${image.original} 
        alt = ${image.description}>
        </a>
        </li>`;
        return acc;
    }, '');
    return markUp;
}

function openLightbox(event) {
    event.preventDefault();
    if(event.target.nodeName !== 'UL') {
        refs.lightbox.classList.add('is-open');
        showImage(event.target.dataset.source);
        imageNumber = Number(event.target.dataset.Number);
        addOverlayListeners();
    }
}

function addOverlayListeners() {
    refs.closeOverlayBtn.addEventListener('click', closeOverlay);
    refs.lightbox.addEventListener('click', clickOnOutClose);
}

function closeOverlay() {
    refs.lightbox.classList.remove('is-open');
    removeOverlayListeners();
    }

function removeOverlayListeners() {
    refs.lightbox.removeEventListener('click', clickOnOutClose);
    refs.closeOverlayBtn.removeEventListener('click', closeOverlay);
}

function showImage(link) {
    refs.lightboxImg.src = link;
}

function clickOnOutClose(event) {
    if(event.target.className === 'ligthbox__content') {
        closeOverlay();
    }
}
