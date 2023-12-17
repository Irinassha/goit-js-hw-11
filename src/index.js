import { ApiByPhoto } from './js/photo-api';
import { photoGallery } from './js/photo-gallery';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const apiByPhoto = new ApiByPhoto();
var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: `alt`,
});

const gallery = document.querySelector('.gallery');
const searchPhoto = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');

loadMore.hidden = true;

async function photoNameChoice(event) {
  event.preventDefault();
  apiByPhoto.page = 1;
  const { target: searchPhoto } = event;
  apiByPhoto.photoId = searchPhoto.elements.searchQuery.value;
  Notiflix.Notify.info(`Search photo: ${apiByPhoto.photoId}`);

  try {
    const data = await apiByPhoto.FetchByPhoto();

    if (data.data.total === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      gallery.innerHTML = photoGallery(data.data.hits);
      loadMore.hidden = false;
      Notiflix.Notify.success(
        `Hooray! We found ${data.data.total} images.
        Shown 20 photos`
      );
      lightbox.refresh();
    }
  } catch (error) {
    Notiflix.Notify.failure('Sorry there was an error');
  }
}

async function photoAddMore() {
  apiByPhoto.page += 1;
  apiByPhoto.per_page = 40;

  try {
    const data = await apiByPhoto.FetchByPhoto();
    gallery.insertAdjacentHTML('beforeend', photoGallery(data.data.hits));
    Notiflix.Notify.success(`Show the next 40 photos.`);
    lightbox.refresh();

    if (apiByPhoto.page === data.totalHits) {
      loadMore.hidden = true;
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (err) {
    Notiflix.Notify.failure('Error');
  }
}

searchPhoto.addEventListener('submit', photoNameChoice);
loadMore.addEventListener('click', photoAddMore);
