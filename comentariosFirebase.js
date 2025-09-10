import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore, collection, addDoc, serverTimestamp,
  query, where, orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

/* 1) Config de Firebase - reemplazar con tu propia config */
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/* Utiles DOM */
const form = document.getElementById('comentariosForm');
const comentariosList = document.getElementById('comentariosList');
const submitBtn = form.querySelector('button[type="submit"]');

/* Page ID (definido en body data-page-id) */
const pageId = document.body.dataset.pageId || (location.pathname.split('/').pop().replace('.html','') || 'pagina_desconocida');

/* Usuario actual */
let currentUser = null;

/* Escapar HTML para evitar XSS al renderizar */
function escapeHTML(str = '') {
  return str
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#39;');
}

/* 2) Listener de autenticación */
onAuthStateChanged(auth, user => {
  currentUser = user;
  if (!user) {
    // Si realmente querés forzar login: redirigir a login aquí.
    // Por ahora mostramos mensaje en el form
    form.querySelectorAll('*').forEach(n => n.style.display = '');
    // Opcional: ocultar el form si no está logeado
    // form.innerHTML = '<p>Debes iniciar sesión para dejar una reseña.</p>';
  } else {
    // Podés mostrar el nombre en algún lado si querés
    // console.log('Usuario logeado:', user.email, user.uid);
  }
});

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

  if (!rating) { alert('Por favor seleccioná una calificación.'); return; }
  if (!comment) { alert('Escribí tu reseña antes de enviar.'); return; }

  submitBtn.disabled = true;

  try {
    await addDoc(collection(db, 'comentarios'), {
      pageId,
      uid: currentUser.uid,
      displayName: currentUser.displayName || currentUser.email || 'Anónimo',
      email: currentUser.email || null,
      rating,
      comment,
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

/* 4) Listener en tiempo real: solo trae reseñas para esta página */
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

    const name = escapeHTML(data.displayName || 'Anónimo');
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
