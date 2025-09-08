// traerNombre.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

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
const db = getFirestore(app);

/**
 * Función para obtener el nombre del usuario desde Firestore usando su UID
 */
async function obtenerNombre(uid) {
  const docRef = doc(db, "datosusuarios", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().nombre; // retorna solo el nombre
  } else {
    return null;
  }
}

// Detectar cuando el usuario está logueado
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const nombre = await obtenerNombre(user.uid);
    // Mostrar en el HTML en el span con id="nombre"
    const spanNombre = document.getElementById("nombre");
    if (spanNombre) spanNombre.textContent = nombre || "Invitado";
  } else {
    // Usuario no logueado
    const spanNombre = document.getElementById("nombre");
    if (spanNombre) spanNombre.textContent = "Invitado";
  }
});


