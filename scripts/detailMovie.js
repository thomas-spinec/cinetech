const movieArticle = document.querySelector("#movie");
const movieId = window.location.pathname.split("/").pop();
const commentArticle = document.querySelector("#comments");
const similarMovies = document.querySelector(".movies");
const popup = document.getElementById("popup");
const closePop = document.querySelector("#closePop");

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

  // TITLE -------------------------
  const movieTitle = document.createElement("h2");
  movieTitle.textContent = movie.title;
  movieArticle.appendChild(movieTitle);

  // IMAGE -------------------------
  const movieImage = document.createElement("img");
  if (movie.poster_path === null) {
    movieImage.src = "/cinetech/img/fake-img.jpg";
    movieImage.alt = movie.title;
  } else {
    movieImage.src = "https://image.tmdb.org/t/p/w400" + movie.poster_path;
    movieImage.alt = movie.title;
  }
  movieArticle.appendChild(movieImage);

  // DESCRIPTION -------------------------
  const movieDescription = document.createElement("p");
  if (movie.overview === "") {
    movieDescription.textContent = "Pas de description disponible";
  } else {
    movieDescription.textContent = movie.overview;
  }
  movieArticle.appendChild(movieDescription);

  // GENRES -------------------------
  const movieGenres = document.createElement("p");
  movieGenres.textContent = "Genres : ";
  for (let genre of movie.genres) {
    movieGenres.textContent += genre.name + ", ";
  }
  movieArticle.appendChild(movieGenres);

  // DATE -------------------------
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

  // DURATION -------------------------
  const movieDuration = document.createElement("p");
  movieDuration.textContent = "Durée : " + movie.runtime + " minutes";
  movieArticle.appendChild(movieDuration);

  // DIRECTOR -------------------------
  const movieDirector = document.createElement("p");
  movieDirector.textContent = "Réalisateur : ";
  for (let crew of movie.credits.crew) {
    if (crew.job === "Director") {
      movieDirector.textContent += crew.name + ", ";
    }
  }

  movieArticle.appendChild(movieDirector);

  // COUNTRIES -------------------------
  const movieCountries = document.createElement("p");
  movieCountries.textContent = "Pays de production : ";
  for (let country of movie.production_countries) {
    movieCountries.textContent += country.name + ", ";
  }
  movieArticle.appendChild(movieCountries);

  // CAST -------------------------
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

    // mise des éléments dans le DOM

    similarMovies.appendChild(movieDiv);
  }
}

async function displayComments() {
  commentArticle.innerHTML = "";
  const promise = await fetch(
    "https://api.themoviedb.org/3/movie/" + movieId + "/reviews?language=fr-FR",
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

    // ---------------------------------------------
    // bouton pour répndre au commentaire
    const commentReply = document.createElement("button");
    commentReply.textContent = "Répondre";
    // mettre l'id du commentaire dans le bouton
    commentReply.dataset.id = comment.id;
    commentReply.classList.add("reply");
    commentDiv.appendChild(commentReply);

    // mise des éléments dans le DOM

    commentArticle.appendChild(commentDiv);
  }
}

function replyToComment(idcomment) {
  const formDiv = document.getElementById("formReponse");
  // création du formulaire
  const form = document.createElement("form");
  form.method = "POST";
  // création du textarea
  const textarea = document.createElement("textarea");
  textarea.name = "content";
  textarea.placeholder = "Votre réponse";
  form.appendChild(textarea);
  // création du bouton
  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Répondre";
  form.appendChild(button);
  // mise du formulaire dans le DOM
  formDiv.appendChild(form);
  // quand on soumet le formulaire
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (textarea.value.length < 1) {
      alert("Veuillez écrire votre réponse");
    } else {
      // on récupère les données du formulaire
      const data = new FormData(this);
      // on ajoute l'id du commentaire au formulaire
      data.append("comment_id", idcomment);
      // on ajoute l'id du film au formulaire
      data.append("movie_id", movieId);
      // on ajoute le type (movie ou serie) au formulaire
      data.append("type", "movie");
      // on envoie les données du formulaire
      const promise = await fetch("/cinetech/reply", {
        method: "POST",
        body: data,
      });
      const response = await promise.json();
      // si il y a une erreur
      if (response.error) {
        alert(response.error);
      } else if (response.success) {
        alert(response.success);
        // on réaffiche les commentaires
        displayComments();
      }
    }
  });
}

// ---------------------------------------------

displayMovie();
displaySimilarMovies();
displayComments();

commentArticle.addEventListener("click", function (event) {
  if (event.target.classList.contains("reply")) {
    // on affiche le formulaire de réponse dans une popup
    const idcomment = event.target.dataset.id;
    popup.classList.toggle("hidden");
    replyToComment(idcomment);
  }
});

// partie pour fermer la popup
console.log(closePop);
console.log(popup);
closePop.addEventListener("click", function () {
  console.log("click");
  formDiv.innerHTML = "";
  popup.classList.toggle("hidden");
});
