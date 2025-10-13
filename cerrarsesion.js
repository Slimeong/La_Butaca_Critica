// cerrarsesion.js
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

// 🔹 Configuración de tu app Firebase (reemplazá con tus datos reales)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
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
