import { verifyUser } from '../../../firebase/firebaseAdmin';

export async function POST(req) {
  try {
    const { uid } = await req.json();

    if (await verifyUser(uid)) {
      return new Response(JSON.stringify({ message: 'Usuario verificado' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ message: 'Acceso denegado' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error("Error en verifyToken:", error);
    return new Response(JSON.stringify({ message: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}