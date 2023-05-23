const authButton = document.querySelector(".auth");
const authSection = document.querySelector("#authSection");
const burger = document.querySelector("#burger");
const close = document.querySelector("#close");
const nav = document.querySelector("#nav");

authButton.addEventListener("click", () => {
  authSection.classList.toggle("hidden");
});

burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  close.classList.toggle("open");
  nav.classList.toggle("open");
  nav.classList.toggle("close");

  // transformer le menu burger en croix
});

close.addEventListener("click", () => {
  close.classList.toggle("open");
  burger.classList.toggle("open");
  nav.classList.toggle("open");
  nav.classList.toggle("close");
});
