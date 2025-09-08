import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔧 CONFIGURA TU PROYECTO FIREBASE AQUÍ
const firebaseConfig = {
  apiKey: "AIzaSyCDSY0pY9_TWcx8dnoopWDACNAlFyoH66w",
  authDomain: "usuarios-7cdb5.firebaseapp.com",
  projectId: "usuarios-7cdb5",
  storageBucket: "usuarios-7cdb5.firebasestorage.app",
  messagingSenderId: "1029677443193",
  appId: "1:1029677443193:web:0019727dd606282a58cca8"
};


// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Captura de datos
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const genero = document.querySelector('input[name="genero"]:checked')?.value;

    // Validación de contraseñas
    if (password !== password2) {
      alert("❌ Las contraseñas no coinciden");
      return;
    }

    try {
      // 1️⃣ Crear usuario en Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Guardar datos en Firestore
      await setDoc(doc(db, "datos_usuarios", user.uid), {
        nombre: nombre,
        email: email,
        genero: genero
      });

      alert("✅ Usuario registrado correctamente");
      window.location.href = "index.html"; // Redirige después del registro
    } catch (error) {
      alert("❌ Error: " + error.message);
    }
  });
});
