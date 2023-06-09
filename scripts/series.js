const weekSeriesArticle = document.querySelector("#series_week");
const weekSeries = weekSeriesArticle.querySelector(".series");
const allSeriesArticle = document.querySelector("#series_by_genre");
const Series = allSeriesArticle.querySelector(".seriesWrap");
const selectGenre = allSeriesArticle.querySelector("select");

async function displayWeekSeries() {
  weekSeries.innerHTML = "";

  const promise = await fetch(
    "https://api.themoviedb.org/3/trending/tv/week?language=fr",
    options
  );
  const series = await promise.json();

  for (let serie of series.results) {
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

    // mise des éléments dans le DOM

    weekSeries.appendChild(serieDiv);
  }
}

async function getGenres() {
  const promise = await fetch(
    "https://api.themoviedb.org/3/genre/tv/list?language=fr",
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
async function displaySeries(genreId = null, page = 1) {
  Series.innerHTML = "";

  let url = "https://api.themoviedb.org/3/discover/tv?language=fr-FR";

  if (genreId !== null && genreId !== "all") {
    url += "&with_genres=" + genreId;
  }

  url += "&page=" + page;

  const promise = await fetch(url, options);
  const series = await promise.json();

  for (let serie of series.results) {
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

    // mise des éléments dans le DOM
    serieDiv.appendChild(serieTitle);
    Series.appendChild(serieDiv);
  }
  // création des bontons de pagination
  const pagination = document.createElement("div");
  pagination.classList.add("pagination");

  const previous = document.createElement("button");
  previous.textContent = "Précédent";
  previous.classList.add("previous");
  previous.dataset.page = series.page;
  if (series.page === 1) {
    previous.disabled = true;
    previous.classList.add("disabled");
  }
  pagination.appendChild(previous);

  /* numéro de la page en cours */
  const currentPage = document.createElement("span");
  currentPage.textContent = series.page;
  pagination.appendChild(currentPage);

  const next = document.createElement("button");
  next.textContent = "Suivant";
  next.classList.add("next");
  next.dataset.page = series.page;
  if (series.page === series.total_pages) {
    next.disabled = true;
    next.classList.add("disabled");
  }
  pagination.appendChild(next);

  Series.appendChild(pagination);
}

// appel des fonctions
displayWeekSeries();
getGenres().then((genres) => makeOption(genres));
displaySeries();

selectGenre.addEventListener("change", (e) => {
  displaySeries(e.target.value);
});

allSeriesArticle.addEventListener("click", (e) => {
  if (e.target.classList.contains("previous")) {
    e.preventDefault();
    const page = parseInt(e.target.dataset.page) - 1;
    displaySeries(selectGenre.value, page).then(() => {
      // revenir en haut de la div qui porte l'id series_by_genre
      allSeriesArticle.scrollIntoView();
    });
  } else if (e.target.classList.contains("next")) {
    e.preventDefault();
    const page = parseInt(e.target.dataset.page) + 1;
    displaySeries(selectGenre.value, page).then(() => {
      // revenir en haut de la div qui porte l'id series_by_genre
      allSeriesArticle.scrollIntoView();
    });
  }
});
