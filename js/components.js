const allHeads = document.querySelectorAll('head');
const allHeaders = document.querySelectorAll('header');

allHeads.forEach((head) => {
  console.log(head);
  head.innerHTML = `

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CineFiles - Home</title>
  <meta name="og:description" content="Search For All Your Favorite TV Shows" />
  <meta property="og:title" content="Welcome - The TV DataBase" />
  <meta property="og:type" content="">
  <meta property="og:url" content="">
  <meta property="og:image" content="https://alexvong.dev/images/tvdb-meta.svg" />
  <meta property="og:image:type" content="https://alexvong.dev/images/tvdb-meta.svg" />
  <link rel="shortcut icon" type="image/jpg" href="images/favicon.svg" />
  <link rel='stylesheet' href='css/style.css'>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  `;
});

allHeaders.forEach((header) => {
  header.innerHTML = `
    <inner-column>
            <masthead>
                <div class="mobile">
                    <div>
                        <a href="javascript:location.reload();">
                            <picture class='logo'>
                                <img src="images/tv-db-seeklogo.com.svg" alt="">
                            </picture>
                        </a>
                        <nav-links class="body-copy">
                            <a href="">Home</a>
                            <a href="">About</a>
                            <a href="">Top IMDB</a>
                        </nav-links>
                    </div>
                    <div class="icons">
                        <i class="fa-solid fa-magnifying-glass search-dd"></i>
                        <i class="fa-solid fa-bars"></i>
                        <div class="login">
                            <a href="" class="body-copy"><i class="fa-regular fa-circle-user"></i></a>
                        </div>
                    </div>
                </div>
                </div>
            </masthead>
            <nav-bar class="nav-search slide-out">
                <nav-inputs>
                    <!-- <form id="search-form" action="">
                        <input id="search-input" type="text" placeholder="Search TVdb" name="query" class="body-copy">
                    </form>
                    <i class="fa-regular fa-circle-xmark close-search"></i>
                    <div class="login">
                        <i class="fa-regular fa-circle-user"></i>
                        <a href="" class="body-copy">Login</a>
                    </div> -->

                    <section class="search">
                        <div class="container">
                          <div id="alert"></div>
                          <form id="search-form" action="" class="search-form">
                            <!-- movies and shows radio box -->
                            <div class="search-radio">
                              <input type="radio" id="movie" name="type" value="movie" checked />
                              <label for="movies">Movies</label>
                              <input type="radio" id="tv" name="type" value="tv" />
                              <label for="shows">TV Shows</label>
                            </div>
                            <div class="search-flex">
                              <input
                                type="text"
                                name="search-term"
                                id="search-term"
                                placeholder="Search database"
                              />
                              <!-- <button class="btn" type="submit">
                                <i class="fas fa-search"></i>
                              </button> -->
                            </div>
                          </form>
                          <i class="fa-regular fa-circle-xmark close-search"></i>

                          <div class="login">
                            <i class="fa-regular fa-circle-user"></i>
                            <a href="" class="body-copy">Login</a>
                        </div>
                          
                        </div>
                      </section>
                </nav-inputs>
            </nav-bar>
        </inner-column>
    `;
});
