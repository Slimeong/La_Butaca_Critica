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
document.addEventListener("DOMContentLoaded", () => {
  const inputBusqueda = document.getElementById("busquedaNombre");
  const tipoBusqueda = document.getElementById("tipoBusqueda");
  const filtroGenero = document.getElementById("filtroSelect");
  const imagenes = document.querySelectorAll(".galeria img");

  function filtrarPeliculas() {
    const texto = inputBusqueda.value.toLowerCase().trim();
    const tipo = tipoBusqueda.value;
    const generoSeleccionado = filtroGenero.value.toLowerCase();

    imagenes.forEach(img => {
      const titulo = img.dataset.titulo?.toLowerCase() || "";
      const genero = img.dataset.genero?.toLowerCase() || "";
      const actores = img.dataset.actores?.toLowerCase() || "";

      // Verifica coincidencia por tipo
      let coincideTexto = false;
      if (texto === "") {
        coincideTexto = true;
      } else {
        switch (tipo) {
          case "titulo":
            coincideTexto = titulo.includes(texto);
            break;
          case "genero":
            coincideTexto = genero.includes(texto);
            break;
          case "actores":
            coincideTexto = actores.includes(texto);
            break;
          default:
            coincideTexto =
              titulo.includes(texto) ||
              genero.includes(texto) ||
              actores.includes(texto);
        }
      }

      // Verifica coincidencia por filtro de género
      const coincideGenero = generoSeleccionado === "" || genero.includes(generoSeleccionado);

      // Muestra u oculta la imagen
      if (coincideTexto && coincideGenero) {
        img.parentElement.style.display = "inline-block";
      } else {
        img.parentElement.style.display = "none";
      }
    });
  }

  // Eventos
  inputBusqueda.addEventListener("input", filtrarPeliculas);
  tipoBusqueda.addEventListener("change", filtrarPeliculas);
  filtroGenero.addEventListener("change", filtrarPeliculas);
});