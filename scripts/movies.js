const weekMoviesArticle = document.querySelector("#movies_week");
const weekMovies = weekMoviesArticle.querySelector(".movies");
const allMoviesArticle = document.querySelector("#movies_by_genre");
const Movies = allMoviesArticle.querySelector(".moviesWrap");
const selectGenre = allMoviesArticle.querySelector("select");

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjExNjEwZmVjYzg0MGJjNzQwMjMzMDlmNWJmYTg0MCIsInN1YiI6IjY0NjIwMDhmZTNmYTJmMDE2NjIxOTc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oSuycSPIbZ9QaXCZESa2bFfwPPhrGispvuNLEiTCZ-Q",
  },
};

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
    const movieImage = document.createElement("img");
    if (movie.poster_path === null) {
      movieImage.src = "/cinetech/img/fake-img.jpg";
      movieImage.alt = movie.name;
    } else {
      movieImage.src = "https://image.tmdb.org/t/p/w400" + movie.poster_path;
      movieImage.alt = movie.title;
    }
    movieDiv.appendChild(movieImage);

    const movieTitle = document.createElement("h4");
    movieTitle.textContent = movie.title;
    movieDiv.appendChild(movieTitle);

    const movieDescription = document.createElement("p");
    if (movie.overview === "") {
      movieDescription.textContent = "Pas de description disponible";
    } else {
      movieDescription.textContent = movie.overview;
    }
    movieDiv.appendChild(movieDescription);

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

    const movieImage = document.createElement("img");
    if (movie.poster_path === null) {
      movieImage.src = "/cinetech/img/fake-img.jpg";
      movieImage.alt = movie.name;
    } else {
      movieImage.src = "https://image.tmdb.org/t/p/w400" + movie.poster_path;
      movieImage.alt = movie.title;
    }
    movieDiv.appendChild(movieImage);

    const movieTitle = document.createElement("h4");
    movieTitle.textContent = movie.title;

    const movieDescription = document.createElement("p");
    if (movie.overview === "") {
      movieDescription.textContent = "Pas de description disponible";
    } else {
      movieDescription.textContent = movie.overview;
    }

    // mise des éléments dans le DOM
    movieDiv.appendChild(movieTitle);
    movieDiv.appendChild(movieDescription);
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
  }
  pagination.appendChild(previous);

  const next = document.createElement("button");
  next.textContent = "Suivant";
  next.classList.add("next");
  next.dataset.page = movies.page;
  if (movies.page === movies.total_pages) {
    next.disabled = true;
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
  e.preventDefault();
  if (e.target.classList.contains("previous")) {
    const page = parseInt(e.target.dataset.page) - 1;
    displayMovies(selectGenre.value, page);
  } else if (e.target.classList.contains("next")) {
    const page = parseInt(e.target.dataset.page) + 1;
    displayMovies(selectGenre.value, page);
  }
});
