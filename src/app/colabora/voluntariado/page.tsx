"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Image from "next/image"

type DatosVoluntario = {
  nombre: string
  apellidos: string
  correo: string
  telefono: string
  profesion: string
  areasInteres: string
  disponibilidad: string
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function PaginaVoluntarios() {
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DatosVoluntario>()

  const onSubmit = async (data: DatosVoluntario) => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:3001/enviar-correo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setEnviado(true)
      } else {
        const errorData = await response.json()
        console.error("Error del backend:", errorData)
        alert("Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {/* Hero Section */}
      <motion.div className="relative h-[50vh] min-h-[400px] w-full" variants={fadeIn}>
        <Image
          src="/fondis8.jpg?height=800&width=1200"
          alt="Voluntarios de FODINS en acción"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
            Únete al Equipo de Voluntarios de FODINS
          </h1>
        </div>
      </motion.div>

      {/* Contenido principal */}
      <motion.div className="container mx-auto px-4 py-12" variants={fadeIn}>
        <motion.h2 className="section-title" variants={fadeIn}>
          Haz la Diferencia con FODINS
        </motion.h2>

        <motion.div className="grid md:grid-cols-2 gap-12" variants={fadeIn}>
          <motion.div className="card" variants={fadeIn}>
            <h3 className="text-2xl font-semibold mb-4">¿Por qué ser voluntario en FODINS?</h3>
            <p>Ser voluntario en FODINS significa ser parte del cambio. Buscamos personas comprometidas que deseen aportar su tiempo, talento y habilidades para mejorar la calidad de vida de nuestra comunidad. No importa cuál sea tu experiencia o área de especialización, todas las habilidades son valiosas y pueden marcar la diferencia.</p>
            <h4 className="text-xl font-semibold mt-6">¿Cómo puedes ayudar?</h4> <br />
            <p>En FODINS, valoramos todo tipo de talento. Aceptamos voluntarios con diversas habilidades que puedan contribuir a nuestros proyectos y actividades. Puedes apoyar en áreas como:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Organización de eventos y jornadas comunitarias</li>
              <li>Educación y capacitación</li>
              <li>Diseño gráfico, comunicación y redes sociales</li>
              <li>Gestión administrativa y apoyo logístico</li>
              <li>Asistencia en programas de salud y bienestar</li>
              <li>Desarrollo de proyectos sostenibles</li>
            </ul>
          </motion.div>

          <motion.div className="card" variants={fadeIn}>
            {enviado ? (
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Gracias por su interés</h3>
                <p>
                  Hemos recibido su solicitud para ser voluntario. Nuestro equipo se pondrá en contacto con usted
                  próximamente para discutir las oportunidades de colaboración.
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                <motion.div variants={fadeIn}>
                  <label htmlFor="nombre" className="block mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>}
                </motion.div>

                <motion.div variants={fadeIn}>
                  <label htmlFor="apellidos" className="block mb-1">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    {...register("apellidos", { required: "Los apellidos son obligatorios" })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.apellidos && <p className="text-red-500 text-sm mt-1">{errors.apellidos.message}</p>}
                </motion.div>

                <motion.div variants={fadeIn}>
                  <label htmlFor="correo" className="block mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    {...register("correo", {
                      required: "El correo electrónico es obligatorio",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Dirección de correo electrónico inválida",
                      },
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.correo && <p className="text-red-500 text-sm mt-1">{errors.correo.message}</p>}
                </motion.div>

                <motion.div variants={fadeIn}>
                  <label htmlFor="telefono" className="block mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    {...register("telefono", { required: "El número de teléfono es obligatorio" })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>}
                </motion.div>

                <motion.div variants={fadeIn}>
                  <label htmlFor="profesion" className="block mb-1">
                    Profesión o área de especialización
                  </label>
                  <input
                    type="text"
                    id="profesion"
                    {...register("profesion", { required: "La profesión es obligatoria" })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.profesion && <p className="text-red-500 text-sm mt-1">{errors.profesion.message}</p>}
                </motion.div>

                <motion.div variants={fadeIn}>
                  <label htmlFor="areasInteres" className="block mb-1">
                    Áreas de interés en FODINS
                  </label>
                  <textarea
                    id="areasInteres"
                    {...register("areasInteres", { required: "Por favor, especifique sus áreas de interés" })}
                    className="w-full px-3 py-2 border rounded-md"
                    rows={3}
                    placeholder="Ej: Desarrollo sostenible, educación, salud pública, etc."
                  ></textarea>
                  {errors.areasInteres && <p className="text-red-500 text-sm mt-1">{errors.areasInteres.message}</p>}
                </motion.div>

                <motion.div variants={fadeIn}>
                  <label htmlFor="disponibilidad" className="block mb-1">
                    Disponibilidad
                  </label>
                  <select
                    id="disponibilidad"
                    {...register("disponibilidad", { required: "Por favor, seleccione su disponibilidad" })}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Seleccione su disponibilidad</option>
                    <option value="tiempo_completo">Tiempo completo</option>
                    <option value="medio_tiempo">Medio tiempo</option>
                    <option value="fines_de_semana">Fines de semana</option>
                    <option value="por_proyectos">Por proyectos</option>
                    <option value="flexible">Flexible</option>
                  </select>
                  {errors.disponibilidad && (
                    <p className="text-red-500 text-sm mt-1">{errors.disponibilidad.message}</p>
                  )}
                </motion.div>

                <motion.button type="submit" className="btn-primary w-full" disabled={loading} variants={fadeIn}>
                  {loading ? "Enviando..." : "Enviar solicitud"}
                </motion.button>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

