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

// Validación de formato de fecha dd/mm/yyyy
const diaInput = document.getElementById("dia");
if (diaInput) {
  diaInput.addEventListener("blur", function() {
    const value = this.value.trim();
    if (value && !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      this.style.borderColor = "#d32f2f";
      this.title = "Por favor, usa el formato dd/mm/yyyy (ej: 25/12/2026)";
    } else {
      this.style.borderColor = "var(--verde-principal)";
      this.title = "";
    }
  });
}
