// registrarfirebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore, doc, setDoc, query, where, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Configuración de tu proyecto Firebase
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

// Referencia al formulario
const form = document.getElementById("registroForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = form.nombre.value;
  const email = form.email.value;
  const password = form.password.value;
  const password2 = form.password2.value;

  const generoRadio = form.querySelector('input[name="genero"]:checked');
  const genero = generoRadio ? generoRadio.value : null;

  if (password !== password2) {
    alert("Las contraseñas no coinciden");
    return;
  }

  if (!genero) {
    alert("Por favor selecciona un género");
    return;
  }

  try {
    // 🔍 Verificar si el correo ya existe en Firestore (por seguridad extra)
    const q = query(collection(db, "datosusuarios"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("Este correo electrónico ya está registrado en la base de datos.");
      return;
    }

    // 👤 Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 🗂️ Guardar datos adicionales en Firestore
    await setDoc(doc(db, "datosusuarios", user.uid), {
      nombre: nombre,
      email: email,
      genero: genero,
      fechaRegistro: new Date()
    });

    alert("Usuario registrado correctamente!");
    form.reset(); // Limpiar formulario
    window.location.href = "index.html";

  } catch (error) {
    console.error("Error registrando usuario:", error);

    if (error.code === "auth/email-already-in-use") {
      alert("Este correo electrónico ya está registrado. Por favor, usa otro.");
    } else if (error.code === "auth/invalid-email") {
      alert("El formato del correo electrónico no es válido.");
    } else if (error.code === "auth/weak-password") {
      alert("La contraseña es demasiado débil. Usa una más segura.");
    } else {
      alert("Error: " + error.message);
    }
  }
});
