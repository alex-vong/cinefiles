const header = document.querySelectorAll('header');
const footer = document.querySelectorAll('footer');

header.forEach((header) => {
  header.innerHTML = `
      <inner-column>
      <masthead class="flex-col">
          <div class="nav-bar">
              <div>
                  <a href="/index.html">
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
                      <a href="/index.html" class="fw-500 home">Home</a>
                      <a href="" class="about-btn fw-500 about">About</a>
                      <a href="" class="fw-500 imdb">Top IMDB</a>
                  </nav-links>
              </div>
              <div class="icons">
                  <i class="fa-solid fa-magnifying-glass search-dd"></i>
                  <i class="fa-solid fa-bars burger-menu"></i>
                  <div class="login">
                      <a href="" class="body-copy login-icon"><i class="fa-regular fa-circle-user"></i></a>
                  </div>
              </div>
          </div>
          </div>
      </masthead>
      <nav-bar class="nav-search slide-out">
          <nav-inputs>
              <section class="search">
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
                </section>
          </nav-inputs>
      </nav-bar>
    </inner-column>
  
  `;
});

footer.forEach((footer) => {
  footer.innerHTML = `
    <inner-column>
    <section class="footer-wrapper flex-col gap-20">
        <section class="logos flex-col gap-8">
            <a href="/index.html">
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
