const logo = document.getElementById("logo");
const logoFallback = document.getElementById("logo-fallback");

if (logo && logoFallback) {
  logo.addEventListener("error", () => {
    logo.hidden = true;
    logoFallback.hidden = false;
  });
}
