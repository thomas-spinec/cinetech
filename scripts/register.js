const formInsc = document.querySelector("#formInsc");
const inputName = document.querySelector("#name");
const inputLastname = document.querySelector("#lastname");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const inputPassword2 = document.querySelector("#password_confirm");

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

// fonction pour vérifier que les mots de passe sont identiques
function validatePassword(input1, input2) {
  input2.nextElementSibling.innerHTML = "";
  if (input1.value !== input2.value) {
    input2.nextElementSibling.innerHTML =
      "Les mots de passe ne sont pas identiques";
    champs.push(input2);
  } else {
    // on retire le champ du tableau
    champs = champs.filter((champ) => champ !== input2);
  }
}

// on écoute l'événement blur sur les inputs
inputName.addEventListener("blur", function () {
  validateInput(this);
});

inputLastname.addEventListener("blur", function () {
  validateInput(this);
});

inputEmail.addEventListener("blur", function () {
  validateInput(this);
  validateEmail(this);
});
inputPassword.addEventListener("blur", function () {
  validateInput(this);
});

inputPassword2.addEventListener("blur", function () {
  validateInput(this);
  validatePassword(inputPassword, this);
});

// si champs n'est pas vide on empêche l'envoi du formulaire
formInsc.addEventListener("submit", function (e) {
  if (champs.length > 0) {
    e.preventDefault();
  }
});
