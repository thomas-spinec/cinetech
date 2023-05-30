const serieArticle = document.querySelector("#serie");
const serieId = window.location.pathname.split("/").pop();
const commentArticle = document.querySelector("#comments");
const divAddComment = document.querySelector("#addComment");
const formAddComment = divAddComment.querySelector("form");
const similarSeries = document.querySelector(".series");
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

    // mise des éléments dans le DOM

    similarSeries.appendChild(serieDiv);
  }
}

async function displayComments() {
  commentArticle.innerHTML = "";
  const promise = await fetch(
    "https://api.themoviedb.org/3/tv/" + serieId + "/reviews?language=fr-FR",
    options
  );
  const comments = await promise.json();

  // fetch des commentaires de la bdd
  const promisebdd = await fetch("/cinetech/serie/" + serieId + "/comments");
  const commentsbdd = await promisebdd.json();

  // si il n'y a pas de commentaires
  if (
    commentsbdd.error === "Il n'y a pas de commentaire" &&
    comments.results.length === 0
  ) {
    const noComments = document.createElement("h4");
    noComments.textContent = "Pas de commentaires";
    commentArticle.appendChild(noComments);
    // on arrête la fonction
    return;
  }

  // ----------------------------------------------
  // Partie TMDB
  for (let comment of comments.results) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const commentAuthor = document.createElement("h4");
    commentAuthor.textContent = comment.author;
    commentDiv.appendChild(commentAuthor);

    const commentContent = document.createElement("p");
    commentContent.textContent = comment.content;
    commentDiv.appendChild(commentContent);

    // ----------------------------------------------
    // bouton pour répondre au commentaire
    const commentReply = document.createElement("button");
    commentReply.textContent = "Répondre";
    // mettre l'id du commentaire dans le bouton
    commentReply.setAttribute("data-id", comment.id);
    commentReply.classList.add("reply");
    commentDiv.appendChild(commentReply);

    // div pour les réponses
    const promiseReply = await fetch(
      "cinetech/serie/" + serieId + "/comments",
      options
    );
    const replies = await promiseReply.json();
    if (replies.error) {
      console.log(replies.error);
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

        repliesDiv.appendChild(replyDiv);
      }
      commentDiv.appendChild(repliesDiv);
    }

    // mise des éléments dans le DOM

    commentArticle.appendChild(commentDiv);
  }
  // ----------------------------------------------
  // Partie BDD
  for (let comment of commentsbdd) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const commentAuthor = document.createElement("h4");
    commentAuthor.textContent = comment.author;
    commentDiv.appendChild(commentAuthor);

    const commentContent = document.createElement("p");
    commentContent.textContent = comment.comment;
    commentDiv.appendChild(commentContent);

    // ----------------------------------------------
    // bouton pour répondre au commentaire
    const commentReply = document.createElement("button");
    commentReply.textContent = "Répondre";
    // mettre l'id du commentaire dans le bouton
    commentReply.setAttribute("data-id", comment.id);
    commentReply.classList.add("reply");
    commentDiv.appendChild(commentReply);

    // div pour les réponses
    const promiseReply = await fetch(
      "/cinetech/serie/" + serieId + "/comments/" + comment.id,
      options
    );
    const replies = await promiseReply.json();
    if (replies.error) {
      console.log(replies.error);
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
  data.append("serie_id", serieId);
  data.append("type", "tv");
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
  // créer le formulaire
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
  // mettre le formulaire dans le DOM
  formDiv.appendChild(form);
  // quand on submit le formulaire
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (textarea.value.length < 1) {
      alert("Veuillez écrire votre réponse");
    } else {
      // on récupère les données du formulaire
      const data = new FormData(this);
      // on ajoute l'id du commentaire
      data.append("comment_id", idcomment);
      // on ajoute l'id de la série
      data.append("serie_id", serieId);
      // on ajoute le type (movie ou serie) au formulaire
      data.append("type", "tv");
      // on envoie les données du formulaire
      const promise = await fetch("cinetech/comment", {
        method: "POST",
        body: data,
      });
      const response = await promise.json();
      // si il y a une erreur
      if (response.error) {
        alert(response.error);
      }
      // si il n'y a pas d'erreur
      else if (response.success) {
        alert(response.success);
        // on réaffiche les commentaires
        displayComments();
      }
      // on vide la popup et on la ferme
      popup.classList.toggle("hidden");
    }
  });
}

// call the functions
displaySerie();
displaySimilarSeries();
displayComments();

commentArticle.addEventListener("click", function (event) {
  if (event.target.classList.contains("reply")) {
    const idcomment = event.target.getAttribute("data-id");
    console.log(idcomment);
    // replyToComment(idcomment);
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
