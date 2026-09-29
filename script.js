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

// Selector de hora personalizado (0-23)
const horaInput = document.getElementById("hora");
if (horaInput) {
  horaInput.addEventListener("focus", function() {
    let existingPicker = document.getElementById("time-picker");
    if (existingPicker) existingPicker.remove();

    const picker = document.createElement("div");
    picker.id = "time-picker";
    picker.style.cssText = `
      position: absolute;
      background: white;
      border: 2px solid var(--verde-principal);
      border-radius: 8px;
      padding: 1rem;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      width: 250px;
    `;

    let horasHtml = '<div style="margin-bottom: 1rem;"><strong>Horas (0-23):</strong><br>';
    for (let i = 0; i < 24; i++) {
      horasHtml += `<button type="button" class="hora-btn" data-hora="${String(i).padStart(2, '0')}" style="width: 30px; height: 30px; margin: 2px; cursor: pointer; border: 1px solid #ccc; border-radius: 4px; background: white;">${String(i).padStart(2, '0')}</button>`;
    }
    horasHtml += '</div>';

    let minutosHtml = '<div><strong>Minutos:</strong><br>';
    for (let i = 0; i < 60; i += 5) {
      minutosHtml += `<button type="button" class="minuto-btn" data-minuto="${String(i).padStart(2, '0')}" style="width: 40px; height: 30px; margin: 2px; cursor: pointer; border: 1px solid #ccc; border-radius: 4px; background: white;">${String(i).padStart(2, '0')}</button>`;
    }
    minutosHtml += '</div>';

    picker.innerHTML = horasHtml + minutosHtml;

    document.body.appendChild(picker);

    const rect = horaInput.getBoundingClientRect();
    picker.style.top = (rect.bottom + window.scrollY + 5) + "px";
    picker.style.left = rect.left + "px";

    let horaSeleccionada = null;
    let minutoSeleccionado = null;

    document.querySelectorAll(".hora-btn").forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        horaSeleccionada = this.dataset.hora;
        document.querySelectorAll(".hora-btn").forEach(b => b.style.background = "white");
        this.style.background = "var(--verde-principal)";
        this.style.color = "white";
      });
    });

    document.querySelectorAll(".minuto-btn").forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        minutoSeleccionado = this.dataset.minuto;
        document.querySelectorAll(".minuto-btn").forEach(b => b.style.background = "white");
        this.style.background = "var(--verde-principal)";
        this.style.color = "white";

        if (horaSeleccionada && minutoSeleccionado) {
          horaInput.value = horaSeleccionada + ":" + minutoSeleccionado;
          picker.remove();
        }
      });
    });

    document.addEventListener("click", function handleClickOutside(e) {
      if (!picker.contains(e.target) && e.target !== horaInput) {
        picker.remove();
        document.removeEventListener("click", handleClickOutside);
      }
    });
  });

  // Validar formato al escribir manualmente
  horaInput.addEventListener("input", function() {
    const value = this.value;
    if (value && !/^\d{2}:\d{2}$/.test(value)) {
      this.style.borderColor = "#d32f2f";
    } else {
      this.style.borderColor = "var(--verde-principal)";
    }
  });
}
