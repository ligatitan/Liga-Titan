// === CONFIGURA AQUÍ TU GOOGLE SHEET ===
const SHEET_ID = "PON_AQUI_TU_SHEET_ID";
const SHEET_GID = null; // opcional: si tu hoja no es la primera, pon el gid (número) de la pestaña
// =======================================

// Convierte el JSON de Google Visualization a filas {nombre, puntos}
function parseGVizToRows(gviz) {
  const cols = gviz.table.cols.map(c => c.label || c.id);
  const rows = gviz.table.rows.map(r => (r.c || []).map(c => (c ? c.v : null)));
  // Esperamos columnas: Nombre | Puntos (en ese orden)
  return rows.map(r => ({
    nombre: r[0],
    puntos: Number(r[1])
  }));
}

async function cargarTabla() {
  const estado = document.getElementById("estado");
  try {
    if (!SHEET_ID || SHEET_ID.includes("PON_AQUI")) {
      estado.textContent = "Configura tu SHEET_ID en app.js";
      return;
    }
    const base = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq`;
    const params = new URLSearchParams({ "tqx": "out:json" });
    if (SHEET_GID) params.set("gid", SHEET_GID);

    const res = await fetch(`${base}?${params.toString()}`);
    const text = await res.text();
    // El JSON de gviz viene envuelto en texto; hay que recortarlo
    const json = JSON.parse(text.substring(47).slice(0, -2));

    const rows = parseGVizToRows(json)
      .filter(r => r.nombre && !Number.isNaN(r.puntos))
      .sort((a, b) => b.puntos - a.puntos);

    const tabla = document.getElementById("tabla");
    const tableEl = document.createElement("table");

    const thead = document.createElement("thead");
    thead.innerHTML = `<tr><th class="rank">#</th><th>Nombre</th><th class="score">Puntos</th></tr>`;
    tableEl.appendChild(thead);

    const tbody = document.createElement("tbody");
    rows.forEach((r, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td class="rank">${i + 1}</td><td>${r.nombre}</td><td class="score">${r.puntos}</td>`;
      tbody.appendChild(tr);
    });
    tableEl.appendChild(tbody);

    tabla.innerHTML = "";
    tabla.appendChild(tableEl);

    estado.textContent = `Última actualización: ${new Date().toLocaleString()}`;
  } catch (err) {
    console.error(err);
    estado.textContent = "No se pudo cargar la tabla. Revisa que tu Google Sheet esté publicado.";
  }
}

document.addEventListener("DOMContentLoaded", cargarTabla);
