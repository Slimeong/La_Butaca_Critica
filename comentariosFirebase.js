// comentariosFirebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore, collection, addDoc, serverTimestamp,
  query, where, orderBy, onSnapshot, doc, getDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

/* 1) Config de Firebase */
const firebaseConfig = {
  apiKey: "AIzaSyCDSY0pY9_TWcx8dnoopWDACNAlFyoH66w",
  authDomain: "usuarios-7cdb5.firebaseapp.com",
  projectId: "usuarios-7cdb5",
  storageBucket: "usuarios-7cdb5.firebasestorage.app",
  messagingSenderId: "1029677443193",
  appId: "1:1029677443193:web:0019727dd606282a58cca8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/* Utiles DOM */
const form = document.getElementById('comentariosForm');
const comentariosList = document.getElementById('comentariosList');
const submitBtn = form.querySelector('button[type="submit"]');

/* Page ID */
const pageId = document.body.dataset.pageId || (location.pathname.split('/').pop().replace('.html','') || 'pagina_desconocida');

/* Usuario actual */
let currentUser = null;
let currentUserName = "Anónimo"; // valor por defecto

/* Escapar HTML para evitar XSS */
function escapeHTML(str = '') {
  return str
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}

/* 2) Listener de autenticación */
onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  if (!user) {
    form.querySelectorAll('*').forEach(n => n.style.display = '');
    currentUserName = "Invitado";
  } else {
    try {
      const docRef = doc(db, "datosusuarios", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        currentUserName = docSnap.data().nombre || "Sin nombre";
      } else {
        currentUserName = user.displayName || "Usuario";
      }
    } catch (err) {
      console.error("Error obteniendo nombre del usuario:", err);
      currentUserName = user.displayName || "Usuario";
    }
  }
});

/* Filtro de malas palabras */
const malasPalabras = [
  "tonto", "idiota", "estupido", "imbecil", "mierda", "puta",
  "pendejo", "boludo", "pelotudo", "maldito", "gil", "hdp","pene","mulatito","polla",
  "hijo de puta", "puto", "tarado"
];

function contieneMalasPalabras(texto) {
  return malasPalabras.some(palabra => {
    const regex = new RegExp(`\\b${palabra}\\b`, "i");
    return regex.test(texto);
  });
}



/* 3) Envío del formulario */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUser) {
    alert('Debes iniciar sesión para dejar una reseña.');
    return;
  }

  const ratingInput = document.querySelector('input[name="calificacion"]:checked');
  const rating = ratingInput ? parseInt(ratingInput.value, 10) : null;
  const comment = document.getElementById('comentario').value.trim();

  if (contieneMalasPalabras(comment)) {
  alert("Tu comentario contiene lenguaje inapropiado. Por favor modifícalo antes de enviarlo.");
  return;
}

  const comentarioFiltrado = comment;

  if (!rating) { alert('Por favor seleccioná una calificación.'); return; }
  if (!comment) { alert('Escribí tu reseña antes de enviar.'); return; }

  submitBtn.disabled = true;

  try {
    await addDoc(collection(db, 'comentarios'), {
      pageId,
      uid: currentUser.uid,
      nombre: currentUserName,   // 👈 ahora guarda el nombre del usuario de Firestore
      rating,
      comment: comentarioFiltrado,
      createdAt: serverTimestamp()
    });
    form.reset();
  } catch (err) {
    console.error('Error guardando reseña:', err);
    alert('Ocurrió un error guardando la reseña: ' + err.message);
  } finally {
    submitBtn.disabled = false;
  }
});

/* 4) Listener en tiempo real */
const q = query(
  collection(db, 'comentarios'),
  where('pageId', '==', pageId),
  orderBy('createdAt', 'desc')
);

onSnapshot(q, (snapshot) => {
  comentariosList.innerHTML = '';
  if (snapshot.empty) {
    comentariosList.innerHTML = '<p>No hay reseñas todavía. Sé el primero en comentar.</p>';
    return;
  }

  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement('div');
    div.className = 'reseña';

    const name = escapeHTML(data.nombre || 'Anónimo');
    let dateStr = '';
    if (data.createdAt && typeof data.createdAt.toDate === 'function') {
      dateStr = data.createdAt.toDate().toLocaleString();
    }

    const rating = data.rating || 0;
    const stars = '★'.repeat(rating) + '☆'.repeat(Math.max(0, 5 - rating));

    div.innerHTML = `
      <div class="header-reseña">
        <strong>${name}</strong> <span class="fecha">${escapeHTML(dateStr)}</span>
      </div>
      <div class="estrellas-visual">${escapeHTML(stars)}</div>
      <p class="texto-reseña">${escapeHTML(data.comment)}</p>
    `;
    comentariosList.appendChild(div);
  });
}, (err) => {
  console.error('Error al leer reseñas:', err);
  comentariosList.innerHTML = '<p>Error cargando reseñas.</p>';
});

