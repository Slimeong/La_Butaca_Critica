// traerdatos.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
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

// Función para obtener los datos del usuario
async function obtenerDatosUsuario() {
  const user = auth.currentUser;
  if (!user) return null;

  const docRef = doc(db, "datosusuarios", user.uid);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? docSnap.data() : null;
}

// Función para mostrar el nombre directamente en el HTML
async function mostrarNombre() {
  const datos = await obtenerDatosUsuario();
  const nombre = datos?.nombre || "Invitado";
  const spanNombre = document.getElementById("nombreUsuario");
  if (spanNombre) spanNombre.textContent = nombre;
}

// Ejecutar al cargar el script
mostrarNombre();
