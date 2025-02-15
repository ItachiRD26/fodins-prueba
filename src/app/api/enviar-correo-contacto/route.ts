import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const zohoTransporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER_ZOHOMAIL,
    pass: process.env.EMAIL_PASS_ZOHOMAIL,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  try {
    // Enviar correo al administrador
    await zohoTransporter.sendMail({
      from: process.env.EMAIL_USER_ZOHOMAIL,
      to: "ministerionuevavida16@yahoo.com",
      subject: "Nuevo Registro Ministerio",
      html: `
        <h1>Nuevo mensaje de contacto</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    });

    // Enviar correo de confirmación al usuario
    await zohoTransporter.sendMail({
      from: process.env.EMAIL_USER_ZOHOMAIL,
      to: email,
      subject: "Dios te bendiga más, de parte del Ministerio Nueva Vida",
      html: `
        <h1>¡Gracias por contactarnos!</h1>
        <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
        <p>Atentamente,</p>
        <p>El equipo de Nueva Vida</p>
      `,
    });

    return NextResponse.json({ message: "Correos enviados correctamente" });
  } catch (error) {
    console.error("Error enviando correos:", error);

    const errorMessage = error instanceof Error ? error.message : "Error desconocido";

    return NextResponse.json(
      { message: "Error al enviar los correos", error: errorMessage },
      { status: 500 }
    );
  }
}
