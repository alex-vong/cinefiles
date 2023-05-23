const head = document.querySelectorAll('head');
const header = document.querySelectorAll('header');
const footer = document.querySelectorAll('footer');
const landingAbout = document.querySelectorAll('.landing-container');
const body = document.querySelectorAll('body');

head.forEach((head) => {
  head.innerHTML = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CineFiles</title>
    <meta name="og:description" content="Search For All Your Favorite TV Shows" />
    <meta property="og:title" content="Welcome - The TV DataBase" />
    <meta property="og:type" content="">
    <meta property="og:url" content="">
    <meta property="og:image" content="https://alexvong.dev/images/tvdb-meta.svg" />
    <meta property="og:image:type" content="https://alexvong.dev/images/tvdb-meta.svg" />
    <link rel="shortcut icon" type="image/jpg" href="images/favicon.svg" />
    <link rel='stylesheet' href='css/style.css'>
    <link rel='stylesheet' href='css/details.css'>
    <link rel='stylesheet' href='lib/swiper.css'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    
    `;
});

header.forEach((header) => {
  header.innerHTML = `
      <inner-column>
        <nav class="flex-col">
            <section class="masthead nav-bar flex-row">
                <div class="flex-row">
                    <a href="/modules/cinefiles/index.html">
                        <section class="about-logo flex-row">
                            <span class="fourth-level-heading main">C</span>
                            <span class="fourth-level-heading">I</span>
                            <span class="fourth-level-heading">N</span>
                            <span class="fourth-level-heading">E</span>
                            <span class="fourth-level-heading main">F</span>
                            <span class="fourth-level-heading">I</span>
                            <span class="fourth-level-heading">L</span>
                            <span class="fourth-level-heading">E</span>
                            <span class="fourth-level-heading">S</span>
                        </section>
                    </a>
                    <nav-links class="quiet-voice">
                        <a href="/modules/cinefiles/index.html" class="fw-500 home">Home</a>
                        <a href="" class="about-btn fw-500 about">About</a>
                        <a href="" class="fw-500 imdb">Top IMDB</a>
                    </nav-links>
                </div>

                <div class="icons flex-row body-copy">
                    <i class="fa-solid fa-magnifying-glass search-dd"></i>
                    <i class="fa-solid fa-bars burger-menu"></i>
                    <div class="login">
                        <i class="fa-regular fa-circle-user login"></i>
                    </div>
                </div>
            </section>

        <section class="drop-down nav-search flex-row">
            <nav-inputs class="flex-row">
                    <div class="container">
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
                            <i class="fa-regular fa-circle-xmark close-search"></i>
                            <i class="fa-regular fa-circle-user login"></i>
                          </div>
                      </form>
                    </div>
                  
            </nav-inputs>
        </section>
        </nav>

    </inner-column>
  
  `;
});

landingAbout.forEach((landingContainer) => {
  landingContainer.innerHTML = `
  
  <inner-column>
  <section class="about-landing-wrapper">
      <a href="/index.html">
          <section class="about-logo flex-row">
            <span class="third-level-heading main">C</span>
            <span class="third-level-heading main">F</span>
          </section>
        </a>
    <h2 class="fourth-level-heading">
      The Ultimate <span class="primary fw-600">Movie</span> and <span class="primary fw-600">TV</span> Database.
    </h2>

    <section class="about-landing-intro">
      <section class="landing-intro-welcome">
        <h4 class="fifth-level-heading">Welcome</h4>
        <div class="flex-col gap-10">
          <p class="quiet-voice">
            Welcome to <span>CineFiles</span>, your ultimate movie and TV
            database! Our platform is designed to provide you with a
            comprehensive and user-friendly experience, making it easy to
            find and explore your favorite movies and television series.
          </p>

          <p class="quiet-voice">
            With our extensive library of movies and TV shows, you can
            look up information about your favorite titles, including cast
            and crew details, ratings, and reviews. Our search and
            filtering options allow you to quickly and easily find what
            you're looking for, so you can spend more time watching and
            less time searching.
          </p>

          <p class="quiet-voice">
            Whether you're a casual viewer or a die-hard fan,
            <span>CineFiles</span> has something for everyone. From
            classic films to the latest releases, our database is
            constantly updated to ensure that you have access to the most
            accurate and up-to-date information.
          </p>
        </div>
      </section>
    </section>

    <section class="about-landing-about">
      <h4 class="fifth-level-heading">About <span>CineFiles</span></h4>
      <div class="flex-col gap-10">
        <p class="quiet-voice">
          <span>CineFiles</span> is a dynamic web application that offers users a comprehensive collection of movies and TV shows through an intuitive and user-friendly interface. Our platform harnesses the power of the <a href="https://www.themoviedb.org/"><span>Movie Database API</span></a>, enabling seamless access to an extensive database of diverse content. Users can easily search for specific titles or explore a wide range of genres, actors, directors, and more. With CineFiles, discovering and staying up-to-date with the latest and greatest movies and TV shows has never been easier.
        </p>

        <p class="quiet-voice">
          Our interface was designed using <span>Figma</span> and
          <span>Affinity Designer</span> to create an intuitive and
          easy-to-use experience for our users. The site was built using a
          variety of web development technologies, including
          <span>HTML</span>, <span>CSS</span>, <span>JavaScript</span>,
          and <span>PHP</span>, to ensure that the site runs smoothly and
          efficiently.
        </p>
      </div>
    </section>

    <section class="about-landing-tools">
      <h4 class="fifth-level-heading"> Tools</h4>
      <div class="tools-list flex-col gap-20">
          <div class="design-tools">
              <h2 class="body-copy primary">Design:</h2>
              <ul class="flex-col gap-8">
                <li>- Pen and Paper</li>
                <li>- Whimsical</li>
                <li>- Figma</li>
                <li>- Affinity Designer</li>
                <li>- Coolors.co</li>
              </ul>
          </div>
          <div class="development-tools">
              <h2 class="body-copy primary">Development:</h2>
              <ul class="flex-col gap-8">
                  <li>- HTML</li>
                  <li>- CSS</li>
                  <li>- JavaScript</li>
                  <li>- Postman</li>
                  <li>- The Movie Database API</li>
                  <li>- GitHub</li>
                  <li>- Tower</li>
                  <li>- Chrome Developer Tools</li>
              </ul>
          </div>
          <div class="deploy-tools">
              <h2 class="body-copy primary">Deployment:</h2>
              <ul class="flex-col gap-8">
                <li>- Amazon Web Servers</li>
              </ul>
          </div>
      </div>
    </section>

    <button class="about-close-btn btn"><i class="fa-solid fa-xmark body-copy"></i></button>

  </section>
</inner-column>
  
  
  
  
  `;
});

body.forEach((body) => {
  const button = document.createElement('button');
  button.classList.add('btn', 'scroll-to-top');

  button.innerHTML = `<i class="fa-solid fa-arrow-up body-copy"></i>`;

  body.appendChild(button);
});

footer.forEach((footer) => {
  footer.innerHTML = `
    <inner-column>
    <section class="footer-wrapper flex-col gap-20">
        <section class="logos flex-col gap-8">
            <a href="/modules/cinefiles/index.html">
              <section class="about-logo flex-row">
                <span class="fourth-level-heading main">C</span>
                <span class="fourth-level-heading main">F</span>
              </section>
            </a>
          <h4 class="body-copy">Follow Us</h4>
          <div class="social-media flex-col gap-8">
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-facebook-f"></i>
            <i class="fa-brands fa-twitter"></i>
          </div>
        </section>
        <section class="about flex-col gap-5">
          <h5 class="body-copy">About</h5>
          <div class="about-links flex-col gap-8">
              <a href="">About theTVdb</a>
              <a href="">Earn Points</a>
              <a href="">Subscribe</a>
              <a href="">support</a>
          </div>
        </section>
        <section class="discover flex-col gap-5">
          <h5 class="body-copy">Discover</h5>
          <div class="discover-links flex-col gap-8">
              <a href="">On Today</a>
              <a href="">Awards</a>
              <a href="">Companies</a>
              <a href="">People</a>
              <a href="">List</a>
              <a href="">Taxonomy</a>
          </div>
        </section>
        <section class="legal flex-col gap-5">
          <h5 class="body-copy">Legal</h5>
          <div class="legal-links flex-col gap-8">
              <a href="">Terms of Service</a>
              <a href="">Privacy Policy</a>
              <a href="">DMCA</a>
          </div>
        </section>
    </section>
    </inner-column>


    `;
});
