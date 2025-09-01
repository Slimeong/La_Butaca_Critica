// Importar Firebase (versión modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// ⚡ Pegá acá tu config real de Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "basededatos.firebaseapp.com",
  projectId: "basededatos",
  storageBucket: "basededatos.appspot.com",
  messagingSenderId: "NUMERO",
  appId: "APP_ID"
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
      alert("Bienvenido " + user.email);
      window.location.href = "index.html"; // Redirige al inicio
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
