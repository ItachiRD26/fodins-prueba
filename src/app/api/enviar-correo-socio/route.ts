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
  const { nombre, correo, telefono, tipoMembresia } = await request.json();

  try {
    // Enviar correo al administrador
    await zohoTransporter.sendMail({
      from: process.env.EMAIL_USER_ZOHOMAIL,
      to: "fundacionfodins2015@gmail.com",
      subject: "Nueva solicitud de socio",
      html: `
        <h1>Nueva solicitud de socio</h1>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Tipo de Membresía:</strong> ${tipoMembresia}</p>
      `,
    });

    // Enviar correo de confirmación al usuario
    await zohoTransporter.sendMail({
      from: process.env.EMAIL_USER_ZOHOMAIL,
      to: correo,
      subject: "Gracias por solicitar ser socio de FODINS",
      html: `
        <h1>¡Gracias por tu interés en ser socio de FODINS!</h1>
        <p>Hemos recibido tu solicitud. Nuestro equipo se pondrá en contacto contigo pronto para más detalles.</p>
        <p>Atentamente,</p>
        <p>El equipo de FODINS</p>
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
