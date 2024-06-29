export function createMarkup(array) {
  return array
    .map(
      elem => `    <li class="photo-card">
    
    <a class="img-link" href="${elem.largeImageURL}">
    <img class="img-card"
      src="${elem.webformatURL}"
      alt="${elem.tags}"

    /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes ${elem.likes}</b>
      </p>
      <p class="info-item"><b>Views ${elem.views}</b></p>
      <p class="info-item"><b>Comments ${elem.comments}</b></p>
      <p class="info-item"><b>Downloads ${elem.downloads}</b></p>
    </div>
  </li>
 `
    )
    .join('');
}
