const movieArticle = document.querySelector("#movie");
const titleDiv = document.querySelector("#title");
const movieId = window.location.pathname.split("/").pop();
const commentArticle = document.querySelector("#comments");
const divAddComment = document.querySelector("#addComment");
const formAddComment = divAddComment.querySelector("form");
const similarMovies = document.querySelector(".movies");
const popup = document.getElementById("popup");
const closePop = document.querySelector("#closePop");

async function displayMovie() {
  const promise = await fetch(
    "https://api.themoviedb.org/3/movie/" +
      movieId +
      "?language=fr-FR&append_to_response=credits",
    options
  );
  const movie = await promise.json();

  const Divgauche = document.createElement("div");
  const Divdroite = document.createElement("div");

  // TITLE -------------------------
  const movieTitle = document.createElement("h2");
  movieTitle.textContent = movie.title;
  titleDiv.appendChild(movieTitle);

  // IMAGE -------------------------
  const movieImage = document.createElement("img");
  if (movie.poster_path === null) {
    movieImage.src = "/cinetech/img/fake-img.jpg";
    movieImage.alt = movie.title;
  } else {
    movieImage.src = "https://image.tmdb.org/t/p/w400" + movie.poster_path;
    movieImage.alt = movie.title;
  }
  Divgauche.appendChild(movieImage);

  // FAVORIS -------------------------
  let data = new FormData();
  data.append("type", "movie");
  const promiseFavoris = await fetch("/cinetech/favoriteButton/" + movieId, {
    method: "POST",
    body: data,
  });
  const responseButton = await promiseFavoris.text();
  Divgauche.innerHTML += responseButton;

  // DESCRIPTION -------------------------
  const movieDescription = document.createElement("p");
  if (movie.overview === "") {
    movieDescription.textContent = "Pas de description disponible";
  } else {
    movieDescription.textContent = movie.overview;
  }
  Divgauche.appendChild(movieDescription);

  // GENRES -------------------------
  const movieGenres = document.createElement("p");
  movieGenres.textContent = "Genres : ";
  for (let genre of movie.genres) {
    movieGenres.textContent += genre.name + ", ";
  }
  Divdroite.appendChild(movieGenres);

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
  Divdroite.appendChild(movieDate);

  // DURATION -------------------------
  const movieDuration = document.createElement("p");
  movieDuration.textContent = "Durée : " + movie.runtime + " minutes";
  Divdroite.appendChild(movieDuration);

  // DIRECTOR -------------------------
  const movieDirector = document.createElement("p");
  movieDirector.textContent = "Réalisateur : ";
  for (let crew of movie.credits.crew) {
    if (crew.job === "Director") {
      movieDirector.textContent += crew.name + ", ";
    }
  }

  Divdroite.appendChild(movieDirector);

  // COUNTRIES -------------------------
  const movieCountries = document.createElement("p");
  movieCountries.textContent = "Pays de production : ";
  for (let country of movie.production_countries) {
    movieCountries.textContent += country.name + ", ";
  }
  Divdroite.appendChild(movieCountries);

  // CAST -------------------------
  const movieCast = document.createElement("p");
  movieCast.textContent = "Avec : ";
  for (let actor of movie.credits.cast) {
    movieCast.textContent += actor.name + ", ";
  }
  Divdroite.appendChild(movieCast);

  // Ajout des div dans le DOM
  movieArticle.appendChild(Divgauche);
  movieArticle.appendChild(Divdroite);
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

  //fetch des commentaires de la bdd
  const promisebdd = await fetch("/cinetech/movie/" + movieId + "/comments");
  const commentsbdd = await promisebdd.json();

  // si il n'y a pas de commentaires
  if (
    comments.results.length === 0 &&
    commentsbdd.error === "Il n'y a pas de commentaire"
  ) {
    const noComments = document.createElement("h4");
    noComments.textContent = "Pas de commentaires";
    commentArticle.appendChild(noComments);
    // on arrête la fonction
    return;
  }

  // ---------------------------------------------
  // Partie TMDB
  if (comments.results.length > 0) {
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

      // div pour les réponses
      const promiseReply = await fetch(
        "/cinetech/movie/" + movieId + "/comments/" + comment.id,
        options
      );
      const replies = await promiseReply.json();
      if (replies.error) {
        // console.log(replies.error);
      } else {
        const repliesDiv = document.createElement("div");
        repliesDiv.classList.add("replies");
        for (let reply of replies) {
          const replyDiv = document.createElement("div");
          replyDiv.classList.add("replyDiv");

          const replyAuthor = document.createElement("h4");
          replyAuthor.textContent = reply.author;
          replyDiv.appendChild(replyAuthor);

          const replyContent = document.createElement("p");
          replyContent.textContent = reply.comment;
          replyDiv.appendChild(replyContent);

          // mise des éléments dans le DOM

          repliesDiv.appendChild(replyDiv);
        }
        commentDiv.appendChild(repliesDiv);
      }

      // mise des éléments dans le DOM

      commentArticle.appendChild(commentDiv);
    }
  }

  // ---------------------------------------------
  // Partie BDD
  if (commentsbdd.error) {
    // console.log(commentsbdd.error);
    return;
  }
  for (let comment of commentsbdd) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const commentAuthor = document.createElement("h4");
    commentAuthor.textContent = comment.author;
    commentDiv.appendChild(commentAuthor);

    const commentContent = document.createElement("p");
    commentContent.textContent = comment.comment;
    commentDiv.appendChild(commentContent);

    // ---------------------------------------------
    // bouton pour répndre au commentaire
    const commentReply = document.createElement("button");
    commentReply.textContent = "Répondre";
    // mettre l'id du commentaire dans le bouton
    commentReply.dataset.id = comment.id;
    commentReply.classList.add("reply");
    commentDiv.appendChild(commentReply);

    // div pour les réponses
    const promiseReply = await fetch(
      "/cinetech/movie/" + movieId + "/comments/" + comment.id,
      options
    );
    const replies = await promiseReply.json();
    if (replies.error) {
      // console.log(replies.error);
    } else {
      const repliesDiv = document.createElement("div");
      repliesDiv.classList.add("replies");
      for (let reply of replies) {
        const replyDiv = document.createElement("div");
        replyDiv.classList.add("replyDiv");

        const replyAuthor = document.createElement("h4");
        replyAuthor.textContent = reply.author;
        replyDiv.appendChild(replyAuthor);

        const replyContent = document.createElement("p");
        replyContent.textContent = reply.comment;
        replyDiv.appendChild(replyContent);

        // mise des éléments dans le DOM

        repliesDiv.appendChild(replyDiv);
      }
      commentDiv.appendChild(repliesDiv);
    }

    // mise des éléments dans le DOM

    commentArticle.appendChild(commentDiv);
  }
}

