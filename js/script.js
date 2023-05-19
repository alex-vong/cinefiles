const form = document.getElementById('#search-form'),
  input = document.getElementById('#search-input'),
  ul = document.querySelector('.results-ul'),
  landing = document.querySelector('.landing'),
  searchFeedback = document.querySelector('#search-feedback'),
  landingContainer = document.querySelector('.landing-container'),
  dropDown = document.querySelector('.search-dd'),
  navSearch = document.querySelector('.nav-search'),
  closeSearch = document.querySelector('.fa-circle-xmark.close-search'),
  homeBtn = document.querySelector('a.home'),
  aboutBtn = document.querySelector('a.about-btn'),
  topIMDBBtn = document.querySelector('a.imdb'),
  hamBtn = document.querySelector('.burger-menu'),
  loginBtn = document.querySelector('.login-icon'),
  closeAbtBtn = document.querySelector('.about-close-btn'),
  scrollToTopBtn = document.querySelector('.scroll-to-top'),
  goBackBtn = document.querySelector('.goBack'),
  gridContainer = document.querySelector('.show-grid-container'),
  searchBarIcon = document.querySelector('.search-bar-icon'),
  nowPlaying = document.getElementById('now-playing'),
  trendingList = document.querySelector('.trending-ul'),
  popularList = document.querySelector('.popular-ul'),
  upcomingList = document.querySelector('.upcoming-ul'),
  tvBtn = document.getElementById('tv-homepage'),
  movieBtn = document.getElementById('movies-homepage'),
  searchResults = document.getElementById('search-results-wrapper'),
  globalState = window.location.pathname,
  searchPage = {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  };

const API_KEY = 'ea38f315243a154fd347ea9eeb849656';
const API_URL = 'https://api.themoviedb.org/3';

//opens dropdown search bar on mobile and tablet
function dropDownSearch() {
  if (navSearch.style.maxHeight) {
    navSearch.style.maxHeight = null;
    setTimeout(() => {
      navSearch.style.opacity = '0';
    }, 300);
  } else {
    navSearch.style.maxHeight = '100px';
    dropDown.classList.add('active');

    setTimeout(() => {
      navSearch.style.opacity = '1';
    }, 300);
  }
}

//closes dropdown
function closeDropDownSearch() {
  console.log('works');

  navSearch.style.maxHeight = null;
  dropDown.classList.remove('active');
  searchBarIcon.style.display = 'none';

  setTimeout(() => {
    searchBarIcon.style.display = 'none';
  }, 300);
}

function expandAboutSection(e) {
  e.preventDefault();
  landingContainer.style.maxHeight = landingContainer.style.maxHeight
    ? null
    : landingContainer.scrollHeight + 'px';
  updateNavActiveState();
}

function wordsToString(words) {
  return words.join(', ');
}

function generateGenre(genre) {
  var genreList = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ];

  var matchingObjects = genreList.filter(function (obj) {
    return genre.includes(obj.id);
  });

  // Extract the names from the matchingObjects array
  var matchingNames = matchingObjects.map(function (obj) {
    return obj.name;
  });

  // console.log(matchingNames);
  let string = wordsToString(matchingNames);

  // console.log(string);
  return string;
}

