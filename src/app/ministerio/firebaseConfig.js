import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, // Elimina la duplicación
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_REALTIME_DATABASE_URL,
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Obtiene la instancia de la base de datos
const storage = getStorage(app); // Obtiene la instancia de Storage
const auth = getAuth(app); // Obtiene la instancia de Auth

// Exporta las instancias necesarias
export { db, storage, auth };