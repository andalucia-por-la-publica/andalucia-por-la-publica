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

// Calendario personalizado (formato dd/mm/yyyy), se abre al pinchar en el campo
const diaInput = document.getElementById("dia");
if (diaInput) {
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  diaInput.addEventListener("click", function () {
    const existing = document.getElementById("date-picker");
    if (existing) {
      existing.remove();
      return;
    }

    let selectedDate = null;
    const parts = diaInput.value.split("/");
    if (parts.length === 3) {
      selectedDate = new Date(parts[2], parts[1] - 1, parts[0]);
    }
    const today = selectedDate || new Date();
    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth();

    const calendar = document.createElement("div");
    calendar.id = "date-picker";
    calendar.style.cssText = `
      position: fixed;
      background: white;
      border: 2px solid var(--verde-principal);
      border-radius: 8px;
      padding: 1rem;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      font-family: inherit;
      width: 280px;
    `;

    function render() {
      const year = viewYear;
      const month = viewMonth;
      const firstDayIndex = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      let html = `
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 0.75rem;">
          <button type="button" id="prev-month" style="padding: 4px 10px; cursor: pointer; background: var(--verde-principal); color: white; border: none; border-radius: 4px;">◀</button>
          <span style="font-weight: bold;">${monthNames[month]} ${year}</span>
          <button type="button" id="next-month" style="padding: 4px 10px; cursor: pointer; background: var(--verde-principal); color: white; border: none; border-radius: 4px;">▶</button>
        </div>
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px;">
      `;
      dayNames.forEach(d => {
        html += `<div style="text-align:center; font-size:12px; font-weight:bold; padding:4px;">${d}</div>`;
      });
      for (let i = 0; i < firstDayIndex; i++) {
        html += `<div></div>`;
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const isSelected = selectedDate &&
          day === selectedDate.getDate() &&
          month === selectedDate.getMonth() &&
          year === selectedDate.getFullYear();
        html += `<button type="button" class="calendar-day" data-day="${day}" style="padding:6px 0; cursor:pointer; border:1px solid #ddd; border-radius:4px; background:${isSelected ? "var(--verde-principal)" : "white"}; color:${isSelected ? "white" : "black"};">${day}</button>`;
      }
      html += `</div>`;
      calendar.innerHTML = html;

      calendar.querySelector("#prev-month").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        viewMonth--;
        if (viewMonth < 0) {
          viewMonth = 11;
          viewYear--;
        }
        render();
      });
      calendar.querySelector("#next-month").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        viewMonth++;
        if (viewMonth > 11) {
          viewMonth = 0;
          viewYear++;
        }
        render();
      });
      calendar.querySelectorAll(".calendar-day").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const day = parseInt(btn.dataset.day, 10);
          diaInput.value = String(day).padStart(2, "0") + "/" + String(viewMonth + 1).padStart(2, "0") + "/" + viewYear;
          calendar.remove();
        });
      });
    }

    render();
    document.body.appendChild(calendar);

    const rect = diaInput.getBoundingClientRect();
    calendar.style.top = (rect.bottom + 5) + "px";
    calendar.style.left = rect.left + "px";

    setTimeout(() => {
      document.addEventListener("click", function handleClickOutside(e) {
        if (e.target !== diaInput && !calendar.contains(e.target)) {
          calendar.remove();
          document.removeEventListener("click", handleClickOutside);
        }
      });
    }, 0);
  });
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
