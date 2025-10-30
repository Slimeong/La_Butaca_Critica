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

  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const password2 = form.password2.value;
  const genero = form.genero.value;

  if (password !== password2) {
    Swal.fire({
      icon: "error",
      title: "Contraseñas no coinciden",
      text: "Por favor, asegúrate de que ambas contraseñas sean iguales.",
       background: "#0a4547",
  color: "#fff",
  confirmButtonColor: "#ffb300",
  cancelButtonColor: "#555",
  iconColor: "#ffb300",
    });
    return;
  }

  if (!genero) {
    Swal.fire({
      icon: "warning",
      title: "Selecciona un género",
      text: "Por favor, elige tu género favorito antes de continuar.",
        background: "#0a4547",
  color: "#fff",
  confirmButtonColor: "#ffb300",
  cancelButtonColor: "#555",
  iconColor: "#ffb300",
    });
    return;
  }

  try {
    // 🔍 Verificar si el correo ya existe en Firestore
    const q = query(collection(db, "datosusuarios"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      Swal.fire({
        icon: "error",
        title: "Correo ya registrado",
        text: "Este correo electrónico ya está en la base de datos.",
          background: "#0a4547",
  color: "#fff",
  confirmButtonColor: "#ffb300",
  cancelButtonColor: "#555",
  iconColor: "#ffb300",
      });
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

    // ✅ Registro exitoso
    Swal.fire({
      icon: "success",
      title: "¡Registro exitoso!",
      text: "Tu cuenta ha sido creada correctamente.",
      confirmButtonText: "Continuar"
    }).then(() => {
      form.reset();
      window.location.href = "index.html";
    });

  } catch (error) {
    console.error("Error registrando usuario:", error);

    let mensaje = "Ocurrió un error al registrar el usuario.";

    if (error.code === "auth/email-already-in-use") {
      mensaje = "Este correo electrónico ya está registrado. Usa otro.";
    } else if (error.code === "auth/invalid-email") {
      mensaje = "El formato del correo electrónico no es válido.";
    } else if (error.code === "auth/weak-password") {
      mensaje = "La contraseña es demasiado débil. Usa una más segura.";
    } else {
      mensaje = error.message;
    }

    Swal.fire({
      icon: "error",
      title: "Error al registrar",
      text: mensaje,
      background: "#0a4547",
  color: "#fff",
  confirmButtonColor: "#ffb300",
  cancelButtonColor: "#555",
  iconColor: "#ffb300",
    });
  }
});
