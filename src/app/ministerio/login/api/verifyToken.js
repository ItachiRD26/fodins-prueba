import { verifyUser } from '../../firebase/firebaseAdmin';

export default async function handler(req, res) {
  const { idToken } = req.body;

  try {
    if (await verifyUser(idToken)) {
      res.status(200).json({ message: 'Usuario verificado' });
    } else {
      res.status(403).json({ message: 'Acceso denegado' });
    }
  } catch (error) {
    console.error("Error en verifyToken:", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}