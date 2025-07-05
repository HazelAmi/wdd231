const hamburgerBtn = document.getElementById("hamburgerBtn");
const primaryNav = document.getElementById("primaryNav");

hamburgerBtn.addEventListener("click", () => {
  primaryNav.classList.toggle("open");
  hamburgerBtn.classList.toggle("open");
});
