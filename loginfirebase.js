// Importar Firebase (versión modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Configuración de Firebase
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

// Evento click del botón de login
document.getElementById("btnLogin").addEventListener("click", () => {
  const email = document.getElementById("usuario").value.trim();
  const password = document.getElementById("clave").value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: user.email,
        showConfirmButton: false,
        timer: 2000,
        background: "#0a4547",
        color: "#fff",
        confirmButtonColor: "#ffb300",
        cancelButtonColor: "#555",
        iconColor: "#ffb300",
      }).then(() => {
        window.location.href = "logeado.html";
      });
    })
    .catch((error) => {
      let mensaje = "";
      switch (error.code) {
        case "auth/invalid-email":
          mensaje = "Formato de correo inválido.";
          break;
        case "auth/user-not-found":
          mensaje = "Correo no registrado.";
          break;
        case "auth/invalid-credential":
          mensaje = "Contraseña o usuario incorrectos.";
          break;
        case "auth/missing-password":
          mensaje = "Por favor, ingresa tu contraseña.";
          break;
        default:
          mensaje = "Ha ocurrido un error: " + error.message;
      }

      Swal.fire({
        icon: "error",
        title: "¡Ups!",
        text: mensaje,
        background: "#0a4547",
        color: "#fff",
        confirmButtonColor: "#ffb300",
        cancelButtonColor: "#555",
        iconColor: "#ffb300",
        confirmButtonText: "Entendido"
      });
    });
});

// Detectar si ya hay sesión iniciada
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario logueado:", user.email);
  } else {
    console.log("Nadie logueado");
  }
});
