import { verifyUser } from '../../firebase/firebaseAdmin';

export default async function handler(req, res) {
  const { idToken } = req.body;

  if (await verifyUser(idToken)) {
    res.status(200).json({ message: 'Acceso permitido' });
  } else {
    res.status(403).json({ message: 'Acceso denegado' });
  }
}