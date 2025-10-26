// Promedio.js
document.addEventListener("DOMContentLoaded", () => {
  const comentariosList = document.getElementById("comentariosList");
  const promedioElem = document.getElementById("promedio-estrellas");

  if (!comentariosList || !promedioElem) return;

  // Observa los cambios en el contenedor de comentarios (Firebase actualiza el DOM)
  const observer = new MutationObserver(() => {
    const estrellasVisuales = comentariosList.querySelectorAll(".estrellas-visual");
    if (estrellasVisuales.length === 0) {
      promedioElem.textContent = "";
      return;
    }

    let total = 0;
    estrellasVisuales.forEach(div => {
      const texto = div.textContent.trim();
      const cantidadEstrellas = (texto.match(/★/g) || []).length;
      total += cantidadEstrellas;
    });

    const promedio = total / estrellasVisuales.length;
    promedioElem.textContent = `⭐ Promedio: ${promedio.toFixed(1)} / 5 (${estrellasVisuales.length} reseñas)`;
  });

  observer.observe(comentariosList, { childList: true, subtree: true });
});

