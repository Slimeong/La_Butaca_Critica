// traerdatos.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Configuración de Firebase (igual que en tu registro)
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
 * Función que obtiene todos los datos del usuario logueado
 * @returns {Promise<Object|null>} - Retorna un objeto con los datos o null si no hay usuario
 */
export async function obtenerDatosUsuario() {
  const user = auth.currentUser;
  if (!user) return null;

  const uid = user.uid;
  const docRef = doc(db, "datosusuarios", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data(); // { nombre, email, genero, fechaRegistro }
  } else {
    return null;
  }
}

/**
 * Función que obtiene solo el nombre del usuario logueado
 * @returns {Promise<string>} - Retorna el nombre o "Invitado" si no hay usuario
 */
export async function obtenerNombreUsuario() {
  const datos = await obtenerDatosUsuario();
  return datos?.nombre || "Invitado";
}
