const authButton = document.querySelector(".auth");
const authSection = document.querySelector("#authSection");
const closeAuth = document.querySelector("#closePop");
const burger = document.querySelector("#burger");
const close = document.querySelector("#close");
const nav = document.querySelector("#nav");

// partie bouton authentification
authButton.addEventListener("click", () => {
  authSection.classList.toggle("hidden");
});

closeAuth.addEventListener("click", () => {
  authSection.classList.toggle("hidden");
});

// partie menu burger

burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  close.classList.toggle("open");
  nav.classList.toggle("open");
  nav.classList.toggle("close");
});

close.addEventListener("click", () => {
  close.classList.toggle("open");
  burger.classList.toggle("open");
  nav.classList.toggle("open");
  nav.classList.toggle("close");
});
