export const photoGallery = photo => {
  return photo
    .map(photo => {
      return `<div class="photo-card"><a class="simpl" href=${photo.largeImageURL}><img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" width=100% height=250px/>
      </a><div class="info">
    <p class="info-item">
      <b>Likes <br/> ${photo.likes}</b>
    </p>
    <p class="info-item">
      <b>Views <br/> ${photo.views}</b>
    </p>
    <p class="info-item">
      <b>Comements <br/> ${photo.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloands <br/> ${photo.downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
};

