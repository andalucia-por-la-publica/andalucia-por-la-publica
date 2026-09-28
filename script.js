const logo = document.getElementById("logo");
const logoFallback = document.getElementById("logo-fallback");

logo.addEventListener("error", () => {
  logo.hidden = true;
  logoFallback.hidden = false;
});
