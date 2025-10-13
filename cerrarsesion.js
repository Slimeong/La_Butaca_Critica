// cerrarsesion.js
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

// 🔹 Configuración de tu app Firebase (reemplazá con tus datos reales)
const firebaseConfig = {
  apiKey: "AIzaSyCDSY0pY9_TWcx8dnoopWDACNAlFyoH66w",
  authDomain: "usuarios-7cdb5.firebaseapp.com",
  projectId: "usuarios-7cdb5",
  storageBucket: "usuarios-7cdb5.firebasestorage.app",
  messagingSenderId: "1029677443193",
  appId: "1:1029677443193:web:0019727dd606282a58cca8"
};


// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 Botón de cerrar sesión
const btnCerrarSesion = document.getElementById("cerrarsesion");

btnCerrarSesion.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Redirigir al login después de cerrar sesión
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
      alert("Ocurrió un error al cerrar sesión");
    });
});
