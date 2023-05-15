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
    "https://api.themoviedb.org/3/discover/movie?page=" + randomPage,
    options
  );
  const movies = await promise.json();
  //   console.log(movies);

  randomList = [];
  // création des index aléatoires (il ne faut pas 2 fois le même index)
  for (let i = 0; i < 5; i++) {
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
    movieImage.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    movieImage.alt = movie.title;

    const movieTitle = document.createElement("h3");
    movieTitle.textContent = movie.title;

    const movieDescription = document.createElement("p");
    movieDescription.textContent = movie.overview;

    // mise des éléments dans le DOM
    movieDiv.appendChild(movieTitle);
    movieDiv.appendChild(movieImage);
    movieDiv.appendChild(movieDescription);
    moviesSection.appendChild(movieDiv);
  }
}

// call the functions
displayMovies();
