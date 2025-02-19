import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = {
  type: process.env.NEXT_PUBLIC_TYPE,
  project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
  private_key_id: process.env.NEXT_PUBLIC_PRIVATE_KEY_ID,
  private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
  client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  auth_uri: process.env.NEXT_PUBLIC_AUTH_URI,
  token_uri: process.env.NEXT_PUBLIC_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.NEXT_PUBLIC_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.NEXT_PUBLIC_CLIENT_X509_CERT_URL,
  universe_domain: process.env.NEXT_PUBLIC_UNIVERSE_DOMAIN,
};

const appAdmin = initializeApp({
  credential: cert(serviceAccount),
}, "appAdmin");

export const verifyUser = async (idToken) => {
  try {
    // Verifica el token JWT (incluye verificación de expiración)
    const decodedToken = await authAdmin.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Verifica si el UID está en la lista de permitidos
    const allowedUIDs = ['HUD7XNKKzxcHz1Lh7HSXngcJlXn1', 'eJLs6IzcKmUbkWGYJkrAMYcHTgN2'];
    return allowedUIDs.includes(uid);
  } catch (error) {
    console.error("Error verificando usuario:", error);
    return false; // Si el token es inválido o ha expirado, devuelve false
  }
};

export { authAdmin };