const movieArticle = document.querySelector("#movie");
const movieId = window.location.pathname.split("/").pop();
const similarMovies = document.querySelector(".movies");

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjExNjEwZmVjYzg0MGJjNzQwMjMzMDlmNWJmYTg0MCIsInN1YiI6IjY0NjIwMDhmZTNmYTJmMDE2NjIxOTc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oSuycSPIbZ9QaXCZESa2bFfwPPhrGispvuNLEiTCZ-Q",
  },
};

async function displayMovie() {
  const promise = await fetch(
    "https://api.themoviedb.org/3/movie/" +
      movieId +
      "?language=fr-FR&append_to_response=credits",
    options
  );
  const movie = await promise.json();

  const movieTitle = document.createElement("h2");
  movieTitle.textContent = movie.title;
  movieArticle.appendChild(movieTitle);

  const movieImage = document.createElement("img");
  if (movie.poster_path === null) {
    movieImage.src = "/cinetech/img/fake-img.jpg";
    movieImage.alt = movie.title;
  } else {
    movieImage.src = "https://image.tmdb.org/t/p/w400" + movie.poster_path;
    movieImage.alt = movie.title;
  }
  movieArticle.appendChild(movieImage);

  const movieDescription = document.createElement("p");
  if (movie.overview === "") {
    movieDescription.textContent = "Pas de description disponible";
  } else {
    movieDescription.textContent = movie.overview;
  }
  movieArticle.appendChild(movieDescription);

  const movieGenres = document.createElement("p");
  movieGenres.textContent = "Genres : ";
  for (let genre of movie.genres) {
    movieGenres.textContent += genre.name + ", ";
  }
  movieArticle.appendChild(movieGenres);

  const movieDate = document.createElement("p");
  // changer le format de la date avec le mois avec 2 chiffres
  let date = new Date(movie.release_date);
  date = date.toLocaleDateString("fr-FR");
  let day = date.split("/")[0];
  let month = date.split("/")[1];
  let year = date.split("/")[2];
  if (month.length === 1) {
    month = "0" + month;
  }
  movie.release_date = day + "/" + month + "/" + year;

  movieDate.textContent = "Sortie : " + movie.release_date;
  movieArticle.appendChild(movieDate);

  const movieDuration = document.createElement("p");
  movieDuration.textContent = "Durée : " + movie.runtime + " minutes";
  movieArticle.appendChild(movieDuration);

  const movieDirector = document.createElement("p");
  movieDirector.textContent = "Réalisateur : " + movie.credits.crew[0].name;
  movieArticle.appendChild(movieDirector);

  // pays de production
  const movieCountries = document.createElement("p");
  movieCountries.textContent = "Pays de production : ";
  for (let country of movie.production_countries) {
    movieCountries.textContent += country.name + ", ";
  }
  movieArticle.appendChild(movieCountries);

  const movieCast = document.createElement("p");
  movieCast.textContent = "Avec : ";
  for (let actor of movie.credits.cast) {
    movieCast.textContent += actor.name + ", ";
  }
  movieArticle.appendChild(movieCast);
}

async function displaySimilarMovies() {
  const promise = await fetch(
    "https://api.themoviedb.org/3/movie/" + movieId + "/similar?language=fr-FR",
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
      movieImage.alt = movie.title;
    } else {
      movieImage.src = "https://image.tmdb.org/t/p/w400" + movie.poster_path;
      movieImage.alt = movie.title;
    }
    movieLink.appendChild(movieImage);
    movieDiv.appendChild(movieLink);

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

    similarMovies.appendChild(movieDiv);
  }
}

displayMovie();
displaySimilarMovies();
