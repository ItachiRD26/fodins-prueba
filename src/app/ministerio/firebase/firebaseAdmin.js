// src/firebase/firebaseAdmin.js
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json'; // Ajusta la ruta según tu estructura

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const verifyUser = async (uid) => {
  try {
    const user = await admin.auth().getUser(uid);
    return user.uid === 'eJLs6IzcKmUbkWGYJkrAMYcHTgN2'; // Reemplaza con el UID permitido
  } catch {
    return false;
  }
};

export const db = admin.firestore();
export const storage = admin.storage();