import './css/styles.css'
import galleryItems from "./references/images.js"

const galleryContainer = document.querySelector('.js-gallery')
const  closeBtn = document.querySelector('[data-action="close-lightbox"]')
const modalBox = document.querySelector('.js-lightbox')
const lightbox__image = document.querySelector('.lightbox__image')
const backdrop = document.querySelector('.lightbox__overlay')


const imgMarkup = createGalleryImgsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('afterbegin', imgMarkup)

galleryContainer.addEventListener('click', onGalleryClick)
closeBtn.addEventListener('click', onCloseModal)
backdrop.addEventListener('click', onBackdropClick)

function createGalleryImgsMarkup(galleryItems){
   return galleryItems.map(({preview, original, description}) => {
    return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`
  }).join('')
}

function onOpenModal(){
  window.addEventListener("keydown", onEscKeyPress)
  window.addEventListener('keydown', onSliderClick)
  modalBox.classList.add('is-open')
}

function onCloseModal(){
  window.removeEventListener('keydown', onEscKeyPress)
  window.removeEventListener('keydown', onSliderClick)
  modalBox.classList.remove('is-open')
  lightbox__image.removeAttribute('src')
  lightbox__image.removeAttribute('alt')
}

function onGalleryClick(event){
event.preventDefault()
if(event.target.nodeName === 'IMG'){
  onOpenModal()
  lightbox__image.src = event.target.dataset.source
  lightbox__image.alt = event.target.alt
}
}

function onBackdropClick(event){
 if(event.currentTarget === event.target) {
   onCloseModal()
 }
}

function onEscKeyPress(event){
 if(event.code === "Escape"){
   onCloseModal();
 }
}

function onSliderClick(event){  
  let currentIndex = galleryItems.findIndex(el => el.original === lightbox__image.src)
if(event.code === "ArrowRight"){
   currentIndex += 1
   if (currentIndex>=galleryItems.length){
    currentIndex = 0
   }
} 
if(event.code === "ArrowLeft"){
  currentIndex -= 1
  if (currentIndex<0){
   currentIndex = galleryItems.length-1
  }
}
lightbox__image.src = galleryItems[currentIndex].original
lightbox__image.alt = galleryItems[currentIndex].description
} 
    
