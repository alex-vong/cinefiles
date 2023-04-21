const form = document.querySelector('#search-form'),
  input = document.querySelector('#search-input'),
  ul = document.querySelector('.results-ul'),
  landing = document.querySelector('.landing'),
  searchFeedback = document.querySelector('#search-feedback'),
  dropDown = document.querySelector('.search-dd'),
  navSearch = document.querySelector('.nav-search'),
  closeSearch = document.querySelector('i.close-search'),
  gridContainer = document.querySelector('.show-grid-container');

dropDown.addEventListener('click', () => {
  console.log(navSearch.classList);
  navSearch.classList.remove('slide-out');
  navSearch.classList.add('slide-in');
  navSearch.style.zIndex = '-1000';

  setTimeout(() => {
    navSearch.style.zIndex = '0';
  }, 1000);

  // gridContainer.style.paddingTop = '100px';
});

closeSearch.addEventListener('click', () => {
  if (window.innerWidth < 1000) {
    navSearch.style.zIndex = '-1000';
    console.log('clicked');
  }

  // gridContainer.style.paddingTop = '30px';
  navSearch.classList.remove('slide-in');
  navSearch.classList.add('slide-out');
  navSearch.style.animationDuration = '0.3s';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  landing.style.display = 'hidden';
  const results = await getTvShows();
  console.log(results);

  let li = '',
    premiered = '',
    img = '';
  for (let show of results) {
    const name = show.show.name,
      type = show.show.type;

    if (show.show.premiered) {
      premiered = show.show.premiered.substring(0, 4);
    } else {
      premiered = `N/A`;
    }

    if (show.show.image) {
      img = show.show.image.medium;
    } else {
      img = `images/unavailable.svg`;
    }

    li += `<li>
			       <picture>
			       	  <img src="${img}" alt="show poster for ${name}" loading="lazy">
			       </picture>

			       <h2>${name}</h2>
			       <div class="preview-info">
			       		<span>${premiered}</span>
			       		<span>${type}</span>

			       </div>
			   </li>`;

    ul.innerHTML = li;
  }

  input.value = '';
});

const getTvShows = async (e) => {
  const userSearch = form.elements.query.value.trim();
  console.log(userSearch);
  setTimeout(() => {
    searchFeedback.innerHTML = `You searched for "<span>${userSearch}</span>"`;
  }, 200);

  const res = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${userSearch}`
  );

  return res.data;
};
