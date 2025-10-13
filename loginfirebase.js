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

// Cuando hacen clic en "Iniciar Sesión"
document.getElementById("btnLogin").addEventListener("click", () => {
  const email = document.getElementById("usuario").value.trim();
  const password = document.getElementById("clave").value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Bienvenido " + user.email);
      window.location.href = "logeado.html"; // Redirige al inicio
    })
    .catch((error) => {
      // Manejo personalizado de errores
      let mensaje = "";
      switch (error.code) {
        case "auth/invalid-email":
          mensaje = "Formato de correo inválido.";
          break;
        case "auth/user-not-found":
          mensaje = "Correo no registrado.";
          break;
        case "auth/wrong-password":
          mensaje = "Contraseña errónea.";
          break;
        case "auth/missing-password":
          mensaje = "Por favor, ingresa tu contraseña.";
          break;
        default:
          mensaje = "Error: " + error.message;
      }
      alert(mensaje);
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
