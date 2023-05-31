const weekMoviesArticle = document.querySelector("#movies_week");
const weekMovies = weekMoviesArticle.querySelector(".movies");
const allMoviesArticle = document.querySelector("#movies_by_genre");
const Movies = allMoviesArticle.querySelector(".moviesWrap");
const selectGenre = allMoviesArticle.querySelector("select");

async function displayWeekMovies() {
  weekMovies.innerHTML = "";

  const promise = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=fr&region=FR",
    options
  );
  const movies = await promise.json();

  for (let movie of movies.results) {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    const movieLink = document.createElement("a");
    movieLink.href = "/cinetech/movie/" + movie.id;
    const movieImage = document.createElement("img");
    if (movie.poster_path === null) {
      movieImage.src = "/cinetech/img/fake-img.jpg";
      movieImage.alt = movie.name;
    } else {
      movieImage.src = "https://image.tmdb.org/t/p/w400" + movie.poster_path;
      movieImage.alt = movie.title;
    }
    movieLink.appendChild(movieImage);
    movieDiv.appendChild(movieLink);

    const movieTitle = document.createElement("h4");
    movieTitle.textContent = movie.title;
    movieDiv.appendChild(movieTitle);

    // mise des éléments dans le DOM

    weekMovies.appendChild(movieDiv);
  }
}

async function getGenres() {
  const promise = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=fr-FR",
    options
  );
  const genres = await promise.json();

  return genres.genres;
}

function makeOption(genres) {
  const optionAll = document.createElement("option");
  optionAll.value = "all";
  optionAll.textContent = "Tous les genres";
  selectGenre.appendChild(optionAll);

  for (let genre of genres) {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    selectGenre.appendChild(option);
  }
}

// fonction avec un paramètre optionnel
async function displayMovies(genreId = null, page = 1) {
  Movies.innerHTML = "";

  let url = "https://api.themoviedb.org/3/discover/movie?language=fr-FR";

  if (genreId !== null && genreId !== "all") {
    url += "&with_genres=" + genreId;
  }

  url += "&page=" + page;

  const promise = await fetch(url, options);
  const movies = await promise.json();

  for (let movie of movies.results) {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    const movieLink = document.createElement("a");
    movieLink.href = "/cinetech/movie/" + movie.id;
    const movieImage = document.createElement("img");
    if (movie.poster_path === null) {
      movieImage.src = "/cinetech/img/fake-img.jpg";
      movieImage.alt = movie.name;
    } else {
      movieImage.src = "https://image.tmdb.org/t/p/w400" + movie.poster_path;
      movieImage.alt = movie.title;
    }
    movieLink.appendChild(movieImage);
    movieDiv.appendChild(movieLink);

    const movieTitle = document.createElement("h4");
    movieTitle.textContent = movie.title;

    // mise des éléments dans le DOM
    movieDiv.appendChild(movieTitle);
    Movies.appendChild(movieDiv);
  }
  // création des bontons de pagination
  const pagination = document.createElement("div");
  pagination.classList.add("pagination");

  const previous = document.createElement("button");
  previous.textContent = "Précédent";
  previous.classList.add("previous");
  previous.dataset.page = movies.page;
  if (movies.page === 1) {
    previous.disabled = true;
    previous.classList.add("disabled");
  }
  pagination.appendChild(previous);

  /* numéro de la page en cours */
  const currentPage = document.createElement("span");
  currentPage.textContent = movies.page;
  pagination.appendChild(currentPage);

  const next = document.createElement("button");
  next.textContent = "Suivant";
  next.classList.add("next");
  next.dataset.page = movies.page;
  if (movies.page === movies.total_pages) {
    next.disabled = true;
    next.classList.add("disabled");
  }
  pagination.appendChild(next);

  Movies.appendChild(pagination);
}

// appel des fonctions
displayWeekMovies();
getGenres().then((genres) => makeOption(genres));
displayMovies();

selectGenre.addEventListener("change", (e) => {
  displayMovies(e.target.value);
});

allMoviesArticle.addEventListener("click", (e) => {
  if (e.target.classList.contains("previous")) {
    e.preventDefault();
    const page = parseInt(e.target.dataset.page) - 1;
    displayMovies(selectGenre.value, page).then(() => {
      // revenir en haut de la div qui porte l'id movies_by_genre
      allMoviesArticle.scrollIntoView();
    });
  } else if (e.target.classList.contains("next")) {
    e.preventDefault();
    const page = parseInt(e.target.dataset.page) + 1;
    displayMovies(selectGenre.value, page).then(() => {
      // revenir en haut de la div qui porte l'id movies_by_genre
      allMoviesArticle.scrollIntoView();
    });
  }
});
