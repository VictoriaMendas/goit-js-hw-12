import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getPhotos(query, page) {
  const API_KEY = '44385883-198adbd7f849b7ff14e77c80c';

  return await axios.get('', {
    params: {
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      key: API_KEY,
      page,
      per_page: 15,
    },
  });
}
