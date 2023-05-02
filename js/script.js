const form = document.querySelector('#search-form'),
  input = document.querySelector('#search-input'),
  ul = document.querySelector('.results-ul'),
  landing = document.querySelector('.landing'),
  searchFeedback = document.querySelector('#search-feedback'),
  dropDown = document.querySelector('.search-dd'),
  navSearch = document.querySelector('.nav-search'),
  closeSearch = document.querySelector('i.close-search'),
  gridContainer = document.querySelector('.show-grid-container'),
  nowPlaying = document.getElementById('now-playing'),
  trendingList = document.querySelector('.trending-ul'),
  popularList = document.querySelector('.popular-ul'),
  upcomingList = document.querySelector('.upcoming-ul'),
  tvBtn = document.getElementById('tv-homepage'),
  movieBtn = document.getElementById('movies-homepage'),
  globalState = window.location.pathname;

console.log(tvBtn);
function dropDownSearch() {
  console.log(navSearch.classList);
  navSearch.classList.remove('slide-out');
  navSearch.classList.add('slide-in');
  navSearch.style.zIndex = '-1000';

  setTimeout(() => {
    navSearch.style.zIndex = '0';
  }, 1000);

  nowPlaying.style.marginTop = '80px';
}

function closeDropDownSearch() {
  if (window.innerWidth < 1000) {
    navSearch.style.zIndex = '-1000';
  }

  nowPlaying.style.marginTop = '0';

  navSearch.classList.remove('slide-in');
  navSearch.classList.add('slide-out');
  // navSearch.style.animationDuration = '0.3s';
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function displayTrending(type) {
  let { results } = await fetchAPIData(`/trending/${type}/week`);

  // const shuffle = shuffleArray(results);

  trendingList.innerHTML = '';

  results.splice(-2);
  results.forEach((movie) => {
    const individualMovieCard = generateList(movie);

    trendingList.appendChild(individualMovieCard);
  });

  if (type === 'movie') {
    displayPopular(type);
  }
  if (type === 'tv') {
    displayLatestReleases(type);
  }
}

async function displayPopular(type) {
  const { results } = await fetchAPIData(`${type}/popular`);
  // const shuffle = shuffleArray(results);

  results.splice(-2);

  popularList.innerHTML = '';

  document.querySelector('#popular-movies h2').textContent = 'Popular';

  results.forEach((movie) => {
    const individualMovieCard = generateList(movie);

    popularList.appendChild(individualMovieCard);
  });

  displayUpcoming(type);
}

async function displayUpcoming(type) {
  let { results } = await fetchAPIData(`${type}/upcoming`);
  // const shuffle = shuffleArray(results);

  results.splice(-2);
  upcomingList.innerHTML = '';
  document.querySelector('#upcoming-movies h2').textContent = 'Coming Soon';

  results.forEach((movie) => {
    const individualMovieCard = generateList(movie);

    upcomingList.appendChild(individualMovieCard);
  });
}

async function displayLatestReleases(type) {
  const { results } = await fetchPopData(`discover/${type}`);

  // const shuffle = shuffleArray(results);

  results.splice(-2);
  popularList.innerHTML = '';
  document.querySelector('#popular-movies h2').textContent = 'Latest Releases';

  results.forEach((movie) => {
    const individualMovieCard = generateList(movie);

    popularList.appendChild(individualMovieCard);
  });

  displayTopRated(type);
}

async function displayTopRated(type) {
  let { results } = await fetchAPIData(`${type}/top_rated`);
  // const shuffle = shuffleArray(results);

  results.splice(-2);
  upcomingList.innerHTML = '';

  document.querySelector('#upcoming-movies h2').textContent = 'Top Rated';

  results.forEach((movie) => {
    const individualMovieCard = generateList(movie);

    upcomingList.appendChild(individualMovieCard);
  });
}

async function displayTrendingTV() {
  displayTrending('tv');
}

function generateList(movie) {
  const li = document.createElement('li');
  li.classList.add('card');
  let dateString;
  let year;
  let name;

  if (movie.media_type === 'movie' || movie.title) {
    name = movie.title;
    dateString = movie.release_date;
    year = dateString.slice(0, 4);
  }

  if (movie.media_type === 'tv' || movie.name) {
    name = movie.name;
    dateString = movie.first_air_date;
    year = dateString.slice(0, 4);
  }

  li.innerHTML = `
            <a href="/details.html?id=${movie.id}">
               <picture>
               ${
                 movie.poster_path
                   ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              />`
                   : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
               }
               </picture>
           </a>
          <div class="card-info flex-col gap-5">
            <h4 class="page-title body-copy fw-500">${name}</h4>
            <div class="content-details flex-row gap-10">
                <p class="quiet-voice">${year}</p>
                <p class="quiet-voice"><i class="fas fa-star text-primary"></i> ${movie.vote_average.toFixed(
                  1
                )}</p>

            </div>
          </div>
    `;

  return li;
}

//fetch data from tvdb api

async function fetchAPIData(endpoint) {
  const API_KEY = 'ea38f315243a154fd347ea9eeb849656';
  const API_URL = 'https://api.themoviedb.org/3';

  const res = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US&page=1&region=US`
  );

  const data = await res.json();

  return data;
}
async function fetchPopData(endpoint) {
  const API_KEY = 'ea38f315243a154fd347ea9eeb849656';
  const API_URL = 'https://api.themoviedb.org/3';

  const res = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&sort_by=latest_release.desc&first_air_date.gte=2023-01-01&with_watch_providers=8&watch_region=US`
  );

  const data = await res.json();

  return data;
}

function updateUI() {
  displayTrending('movie');
  // displayPopularMovies();
  // displayUpcomingMovies();
  console.log('clicked');
}
//
function init() {
  //   Event Listeners
  if (globalState === '/index.html' || globalState === '/') {
    dropDown.addEventListener('click', dropDownSearch);
    closeSearch.addEventListener('click', closeDropDownSearch);
    updateUI();
  }

  tvBtn.addEventListener('click', displayTrendingTV);
  movieBtn.addEventListener('click', updateUI);
}

console.log(globalState);

document.addEventListener('DOMContentLoaded', init);