//swiper
async function displaySlider() {
  if (window.innerWidth < 768) {
    document.querySelector('.swiper-pagination').classList.add('hidden');
  } else {
    document.querySelector('.swiper-pagination').classList.remove('hidden');
  }

  const { results } = await fetchAPIData(`movie/now_playing`);

  document.querySelector('.swiper-wrapper').innerHTML = '';

  results.splice(-5);

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    let movieGenre = movie.genre_ids;
    const rating = calculateRating(movie.vote_average);

    let genreList = generateGenre(movieGenre);

    const releaseYear = movie.release_date.slice(0, 4);

    div.innerHTML = `
      <div class="overlay"></div>
      <picture>
      <img src="https://image.tmdb.org/t/p/original/${
        window.innerWidth >= 768 ? movie.backdrop_path : movie.poster_path
      }" alt="">
     
  </picture>
  
  <div class="swiper-details flex-col gap-10">
      <inner-column class="flex-col gap-10">
      <h3 class="third-level-heading">${movie.title}</h3>
      <div class="swiper-info info flex-row gap-15 flex-wrap">
      <p class="whisper"><span>Duration:</span>${releaseYear}</p>
      <p class="swiper-rating whisper"><span>IMDB:</span><i class="fas fa-star whisper"></i> ${rating}</p>
      <p class="whisper genre fw-600">
          <span class="genre">Genre:</span>
          ${genreList}
      </p>
      </div>
  
      <p class="quiet-voice over-view">
      ${movie.overview}
      </p>
  
      <button class="quiet-voice btn"> 
          <a href="/movie-details.html?id=${movie.id}"> View More Info
          </a>
      </button>
      </inner-column>
  
  </div>
      `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

async function displaySliderTV() {
  const { results } = await fetchAPIData('trending/tv/week');

  results.splice(-5);

  document.querySelector('.swiper-wrapper').innerHTML = '';

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    let firstAirDate = show.first_air_date;
    let year = firstAirDate.slice(0, 4);

    let showGenre = show.genre_ids;

    let genreList = generateGenre(showGenre);

    div.innerHTML = `
            <div class="overlay"></div>
            <picture>
            <img src="https://image.tmdb.org/t/p/original/${
              window.innerWidth >= 768 ? show.backdrop_path : show.poster_path
            }" alt="">
          
        </picture>

        <div class="swiper-details flex-col gap-10">
            <inner-column class="flex-col gap-10">
              <h3 class="third-level-heading">${show.name}</h3>

              <div class="swiper-info info flex-row gap-20">
                <p class="whisper">
                ${year}
                </p>

                <p class="swiper-rating whisper"><span>IMDB:</span> <i class="fas fa-star whisper"></i> ${show.vote_average.toFixed(
                  1
                )}</p>

                
                <p class="whisper genre fw-600">
                    <span class="genre">Genre:</span> ${genreList}
                </p>
              </div>

              <p class="quiet-voice over-view">
              ${show.overview}
              </p>

              <button class="quiet-voice btn"> 
                  <a href="/tv-details.html?id=${show.id}"> View More Info
                  </a>
              </button>
            </inner-column>

        </div>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });

  displayTrendingTV();
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    freeMode: true,
    // momentum: false,
    loop: true,
    speed: 1400,
    easing: 'ease-out',
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });
}

function setBackground() {
  var viewportWidth = window.innerWidth;

  if (viewportWidth === 768) {
    displaySlider();
    console.log('at 768');
  }

  if (viewportWidth === 400) {
    console.log('at 400');
    displaySlider();
  }
}

setBackground(); // Call on page load

window.addEventListener('resize', setBackground);

//displays trending movies and tv shows
async function displayTrending(type) {
  let { results } = await fetchAPIData(`/trending/${type}/week`);

  trendingList.innerHTML = '';

  results.splice(-8);
  results.forEach((movie) => {
    const individualMovieCard = generateCard(movie);
    trendingList.appendChild(individualMovieCard);
  });

  if (type === 'movie') {
    displayPopular(type);
  }
  if (type === 'tv') {
    displayLatestReleases(type);
  }
}

//displays popular movies
async function displayPopular(type) {
  const { results } = await fetchAPIData(`${type}/popular`);
  results.splice(-8);

  popularList.innerHTML = '';

  document.querySelector('#popular-movies h2').textContent = 'Popular';

  results.forEach((movie) => {
    const individualMovieCard = generateCard(movie);

    popularList.appendChild(individualMovieCard);
  });

  displayUpcoming(type);
}

//displays upcoming movies
async function displayUpcoming(type) {
  let { results } = await fetchAPIData(`${type}/upcoming`);
  // const shuffle = shuffleArray(results);

  results.splice(-8);
  upcomingList.innerHTML = '';
  document.querySelector('#upcoming-movies h2').textContent = 'Coming Soon';

  results.forEach((movie) => {
    const individualMovieCard = generateCard(movie);

    upcomingList.appendChild(individualMovieCard);
  });
}

//displays latest releases for tv shows
async function displayLatestReleases(type) {
  const { results } = await fetchPopData(`discover/${type}`);

  results.splice(-8);
  popularList.innerHTML = '';
  document.querySelector('#popular-movies h2').textContent = 'Latest Releases';

  results.forEach((movie) => {
    const individualMovieCard = generateCard(movie);

    popularList.appendChild(individualMovieCard);
  });

  displayTopRated(type);
}

//display top rated tvs eries
async function displayTopRated(type) {
  let { results } = await fetchAPIData(`${type}/top_rated`);
  // const shuffle = shuffleArray(results);

  results.splice(-8);
  upcomingList.innerHTML = '';

  document.querySelector('#upcoming-movies h2').textContent = 'Top Rated';

  results.forEach((movie) => {
    const individualMovieCard = generateCard(movie);

    upcomingList.appendChild(individualMovieCard);
  });
}

//displays trending tv series
async function displayTrendingTV() {
  movieBtn.classList.remove('active');
  tvBtn.classList.add('active');

  displayTrending('tv');
}

//DETAILS PAGE
//displays movie or tv shows details on details.html

async function displayContentDetails(type) {
  const contentID = window.location.search.split('=')[1];
  let content;
  let trailer;

  const previousPageURL = document.referrer;
  const url = new URL(previousPageURL);

  console.log(url.pathname);

  if (url.pathname === '/search.html') {
    const goBackBtn = document.createElement('button');
    goBackBtn.classList.add('btn', 'goBack');
    goBackBtn.innerHTML = `<i class="fa-solid fa-arrow-left whisper"></i>`;

    const button = document.querySelector('.return-links');
    button.prepend(goBackBtn);
  }

  if (type === 'movie') {
    content = await fetchAPIData(`movie/${contentID}`);
    const { results } = await fetchAPIData(`movie/${contentID}/videos`);

    results.forEach((movie) =>
      movie.type === 'Trailer' ? (trailer = movie.key) : 'no trailer'
    );
  }
  if (type === 'tv') {
    content = await fetchAPIData(`tv/${contentID}`);
    const { results } = await fetchAPIData(`tv/${contentID}/videos`);

    results.forEach((tv) =>
      tv.type === 'Trailer' ? (trailer = tv.key) : 'no trailer'
    );
  }
  generateContentLanding(type, content, trailer);
}

function generateContentLanding(type, content, trailerKey) {
  const genres = content.genres;
  const genreNames = arrayToString(genres);

  const rating = calculateRating(content.vote_average);

  let backSplash;

  type === 'movie'
    ? (backSplash = document.querySelector('.movies-details-page .main-bg'))
    : (backSplash = document.querySelector('.tv-details-page .main-bg'));

  backSplash.style.background = `url('https://image.tmdb.org/t/p/original/${content.backdrop_path}') center center/cover fixed`;

  document.querySelector('.main-card').innerHTML = `
        <picture class="flex-1">
            ${
              content.poster_path
                ? `<img
            src="https://image.tmdb.org/t/p/w500${content.poster_path}"
            class="card-img-top"
            alt="Production poster for ${
              content.title ? content.title : content.name
            }"
          />`
                : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="Stock CineFile Production Image for ${
            content.title ? content.title : content.name
          }"
          />`
            }
        </picture>
        
        <div class="content-details flex-col gap-10 flex-1">
            <h2 class="second-level-heading">${
              content.title ? content.title : content.name
            }</h2>
            <div class="info flex-col gap-10">
              <p class="rating quiet-voice"> 
                <span>IMDB Rating</span> - ${calculateRating(
                  content.vote_average
                )}
                    <i class="fas fa-star quiet-voice"></i>
              </p>
              
              <p class="quiet-voice">
                <span>Release Date</span> 
                - ${
                  content.release_date
                    ? content.release_date.slice(0, 4)
                    : content.first_air_date.slice(0, 4)
                }
              </p>
              
              <p class="quiet-voice fw-700">
                  ${content.overview}
              </p>
  
              <p class="quiet-voice">
                <span>Genre</span> 
                - ${genreNames}
              </p>
            </div>
            
            <div class="content-links flex-row gap-20">

            ${
              content.homepage !== ''
                ? `<a href="${content.homepage}" target="_blank">
                  <button class="quiet-voice btn fw-600">Official Site</button>
                </a>`
                : `<a href="https://www.imdb.com/title/${content.imdb_id}">
                <button class="quiet-voice btn fw-600">IMDB</button>
              </a>`
            }
              <a href="https://www.youtube.com/watch?v=${trailerKey}" target="_blank">
                <p class="quiet-voice btn btn2 fw-600"><i class="fa-solid fa-video primary"></i> Trailer</p>
              </a>
            </div>
            <div class="credits flex-col gap-5">
              <h4 class="body-copy fw-500"><span>Credits</span></h4>
              <ul class="credits-grid flex-row gap-10 sb">
              
              </ul>
            </div>
        </div>
      </div>
    `;

  getCredits(type, content);
  generateDetailsInfo(type, content);
}

async function getCredits(type, content) {
  const credit = document.querySelector('.credits-grid');

  let creditList;

  type === 'movie'
    ? (creditList = await fetchAPIData(`movie/${content.id}/credits`))
    : (creditList = await fetchAPIData(`tv/${content.id}/credits`));

  let { cast } = creditList;

  cast.splice(5);

  cast.forEach((actor) => {
    const li = document.createElement('li');
    li.innerHTML = `
          <picture>
              ${
                actor.profile_path
                  ? `<img
              src="https://image.tmdb.org/t/p/w500${actor.profile_path}"
              class="card-img-top"
              alt="${content.name}"
            />`
                  : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${content.name}"
            />`
              }
        </picture>
        <div class="credit-info">
            <p class="body-copy fw-500 primary">${actor.name}</p>
            <p class="quiet-voice">${actor.character}</p>
        </div>
    `;

    if (cast.length < 5) {
      li.classList.add('grid-bumper');

      document.querySelector('ul.credits-grid').classList.remove('sb');
    }

    credit.appendChild(li);
  });
}

function generateDetailsInfo(type, content) {
  if (type === 'movie') {
    const boxOffice = convertBoxOffice(content.revenue);
    console.log(boxOffice);
    const productionCost = convertBoxOffice(content.budget);

    const studios = arrayToString(content.production_companies);

    document.querySelector('.movie-details-info-wrapper').innerHTML = `
    
        <h3 class="fourth-level-heading">Movie Info</h3>

      
        <div class="body-copy"><span>World Wide Box Office</span> - ${boxOffice}</div>
        
        <div class="body-copy"><span>Production Cost</span> - ${productionCost}</div>
        <div class="body-copy"><span>Run Time</span> - ${content.runtime} min</div>
        <div class="body-copy"><span>Status</span> - ${content.status}</div>
        <div class="body-copy"><span>Studios</span> - ${studios}</div>
    
    `;
  }

  if (type === 'tv') {
    const studios = arrayToString(content.networks);

    document.querySelector('.tv-details-info-wrapper').innerHTML = `
    
        <h3 class="fourth-level-heading">Series Info</h3>
        <div class="body-copy"><span>First Air Date</span> - ${content.first_air_date}</div>
        <div class="body-copy"><span>Seasons</span> - ${content.number_of_seasons}</div>
        <div class="body-copy"><span>Episodes</span> - ${content.number_of_episodes}</div>
        <div class="body-copy"><span>Status</span> - ${content.status}</div>
        <div class="body-copy"><span>Studios</span> - ${studios}</div>
    
    `;
  }
}

function convertBoxOffice(amount) {
  const abbreviations = {
    K: 1000,
    M: 1000000,
    B: 1000000000,
  };

  for (const key in abbreviations) {
    if (amount >= abbreviations[key] && amount < abbreviations[key] * 1000) {
      const shortened = (amount / abbreviations[key]).toFixed(1);
      return shortened.replace(/\.0$/, '') + key;
    }
  }

  return amount.toString();
}

function arrayToString(array) {
  const arrayList = array.map((genre) => genre.name);
  return arrayList.join(', ');
}

function generateCard(content) {
  const li = document.createElement('li');
  li.classList.add('card');

  li.innerHTML = `
            <a href="/${
              content.media_type === 'movie' || content.original_title
                ? 'movie-details.html'
                : 'tv-details.html'
            }?id=${content.id}">
               <picture>
               ${
                 content.poster_path
                   ? `<img
                src="https://image.tmdb.org/t/p/w500${content.poster_path}"
                class="card-img-top"
                alt="${content === 'movie' ? content.title : content.name}"
              />`
                   : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${content === 'movie' ? content.title : content.name}"
            />`
               }
               </picture>
           </a>
          <div class="card-info flex-col gap-5">
            <h4 class="page-title body-copy fw-500">${
              content.title ? content.title : content.name
            }</h4>
            <div class="content-details flex-row gap-10 sb">
              <div class="flex-row gap-10">
                <p class="whisper">${
                  content.release_date === ''
                    ? 'Coming Soon'
                    : content.release_date
                    ? content.release_date.slice(0, 4)
                    : content.first_air_date.slice(0, 4)
                }</p>
                <p class="whisper"><i class="fas fa-star text-primary"></i> ${calculateRating(
                  content.vote_average
                )}</p>
              </div>
              <div>
                <p class="whisper content"> ${
                  content.media_type === 'movie' || content.release_date
                    ? 'Movie'
                    : 'TV'
                }</p>
              </div>


            </div>
          </div>
    `;

  return li;
}

function calculateRating(rating) {
  let roundedUpRating = Math.ceil(rating * 10) / 10;
  return roundedUpRating.toFixed(1);
}

// search movies/shows

async function searchForContent() {
  const queryString = window.location.search;

  if (queryString === '') {
    document.querySelector('.search-heading').innerHTML = `
    This is the <span class="primary">Search Page</span>. You can search movie or television programs here. `;
  } else {
    const urlParams = new URLSearchParams(queryString);

    searchPage.term = urlParams.get('search-term');

    const query = searchPage.term;
    console.log(query);

    let { results, total_pages, page, total_results } =
      await fetchSearchContent('search/multi', query);

    searchPage.page = page;
    searchPage.totalPages = total_pages;
    searchPage.totalResults = total_results;

    generateSearchResultsGrid(results, total_results);
  }

  displaySearchPagination('search/multi');
}

function displaySearchPagination(endpoint) {
  console.log(endpoint);
  console.log(searchPage.term);
  document.getElementById('search-pagination').innerHTML = `
        <div class="buttons flex-row gap-8">
        <button id="prev-btn" class="btn prev-btn whisper fw-600"><i class="fa-solid fa-arrow-left"></i></button>
        <button id="next-btn" class="btn next-btn whisper fw-600"><i class="fa-solid fa-arrow-right"></i></button>
      </div>
      <div class="page-index">
        <p class="quiet-voice">Page ${searchPage.page} of ${searchPage.totalPages}</p>
      </div>
  `;

  // Disable prev button if on first page
  if (searchPage.page === 1) {
    document.getElementById('prev-btn').disabled = true;
  }

  // Disable next button if on last page
  if (searchPage.page === searchPage.totalPages) {
    document.getElementById('next-btn').disabled = true;
  }

  // Next page
  document.getElementById('next-btn').addEventListener('click', async () => {
    searchPage.page++;
    const { results, total_pages } = await fetchSearchContent(
      endpoint,
      searchPage.term
    );
    console.log(results);
    displaySearchPagination('search/multi');

    generateSearchResultsGrid(results);
  });

  // Prev page
  document.getElementById('prev-btn').addEventListener('click', async () => {
    searchPage.page--;

    const { results, total_pages } = await fetchSearchContent(
      endpoint,
      searchPage.term
    );
    console.log(results);
    displaySearchPagination('search/multi');

    generateSearchResultsGrid(results);
  });
}

function generateSearchResultsGrid(results, total_results) {
  const justFilmAndTV = results.filter(
    (result) => result.media_type !== 'person'
  );

  if (results.length === 0) {
    document.querySelector('.search-heading').innerHTML = `
    <span class="primary">0</span> results for "<span class="primary">${query}</span>". 
  `;
  }

  const searchUl = document.querySelector('.search-results-grid');

  searchUl.innerHTML = '';

  document.querySelector('.search-heading').innerHTML = `
        <span class="primary">${searchPage.totalResults}</span> 
          results for 
        "<span class="primary">${searchPage.term}</span>" 
    `;

  justFilmAndTV.forEach((content) => {
    const individualCard = generateCard(content);
    searchUl.appendChild(individualCard);
  });
}

function updateUI() {
  movieBtn.classList.add('active');
  tvBtn.classList.remove('active');
  displaySlider('movie');
  displayTrending('movie');
}

//fetch data from tvdb api

async function fetchAPIData(endpoint) {
  const res = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US&region=US`
  );

  const data = await res.json();
  // console.log(data);
  return data;
}

async function fetchPopData(endpoint) {
  const res = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&sort_by=latest_release.desc&first_air_date.gte=2023-01-01&with_watch_providers=8&watch_region=US`
  );

  const data = await res.json();
  // console.log(data);

  return data;
}
async function fetchSearchContent(endpoint, query) {
  const res = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&query=${query}&page=${searchPage.page}&region=US&include_adult=false`
  );

  const data = await res.json();
  // console.log(data);

  return data;
}

function updateNavActiveState() {
  if (homeBtn.classList.contains('active')) {
    homeBtn.classList.remove('active');
  }
  if (topIMDBBtn.classList.contains('active')) {
    topIMDBBtn.classList.remove('active');
  }

  aboutBtn.classList.add('active');
}

function init() {
  //   Event Listeners

  if (globalState === '/index.html' || globalState === '/') {
    displaySlider();
    updateUI();

    homeBtn.classList.add('active');

    tvBtn.addEventListener('click', displaySliderTV);
    movieBtn.addEventListener('click', updateUI);
  }

  if (globalState === '/movie-details.html') {
    displayContentDetails('movie');
  }
  if (globalState === '/tv-details.html') {
    displayContentDetails('tv');
  }
  if (globalState === '/search.html') {
    searchForContent();
  }

  searchBarIcon.style.display = 'none';

  dropDown.addEventListener('click', () => {
    dropDownSearch();

    const navInput = document.querySelector('nav-inputs');
    navInput.innerHTML = '';
    navInput.innerHTML = `
        <div class="container gap-20">
            <form id="search-form" action="/search.html" class="search-form flex-col gap-10">
              <div class="search-flex flex-row gap-10">
                  <input
                    type="text"
                    name="search-term"
                    id="search-input"
                    placeholder="Search database"
                    class="fw-500"
                  />
                  <i class="fa-solid fa-magnifying-glass search-bar-icon"></i>
                  <i class="fa-regular fa-circle-user login"></i>
                  <i class="fa-regular fa-circle-xmark close-search"></i>
                  </div>
        </div>
    `;
  });

  const navInput = document.querySelector('nav-inputs');
  navInput.addEventListener('click', (e) => {
    if (e.target.nodeName === 'I') {
      closeDropDownSearch();
    }
  });

  closeSearch.addEventListener('click', closeDropDownSearch);

  aboutBtn.addEventListener('click', expandAboutSection);

  if (closeAbtBtn) {
    closeAbtBtn.addEventListener('click', () => {
      landingContainer.style.maxHeight = null;
    });
  }

  hamBtn.addEventListener('click', () => {
    dropDownSearch();
    const navInput = document.querySelector('nav-inputs');
    navInput.innerHTML = '';
    navInput.innerHTML = `
      <section class="nav-drop-down container quiet-voice flex-row gap-40">
        <a href="/index.html" class="fw-500 home">Home</a>
        <a href="" class="about-btn fw-500 about">About</a>
        <a href="" class="fw-500 imdb">Top IMDB</a>
      </section>
    `;
  });

  if (goBackBtn) {
    goBackBtn.addEventListener('click', () => {
      window.history.back();
    });
  }

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
