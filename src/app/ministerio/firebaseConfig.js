// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_REALTIME_DATABASE_URL, // Agrega la URL de tu Realtime Database
};

const serviceAccount = {
  type: process.env.NEXT_PUBLIC_TYPE,
  project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
  private_key_id: process.env.NEXT_PUBLIC_PRIVATE_KEY_ID,
  private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\\n/g, '\n'), // Corregir saltos de línea
  client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  auth_uri: process.env.NEXT_PUBLIC_AUTH_URI,
  token_uri: process.env.NEXT_PUBLIC_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.NEXT_PUBLIC_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.NEXT_PUBLIC_CLIENT_X509_CERT_URL,
  universe_domain: process.env.NEXT_PUBLIC_UNIVERSE_DOMAIN
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Cambia a Realtime Database
const storage = getStorage(app);
const auth = getAuth(app);
export default serviceAccount;

export { db, storage, auth };