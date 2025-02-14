// src/pages/api/protected.js
import { verifyUser } from '../../firebase/firebaseAdmin';

export default async function handler(req, res) {
  const { uid } = req.body;

  if (await verifyUser(uid)) {
    res.status(200).json({ message: 'Acceso permitido' });
  } else {
    res.status(403).json({ message: 'Acceso denegado' });
  }
}
