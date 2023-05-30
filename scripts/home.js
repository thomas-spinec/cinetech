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

    const movieTitle = document.createElement("h4");
    movieTitle.textContent = movie.title;

    // mise des éléments dans le DOM
    movieDiv.appendChild(movieLink);
    movieDiv.appendChild(movieTitle);
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

    const serieLink = document.createElement("a");
    serieLink.href = "/cinetech/serie/" + serie.id;
    const serieImage = document.createElement("img");
    if (serie.poster_path === null) {
      serieImage.src = "/cinetech/img/fake-img.jpg";
      serieImage.alt = serie.name;
    } else {
      serieImage.src = "https://image.tmdb.org/t/p/w400" + serie.poster_path;
      serieImage.alt = serie.name;
    }
    serieLink.appendChild(serieImage);
    serieDiv.appendChild(serieLink);

    serieDiv.appendChild(serieTitle);
    seriesSection.appendChild(serieDiv);
  }
}

// call the functions
displayMovies();
displaySeries();
