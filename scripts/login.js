const formLogin = document.querySelector("#formLogin");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");

let champs = [];

function validateInput(input) {
  input.nextElementSibling.innerHTML = "";
  if (input.value.trim() === "") {
    input.nextElementSibling.innerHTML = "Ce champ est obligatoire";
    champs.push(input);
  } else {
    // on retire le champ du tableau
    champs = champs.filter((champ) => champ !== input);
  }
}

// fonction pour vérifier que l'email est valide
function validateEmail(input) {
  input.nextElementSibling.innerHTML = "";
  if (!input.value.includes("@")) {
    input.nextElementSibling.innerHTML = "L'email n'est pas valide";
    champs.push(input);
  } else {
    // on retire le champ du tableau
    champs = champs.filter((champ) => champ !== input);
  }
}

// on écoute l'événement blur sur les inputs
inputEmail.addEventListener("blur", function () {
  validateInput(this);
  validateEmail(this);
});

inputPassword.addEventListener("blur", function () {
  validateInput(this);
});

// on écoute l'événement submit sur le formulaire
formLogin.addEventListener("submit", function (event) {
  // si le tableau champs est vide, tous les champs sont valides
  if (champs.length !== 0) {
    event.preventDefault();
  }
});
