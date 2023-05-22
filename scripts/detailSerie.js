const serieArticle = document.querySelector("#serie");
const serieId = window.location.pathname.split("/").pop();
const commentArticle = document.querySelector("#comments");
const similarSeries = document.querySelector(".series");

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjExNjEwZmVjYzg0MGJjNzQwMjMzMDlmNWJmYTg0MCIsInN1YiI6IjY0NjIwMDhmZTNmYTJmMDE2NjIxOTc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oSuycSPIbZ9QaXCZESa2bFfwPPhrGispvuNLEiTCZ-Q",
  },
};

async function displaySerie() {
  const promise = await fetch(
    "https://api.themoviedb.org/3/tv/" +
      serieId +
      "?language=fr-FR&append_to_response=credits",
    options
  );
  const serie = await promise.json();

  // TITLE -------------------------
  const serieTitle = document.createElement("h2");
  serieTitle.textContent = serie.name;

  // IMAGE -------------------------
  const serieImage = document.createElement("img");
  if (serie.poster_path === null) {
    serieImage.src = "/cinetech/img/fake-img.jpg";
    serieImage.alt = serie.name;
  } else {
    serieImage.src = "https://image.tmdb.org/t/p/w400" + serie.poster_path;
    serieImage.alt = serie.name;
  }

  // DESCRIPTION -------------------------
  const serieDescription = document.createElement("p");
  if (serie.overview === "") {
    serieDescription.textContent = "Pas de description disponible";
  } else {
    serieDescription.textContent = serie.overview;
  }

  // GENRES -------------------------
  const serieGenres = document.createElement("p");
  serieGenres.textContent = "Genres : ";
  for (let genre of serie.genres) {
    serieGenres.textContent += genre.name + ", ";
  }

  // DATE -------------------------
  const serieDate = document.createElement("p");
  // changer le format de la date avec le mois avec 2 chiffres
  let date = new Date(serie.first_air_date);
  date = date.toLocaleDateString("fr-FR");
  let day = date.split("/")[0];
  let month = date.split("/")[1];
  let year = date.split("/")[2];
  if (month.length === 1) {
    month = "0" + month;
  }
  serie.first_air_date = day + "/" + month + "/" + year;

  serieDate.textContent =
    "Sortie de la première saison : " + serie.first_air_date;

  // SEASONS -------------------------
  const serieSeasons = document.createElement("p");
  serieSeasons.textContent = "Nombre de saisons : " + serie.number_of_seasons;

  // DIRECTOR -------------------------
  const serieDirector = document.createElement("p");
  serieDirector.textContent = "Créateur(s) : ";
  for (let creator of serie.created_by) {
    serieDirector.textContent += creator.name + ", ";
  }

  // COUNTRIES -------------------------
  const serieCountries = document.createElement("p");
  serieCountries.textContent = "Pays de production : ";
  for (let country of serie.production_countries) {
    serieCountries.textContent += country.name + ", ";
  }

  // CAST -------------------------
  const serieCast = document.createElement("p");
  serieCast.textContent = "Avec : ";
  for (let actor of serie.credits.cast) {
    serieCast.textContent += actor.name + ", ";
  }

  // mise des éléments dans le DOM
  serieArticle.appendChild(serieTitle);
  serieArticle.appendChild(serieImage);
  serieArticle.appendChild(serieDescription);
  serieArticle.appendChild(serieGenres);
  serieArticle.appendChild(serieDate);
  serieArticle.appendChild(serieSeasons);
  serieArticle.appendChild(serieDirector);
  serieArticle.appendChild(serieCountries);
  serieArticle.appendChild(serieCast);
}

async function displaySimilarSeries() {
  const promise = await fetch(
    "https://api.themoviedb.org/3/tv/" + serieId + "/similar?language=fr-FR",
    options
  );
  const series = await promise.json();
  console.log(series);

  // si il n'y a pas de séries similaires
  if (series.results.length === 0) {
    const noSimilarSeries = document.createElement("h4");
    noSimilarSeries.textContent = "Pas de séries similaires";
    similarSeries.appendChild(noSimilarSeries);
    // on arrête la fonction
    return;
  }

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

    const serieDescription = document.createElement("p");
    if (serie.overview === "") {
      serieDescription.textContent = "Pas de description disponible";
    } else {
      serieDescription.textContent = serie.overview;
    }
    serieDiv.appendChild(serieDescription);

    // mise des éléments dans le DOM

    similarSeries.appendChild(serieDiv);
  }
}

async function displayComments() {
  const promise = await fetch(
    "https://api.themoviedb.org/3/tv/" + serieId + "/reviews?language=fr-FR",
    options
  );
  const comments = await promise.json();

  // si il n'y a pas de commentaires
  if (comments.results.length === 0) {
    const noComments = document.createElement("h4");
    noComments.textContent = "Pas de commentaires";
    commentArticle.appendChild(noComments);
    // on arrête la fonction
    return;
  }

  for (let comment of comments.results) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const commentAuthor = document.createElement("h4");
    commentAuthor.textContent = comment.author;
    commentDiv.appendChild(commentAuthor);

    const commentContent = document.createElement("p");
    commentContent.textContent = comment.content;
    commentDiv.appendChild(commentContent);

    // mise des éléments dans le DOM

    commentArticle.appendChild(commentDiv);
  }
}

// call the functions
displaySerie();
displaySimilarSeries();
displayComments();
