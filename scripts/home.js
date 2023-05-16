const moviesSection = document.querySelector(".movies");
const seriesSection = document.querySelector(".series");

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjExNjEwZmVjYzg0MGJjNzQwMjMzMDlmNWJmYTg0MCIsInN1YiI6IjY0NjIwMDhmZTNmYTJmMDE2NjIxOTc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oSuycSPIbZ9QaXCZESa2bFfwPPhrGispvuNLEiTCZ-Q",
  },
};

async function displayMovies() {
  moviesSection.innerHTML = "";
  const randomPage = Math.floor(Math.random() * 500) + 1;

  const promise = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=fr&page=" +
      randomPage,
    options
  );
  const movies = await promise.json();
  //   console.log(movies);

  let randomList = [];
  // création des index aléatoires (il ne faut pas 2 fois le même index)
  for (let i = 0; i < 8; i++) {
    let randomIndex = Math.floor(Math.random() * 20);
    if (randomList.includes(randomIndex)) {
      i--;
    } else {
      randomList.push(randomIndex);
    }
  }
  //   console.log(randomList);

  // boucle pour afficher les films
  for (let i = 0; i < randomList.length; i++) {
    const movie = movies.results[randomList[i]];
    // console.log(movie);
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    const movieImage = document.createElement("img");
    movieImage.src = "https://image.tmdb.org/t/p/w400" + movie.poster_path;
    movieImage.alt = movie.title;

    const movieTitle = document.createElement("h4");
    movieTitle.textContent = movie.title;

    const movieDescription = document.createElement("p");
    movieDescription.textContent = movie.overview;

    // mise des éléments dans le DOM
    movieDiv.appendChild(movieImage);
    movieDiv.appendChild(movieTitle);
    movieDiv.appendChild(movieDescription);
    moviesSection.appendChild(movieDiv);
  }
}

async function displaySeries() {
  seriesSection.innerHTML = "";
  const randomPage = Math.floor(Math.random() * 500) + 1;

  const promise = await fetch(
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=fr&page=" +
      randomPage,
    options
  );
  const series = await promise.json();

  let randomList = [];
  // création des index aléatoires (il ne faut pas 2 fois le même index)
  for (let i = 0; i < 8; i++) {
    let randomIndex = Math.floor(Math.random() * 20);
    if (randomList.includes(randomIndex)) {
      i--;
    } else {
      randomList.push(randomIndex);
    }
  }

  // boucle pour afficher les films
  for (let i = 0; i < randomList.length; i++) {
    const serie = series.results[randomList[i]];

    const serieDiv = document.createElement("div");
    serieDiv.classList.add("serie");

    const serieTitle = document.createElement("h3");
    serieTitle.textContent = serie.name;

    // mise des éléments dans le DOM
    if (serie.poster_path === null) {
      const seriewarning = document.createElement("p");
      seriewarning.textContent = "Pas d'image disponible";
      serieDiv.appendChild(seriewarning);
    } else {
      const serieImage = document.createElement("img");
      serieImage.src = "https://image.tmdb.org/t/p/w400" + serie.poster_path;
      serieImage.alt = serie.name;
      serieDiv.appendChild(serieImage);
    }
    serieDiv.appendChild(serieTitle);
    const serieDescription = document.createElement("p");
    if (serie.overview === "") {
      serieDescription.textContent = "Pas de description disponible";
    } else {
      serieDescription.textContent = serie.overview;
    }
    serieDiv.appendChild(serieDescription);
    seriesSection.appendChild(serieDiv);
  }
}

// call the functions
displayMovies();
displaySeries();
