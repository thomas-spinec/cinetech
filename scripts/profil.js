const infTab = document.querySelector("#infos");
const favTab = document.querySelector("#favs");
const sectionDisplay = document.querySelector(".display");

async function getInfos() {
  sectionDisplay.innerHTML = "";
  const promise = await fetch("/cinetech/profil/informations", options);
  const infos = await promise.json();
  const div = document.createElement("div");
  div.classList.add("infos");
  for (let info of infos) {
    const titre = document.createElement("h3");
    titre.textContent = "Informations";
    const name = document.createElement("p");
    name.textContent = "Prénom: " + info.name;
    const lastname = document.createElement("p");
    lastname.textContent = "Nom: " + info.lastname;
    const email = document.createElement("p");
    email.textContent = "Email: " + info.email;

    div.appendChild(titre);
    div.appendChild(name);
    div.appendChild(lastname);
    div.appendChild(email);
  }
  sectionDisplay.appendChild(div);
}

async function getFavs() {
  sectionDisplay.innerHTML = "";
  const promise = await fetch("/cinetech/profil/favorites", options);
  const favs = await promise.json();
  const titreMovie = document.createElement("h3");
  titreMovie.textContent = "Films favoris";
  sectionDisplay.appendChild(titreMovie);
  const divMovies = document.createElement("div");
  divMovies.classList.add("favMovie", "moviesWrap");
  sectionDisplay.appendChild(divMovies);
  const titreSerie = document.createElement("h3");
  titreSerie.textContent = "Séries favorites";
  sectionDisplay.appendChild(titreSerie);
  const divSeries = document.createElement("div");
  divSeries.classList.add("favSerie", "seriesWrap");
  sectionDisplay.appendChild(divSeries);

  // boucle
  for (let fav of favs) {
    if (fav.type == "movie") {
      const promiseMovie = await fetch(
        "https://api.themoviedb.org/3/movie/" + fav.id_type + "?language=fr-FR",
        options
      );
      const movie = await promiseMovie.json();
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

      divMovies.appendChild(movieDiv);
    } else if (fav.type == "tv") {
      const promiseSerie = await fetch(
        "https://api.themoviedb.org/3/tv/" + fav.id_type + "?language=fr-FR",
        options
      );
      const serie = await promiseSerie.json();
      const serieDiv = document.createElement("div");
      serieDiv.classList.add("serie");

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

      const serieTitle = document.createElement("h4");
      serieTitle.textContent = serie.name;
      serieDiv.appendChild(serieTitle);

      divSeries.appendChild(serieDiv);
    }
  }
}

// event listeners
infTab.addEventListener("click", getInfos);
favTab.addEventListener("click", getFavs);
