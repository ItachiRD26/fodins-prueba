const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:3000", //CAMBIAR A LA URL DEL SITIO WEB
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Configuración del transporter con Zoho Mail
const zohoTransporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // Usar SSL
  auth: {
    user: process.env.EMAIL_USER_ZOHOMAIL, // Tu correo de Zoho Mail
    pass: process.env.EMAIL_PASS_ZOHOMAIL, // Tu contraseña de Zoho Mail
  },
  tls: {
    rejectUnauthorized: false, // Ignorar errores de certificado (opcional)
  },
});

// Función para verificar la configuración del transporter
const verifyTransporter = (transporter, name) => {
  transporter.verify((error, success) => {
    if (error) {
      console.log(`Error al verificar el transporter de ${name}:`, error);
    } else {
      console.log(`Servidor listo para enviar correos con ${name}`);
    }
  });
};

// Verificar la configuración del transporter de Zoho Mail
verifyTransporter(zohoTransporter, 'Zoho Mail');

// Función para enviar correo usando Zoho Mail
const sendEmail = async (options) => {
  try {
    // Enviar correo con Zoho Mail
    await zohoTransporter.sendMail(options);
    console.log('Correo enviado con Zoho Mail');
  } catch (error) {
    console.error('Error al enviar con Zoho Mail:', error);
    throw new Error('No se pudo enviar el correo con Zoho Mail');
  }
};

// Endpoint para enviar correo de voluntario
app.post("/enviar-correo", async (req, res) => {
  const { nombre, apellidos, correo, telefono, profesion, areasInteres, disponibilidad } = req.body;

  try {
    // Enviar correo al administrador
    await sendEmail({
      from: process.env.EMAIL_USER_ZOHOMAIL, // Usar el correo de Zoho como remitente
      to: "fundacionfodins2015@gmail.com", // Cambia esto al correo del administrador
      subject: "Nuevo registro de voluntario",
      html: `
        <h1>Nuevo registro de voluntario</h1>
        <p><strong>Nombre:</strong> ${nombre} ${apellidos}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Profesión:</strong> ${profesion}</p>
        <p><strong>Áreas de interés:</strong> ${areasInteres}</p>
        <p><strong>Disponibilidad:</strong> ${disponibilidad}</p>
      `,
    });

    // Enviar correo de confirmación al voluntario
    await sendEmail({
      from: process.env.EMAIL_USER_ZOHOMAIL, // Usar el correo de Zoho como remitente
      to: correo,
      subject: "Gracias por registrarte en FODINS",
      html: `
        <h1>¡Gracias por tu interés en FODINS!</h1>
        <p>Hemos recibido tu solicitud para ser voluntario. Nuestro equipo se pondrá en contacto contigo pronto.</p>
        <p>Atentamente,</p>
        <p>El equipo de FODINS</p>
      `,
    });

    res.status(200).json({ message: "Correos enviados correctamente" });
  } catch (error) {
    console.error("Error enviando correos:", error);
    res.status(500).json({ message: "Error al enviar los correos", error: error.message });
  }
});

// Endpoint para enviar correo de socio
app.post("/enviar-correo-socio", async (req, res) => {
  const { nombre, correo, telefono, tipoInstitucion, nombreInstitucion, colaboracion, mensaje } = req.body;

  try {
    // Enviar correo al administrador
    await sendEmail({
      from: process.env.EMAIL_USER_ZOHOMAIL, // Usar el correo de Zoho como remitente
      to: "fundacionfodins2015@gmail.com", // Cambia esto al correo del administrador
      subject: "Nueva solicitud de socio",
      html: `
        <h1>Nueva solicitud de socio</h1>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Tipo de institución:</strong> ${tipoInstitucion}</p>
        <p><strong>Nombre de la institución:</strong> ${nombreInstitucion || 'No especificado'}</p>
        <p><strong>Forma de colaboración:</strong> ${colaboracion}</p>
        <p><strong>Mensaje:</strong> ${mensaje || 'No especificado'}</p>
      `,
    });

    // Enviar correo de confirmación al socio potencial
    await sendEmail({
      from: process.env.EMAIL_USER_ZOHOMAIL, // Usar el correo de Zoho como remitente
      to: correo,
      subject: "Gracias por tu interés en ser socio de FODINS",
      html: `
        <h1>¡Gracias por tu interés en ser socio de FODINS!</h1>
        <p>Hemos recibido tu solicitud para ser socio. Nuestro equipo se pondrá en contacto contigo pronto para discutir las oportunidades de colaboración.</p>
        <p>Atentamente,</p>
        <p>El equipo de FODINS</p>
      `,
    });

    res.status(200).json({ message: "Correos enviados correctamente" });
  } catch (error) {
    console.error("Error enviando correos:", error);
    res.status(500).json({ message: "Error al enviar los correos", error: error.message });
  }
});

// Endpoint para enviar correo de contacto
app.post("/enviar-correo-contacto", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Enviar correo al administrador
    await sendEmail({
      from: process.env.EMAIL_USER_ZOHOMAIL, // Usar el correo de Zoho como remitente
      to: "ministerionuevavida16@yahoo.com", // Cambia esto al correo del administrador
      subject: "Nuevo Registro Ministerio",
      html: `
        <h1>Nuevo mensaje de contacto</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    });

    // Enviar correo de confirmación al usuario
    await sendEmail({
      from: process.env.EMAIL_USER_ZOHOMAIL, // Usar el correo de Zoho como remitente
      to: email,
      subject: "Dios te bendiga más,de parte del Ministerio Nueva Vida",
      html: `
        <h1>¡Gracias por contactarnos!</h1>
        <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
        <p>Atentamente,</p>
        <p>El equipo de Nueva Vida</p>
      `,
    }); 

    res.status(200).json({ message: "Correos enviados correctamente" });
  } catch (error) {
    console.error("Error enviando correos:", error);
    res.status(500).json({ message: "Error al enviar los correos", error: error.message });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});