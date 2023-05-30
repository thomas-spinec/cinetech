const researchSection = document.querySelector("#research");
const researchForm = researchSection.querySelector("form");
const researchInput = researchSection.querySelector("input");
const researchResults = researchSection.querySelector("#results");

// const options = {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjExNjEwZmVjYzg0MGJjNzQwMjMzMDlmNWJmYTg0MCIsInN1YiI6IjY0NjIwMDhmZTNmYTJmMDE2NjIxOTc1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oSuycSPIbZ9QaXCZESa2bFfwPPhrGispvuNLEiTCZ-Q",
//   },
// };

async function autocomplete($input) {
  const promise = await fetch(
    "https://api.themoviedb.org/3/search/multi?language=fr-FR&query=" +
      $input.value,
    options
  );
  const data = await promise.json();
  const results = data.results;

  researchResults.innerHTML = "";

  // limité à 5 résultats
  for (let i = 0; i < 5; i++) {
    // si il n'y a plus de résultats
    if (results[i] === undefined) {
      break;
    }

    if (results[i].media_type === "movie") {
      researchResults.innerHTML += `
        <div class="result">

          <a href="/cinetech/movie/${results[i].id}"><h4><span class='type'>Film: </span>${results[i].title}</h4></a>

        </div>
      `;
    } else if (results[i].media_type === "tv") {
      researchResults.innerHTML += `
        <div class="result">

          <a href="/cinetech/serie/${results[i].id}"><h4><span class='type'>Série: </span>${results[i].name}</h4></a>

        </div>
      `;
    }
  }
}

researchInput.addEventListener("keyup", function () {
  // si la recherche est vide on display none le div des résultats
  if (researchInput.value === "") {
    researchResults.style.display = "none";
    return;
  }
  // si la recherche n'est pas vide on display flex le div des résultats
  else {
    researchResults.style.display = "flex";
    autocomplete(this);
  }
});
