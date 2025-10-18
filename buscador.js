document.addEventListener("DOMContentLoaded", () => {
  const inputBusqueda = document.getElementById("busquedaNombre");
  const filtroSelect = document.getElementById("filtroSelect");
  const imagenes = document.querySelectorAll(".galeria img");

  function filtrarPeliculas() {
    const texto = inputBusqueda.value.toLowerCase().trim();
    const filtro = filtroSelect.value.toLowerCase();

    imagenes.forEach(img => {
      const titulo = img.dataset.titulo?.toLowerCase() || "";
      const genero = img.dataset.genero?.toLowerCase() || "";
      const actores = img.dataset.actores?.toLowerCase() || "";

      let coincide = false;

      switch (filtro) {
        case "titulo":
          coincide = titulo.includes(texto);
          break;
        case "genero":
          coincide = genero.includes(texto);
          break;
        case "actores":
          coincide = actores.includes(texto);
          break;
        default:
          coincide =
            titulo.includes(texto) ||
            genero.includes(texto) ||
            actores.includes(texto);
      }

      img.parentElement.style.display = coincide ? "inline-block" : "none";
    });
  }

  // Eventos
  inputBusqueda.addEventListener("input", filtrarPeliculas);
  filtroSelect.addEventListener("change", filtrarPeliculas);
});
