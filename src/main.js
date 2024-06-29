import { getPhotos } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const form = document.querySelector('form');
const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onBtnClick);

let searchQuery = null;
let page = 1;

async function onSubmit(e) {
  e.preventDefault();

  galleryList.innerHTML = '';

  loader.classList.remove('is-hidden');
  page = 1;
  loadMoreBtn.classList.add('is-hidden');
  searchQuery = e.target.elements.search.value.trim();

  if (searchQuery === '') {
    loader.classList.add('is-hidden');
    return;
  }

  try {
    const res = await getPhotos(searchQuery, page);

    if (res.data.hits.length === 0) {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
    galleryList.innerHTML = createMarkup(res.data.hits);

    lightbox.refresh();

    if (res.data.totalHits > 15) {
      loadMoreBtn.classList.remove('is-hidden');
    } else {
      loadMoreBtn.classList.add('is-hidden');
    }
  } catch (error) {
    iziToast.error({
      position: 'topLeft',
      message: 'Error. Please try again!!',
    });
  } finally {
    loader.classList.add('is-hidden');
  }
}

async function onBtnClick(e) {
  page += 1;
  loader.classList.remove('is-hidden');

  try {
    const res = await getPhotos(searchQuery, page);
    const lastPage = Math.ceil(res.data.totalHits / 15);

    galleryList.insertAdjacentHTML('beforeend', createMarkup(res.data.hits));

    lightbox.refresh();

    // ____FN SCROLL________
    const cardHeight =
      galleryList.firstElementChild.getBoundingClientRect().height;
    console.log(cardHeight);
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page === lastPage) {
      loadMoreBtn.classList.add('is-hidden');

      return iziToast.error({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      position: 'topLeft',
      message: 'Error. Please try again!!',
    });
  } finally {
    loader.classList.add('is-hidden');
  }
}
