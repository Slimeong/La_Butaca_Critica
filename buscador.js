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
