import { verifyUser } from '../../firebase/firebaseAdmin';

export default async function handler(req, res) {
  const { uid } = req.body;

  try {
    if (await verifyUser(uid)) {
      res.status(200).json({ message: 'Usuario verificado' });
    } else {
      res.status(403).json({ message: 'Acceso denegado' });
    }
  } catch (error) {
    console.error("Error en verifyToken:", error); // Usa la variable `error` para registro
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}