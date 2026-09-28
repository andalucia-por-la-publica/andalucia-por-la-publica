const logo = document.getElementById("logo");
const logoFallback = document.getElementById("logo-fallback");

if (logo && logoFallback) {
  const showFallback = () => {
    logo.hidden = true;
    logoFallback.hidden = false;
  };

  logo.addEventListener("error", showFallback);

  if (logo.complete && logo.naturalWidth === 0) {
    showFallback();
  }
}