async function addComment(form) {
  let data = new FormData(form);
  data.append("movie_id", movieId);
  data.append("type", "movie");
  const promise = await fetch("/cinetech/comment", {
    method: "POST",
    body: data,
  });
  const response = await promise.json();
  if (response.error) {
    alert(response.error);
  } else if (response.success) {
    alert(response.success);
    displayComments();
  }
}

function replyToComment(idcomment) {
  const formDiv = document.getElementById("formReponse");
  formDiv.innerHTML = "";
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
      const promise = await fetch("/cinetech/comment", {
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
      // on vide la popup et on la ferme
      popup.classList.toggle("hidden");
    }
  });
}

async function toggleFavorite(id, state) {
  let data = new FormData();
  data.append("type", "movie");
  data.append("id_type", id);
  data.append("state", state);
  const promise = await fetch("/cinetech/favorite", {
    method: "POST",
    body: data,
  });
  const response = await promise.json();
  if (response.error) {
    alert(response.error);
  } else if (response.success) {
    window.location.reload();
    alert(response.success);
  }
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

formAddComment.addEventListener("submit", function (event) {
  event.preventDefault();
  if (this.comment.value.length < 1) {
    alert("Veuillez écrire votre commentaire");
    return;
  } else {
    addComment(this);
  }
});

movieArticle.addEventListener("click", function (event) {
  if (event.target.classList.contains("addFav")) {
    const id = movieId;
    const state = "add";
    toggleFavorite(id, state);
  } else if (event.target.classList.contains("deleteFav")) {
    const id = movieId;
    const state = "remove";
    toggleFavorite(id, state);
  }
});
