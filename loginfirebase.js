// Importar Firebase (versión modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ⚡ Pegá acá tu config real de Firebase
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
  const email = document.getElementById("usuario").value;
  const password = document.getElementById("clave").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // PARA QUE DIJA BIENVENIDO alert("Bienvenido " + user.nombre);
      window.location.href = "logeado.html"; // Redirige al inicio
    })
    .catch((error) => {
      alert("Error: " + error.message);
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
