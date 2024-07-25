// Importar Firebase y los módulos necesarios
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD8sDCG09AywTDsweavufQuJUiL4xy4cBw",
  authDomain: "poyectofinaluhab.firebaseapp.com",
  projectId: "poyectofinaluhab",
  storageBucket: "poyectofinaluhab.appspot.com",
  messagingSenderId: "521507951779",
  appId: "1:521507951779:web:2ed2bef1119dc0e6ed1b16",
  measurementId: "G-GXP3NQ2JKQ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };