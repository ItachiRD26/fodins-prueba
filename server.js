const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());

// Create a transporter using Gmail's SMTP server
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify the transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log("Transporter verification error:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// Endpoint para enviar correo de voluntario
app.post("/enviar-correo", async (req, res) => {
  const { nombre, apellidos, correo, telefono, profesion, areasInteres, disponibilidad } = req.body;

  try {
    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "petergarcia0426@gmail.com",
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

    // Send confirmation email to volunteer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
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
    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "petergarcia0426@gmail.com", // Cambia esto al correo del administrador
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

    // Send confirmation email to the potential partner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
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

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

console.log("Server code updated successfully.");