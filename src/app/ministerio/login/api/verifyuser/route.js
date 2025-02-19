import { verifyUser } from "../../../firebase/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req) {
  // Configurar los headers CORS
  const headers = new Headers({
    "Access-Control-Allow-Origin": "https://fodins-website.vercel.app",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  // Manejar la solicitud OPTIONS para CORS preflight
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers });
  }

  try {
    const { uid } = await req.json();
    console.log("UID recibido:", uid);

    const isVerified = await verifyUser(uid);
    console.log("Resultado de verifyUser:", isVerified);

    if (isVerified) {
      return NextResponse.json({ message: "Usuario verificado" }, { status: 200, headers });
    } else {
      return NextResponse.json({ message: "Acceso denegado" }, { status: 403, headers });
    }
  } catch (error) {
    console.error("Error en verifyToken:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500, headers });
  }
}
