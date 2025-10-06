document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".buscador-menu input");
  const galeria = document.querySelector(".galeria");
  const elementos = galeria.querySelectorAll("a");

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

  // Evita que el formulario recargue la página al presionar Enter
  const form = document.querySelector(".buscador-menu");
  form.addEventListener("submit", e => e.preventDefault());
});
