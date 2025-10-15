document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".buscador-menu input");
  const formular = document.querySelector(".buscador-menu");

  // Evita que el formulario recargue la página al presionar Enter
  formular.addEventListener("submit", e => e.preventDefault());

  // Selecciona TODAS las galerías y todos los enlaces dentro
  const elementos = document.querySelectorAll(".galeria a");

  // Filtra mientras el usuario escribe
  input.addEventListener("input", () => {
    const texto = input.value.toLowerCase().trim();

    elementos.forEach(a => {
      const alt = a.querySelector("img").alt.toLowerCase();
      const href = a.getAttribute("href").toLowerCase();

      // Mostrar si coincide con alt o href
      if (alt.includes(texto) || href.includes(texto)) {
        a.style.display = "";
      } else {
        a.style.display = "none";
      }
    });
  });
});
// buscador.js
document.addEventListener("DOMContentLoaded", () => {
  const inputBusqueda = document.getElementById("busquedaNombre");
  const filtro = document.getElementById("filtroSelect");
  const imagenes = document.querySelectorAll(".galeria img");

  function filtrarPeliculas() {
    const texto = inputBusqueda.value.toLowerCase();
    const generoSeleccionado = filtro.value.toLowerCase();

    imagenes.forEach(img => {
      const titulo = img.alt.toLowerCase();
      const genero = img.dataset.genero ? img.dataset.genero.toLowerCase() : "";

      const coincideGenero =
        generoSeleccionado === "" || genero.includes(generoSeleccionado);
      const coincideTexto =
        texto === "" || titulo.includes(texto);

      if (coincideGenero && coincideTexto) {
        img.parentElement.style.display = "inline-block";
      } else {
        img.parentElement.style.display = "none";
      }
    });
  }

  // eventos
  inputBusqueda.addEventListener("input", filtrarPeliculas);
  filtro.addEventListener("change", filtrarPeliculas);
});
