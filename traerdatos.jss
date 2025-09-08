// traerdatos.js
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

// Función para obtener los datos del usuario desde Firestore usando su UID
async function obtenerDatosUsuario(uid) {
  const docRef = doc(db, "datosusuarios", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

// Función para mostrar los datos del usuario en el HTML
function mostrarDatosEnHTML(datos) {
  const spanNombre = document.getElementById("nombre");
  if (!spanNombre) return;

  spanNombre.textContent = datos?.nombre || "Invitado";

  // Si más adelante quieres mostrar email o género, por ejemplo:
  const spanEmail = document.getElementById("email");
  if (spanEmail) spanEmail.textContent = datos?.email || "-";

  const spanGenero = document.getElementById("genero");
  if (spanGenero) spanGenero.textContent = datos?.genero || "-";
}

// Detectar cambios de estado de autenticación y mostrar datos
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const datos = await obtenerDatosUsuario(user.uid);
    mostrarDatosEnHTML(datos);
  } else {
    // Usuario no logueado
    mostrarDatosEnHTML(null);
  }
});

