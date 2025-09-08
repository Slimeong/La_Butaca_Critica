// app.js

// Importar módulos del SDK modular de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// ⚠️ Configura Firebase (usa tus credenciales reales)
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
const db = getFirestore(app);

// Referencia al elemento HTML
const nombreElemento = document.getElementById("nombreUsuario");

// Detectar si el usuario está autenticado
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;

    try {
      const docRef = doc(db, "datosusuarios", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const nombre = docSnap.data().nombre;
        nombreElemento.textContent = nombre;
      } else {
        nombreElemento.textContent = "Usuario desconocido";
        console.warn("No se encontró el documento del usuario.");
      }
    } catch (error) {
      console.error("Error al obtener el documento:", error);
      nombreElemento.textContent = "Error al cargar nombre";
    }

  } else {
    nombreElemento.textContent = "Invitado";
  }
});
