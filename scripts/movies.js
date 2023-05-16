const weekMoviesArticle = document.querySelector("#movies_week");
const weekMovies = weekMoviesArticle.querySelector(".movies");
const allMoviesArticle = document.querySelector("#movies_by_genre");
const Movies = allMoviesArticle.querySelector(".movies");
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

    if (movie.poster_path === null) {
      const moviewarning = document.createElement("p");
      moviewarning.textContent = "Pas d'image disponible";
      movieDiv.appendChild(moviewarning);
    } else {
      const movieImage = document.createElement("img");
      movieImage.src = "https://image.tmdb.org/t/p/w400" + movie.poster_path;
      movieImage.alt = movie.title;
      movieDiv.appendChild(movieImage);
    }

    const movieTitle = document.createElement("h4");
    movieTitle.textContent = movie.title;

    const movieDescription = document.createElement("p");
    movieDescription.textContent = movie.overview;

    // mise des éléments dans le DOM
    movieDiv.appendChild(movieTitle);
    movieDiv.appendChild(movieDescription);
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

// appel des fonctions
displayWeekMovies();
getGenres().then((genres) => makeOption(genres));
