"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";

// Sección de Contacto
export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const [successMessage, setSuccessMessage] = useState(""); // Mensaje de éxito
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
  
    try {
      const response = await fetch("/api/enviar-correo-contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
  
      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }
  
      setSuccessMessage("Mensaje enviado correctamente. ¡Gracias por contactarnos!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setErrorMessage("Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-bold text-center mb-12">Contáctanos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-8">Información de Contacto</h3>
            <ul className="space-y-6 text-lg">
              <li className="flex items-center">
                <MapPin className="mr-3" />
                <span>Calle los Lirios 20A Santo Domingo Norte Sector San Felipe,Republica Dominicana</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3" />
                <span>+1 849 215 8656</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3" />
                <span>ministerionuevavida16@yahoo.com</span>
              </li>
            </ul>
          </div>
          <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Nombre"
                className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Correo Electrónico"
                className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <textarea
                placeholder="Mensaje"
                rows={4}
                className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            {/* Mostrar mensajes de éxito o error */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-600 text-white rounded-lg">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-600 text-white rounded-lg">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg font-bold transition duration-300 shadow-lg"
              disabled={isLoading} // Deshabilitar el botón durante la carga
            >
              {isLoading ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}