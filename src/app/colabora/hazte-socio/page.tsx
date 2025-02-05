"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type DatosSocio = {
  nombre: string
  correo: string
  telefono: string
  tipoInstitucion: string
  nombreInstitucion: string
  colaboracion: string
  mensaje: string
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function HazteSocioPage() {
  const [enviado, setEnviado] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [tipoInstitucion, setTipoInstitucion] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DatosSocio>()

  const onSubmit = async (data: DatosSocio) => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:3001/enviar-correo-socio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setEnviado(true)
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 5000)
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
    <motion.main
      className="bg-white"
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
      {/* Notificación de agradecimiento */}
      {showNotification && (
        <motion.div
          className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          ¡Gracias por registrarte como socio! Nos pondremos en contacto contigo pronto.
        </motion.div>
      )}

      {/* Hero Section */}
      <motion.section className="relative h-[40vh] min-h-[300px]" variants={fadeIn}>
        <Image
          src="/socios.jpg?height=600&width=1200&text=Únete+a+Nuestra+Causa"
          alt="Únete a Nuestra Causa"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Hazte Socio y Transforma Vidas</h1>
        </div>
      </motion.section>

      <Container className="py-16">
        <motion.div className="grid md:grid-cols-2 gap-12" variants={fadeIn}>
          {/* Formulario de Registro */}
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl font-bold mb-6">Únete a Nosotros</h2>
            {enviado ? (
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Gracias por tu interés</h3>
                <p>
                  Hemos recibido tu solicitud para ser socio. Nuestro equipo se pondrá en contacto contigo próximamente
                  para discutir las oportunidades de colaboración.
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                <motion.div variants={fadeIn}>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <Input
                    id="nombre"
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>}
                </motion.div>

                <motion.div variants={fadeIn}>
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    id="correo"
                    type="email"
                    {...register("correo", {
                      required: "El correo electrónico es obligatorio",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Dirección de correo electrónico inválida",
                      },
                    })}
                    placeholder="tu@email.com"
                  />
                  {errors.correo && <p className="text-red-500 text-sm mt-1">{errors.correo.message}</p>}
                </motion.div>

                <motion.div variants={fadeIn}>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <Input
                    id="telefono"
                    {...register("telefono", { required: "El número de teléfono es obligatorio" })}
                    placeholder="Tu número de teléfono"
                  />
                  {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>}
                </motion.div>

                <motion.div variants={fadeIn}>
                  <label htmlFor="tipoInstitucion" className="block text-sm font-medium text-gray-700">
                    Tipo de institución
                  </label>
                  <select
                    id="tipoInstitucion"
                    {...register("tipoInstitucion", { required: "Por favor, seleccione el tipo de institución" })}
                    className="w-full px-3 py-2 border rounded-md"
                    onChange={(e) => setTipoInstitucion(e.target.value)}
                  >
                    <option value="">Seleccione el tipo de institución</option>
                    <option value="persona">Persona natural</option>
                    <option value="empresa">Empresa</option>
                    <option value="fundacion">Fundación</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.tipoInstitucion && (
                    <p className="text-red-500 text-sm mt-1">{errors.tipoInstitucion.message}</p>
                  )}
                </motion.div>

                <motion.div variants={fadeIn}>
                  <label htmlFor="nombreInstitucion" className="block text-sm font-medium text-gray-700">
                    Nombre de la institución
                  </label>
                  <Input
                    id="nombreInstitucion"
                    {...register("nombreInstitucion", {
                      required: "El nombre de la institución es obligatorio",
                    })}
                    placeholder="Nombre de la institución o persona natural"
                  />
                  {errors.nombreInstitucion && (
                    <p className="text-red-500 text-sm mt-1">{errors.nombreInstitucion.message}</p>
                  )}
                </motion.div>

                <motion.div variants={fadeIn}>
                  <label htmlFor="colaboracion" className="block text-sm font-medium text-gray-700">
                    ¿Cómo te gustaría colaborar?
                  </label>
                  <Textarea
                    id="colaboracion"
                    {...register("colaboracion", { required: "Por favor, especifique cómo desea colaborar" })}
                    placeholder="Ej: Donaciones, voluntariado, patrocinios, etc."
                    className="resize-none"
                  />
                  {errors.colaboracion && <p className="text-red-500 text-sm mt-1">{errors.colaboracion.message}</p>}
                </motion.div>

                <motion.div variants={fadeIn}>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
                    Mensaje (opcional)
                  </label>
                  <Textarea
                    id="mensaje"
                    {...register("mensaje")}
                    placeholder="Cuéntanos más sobre tu interés en ser socio"
                    className="resize-none"
                  />
                </motion.div>

                <Button type="submit" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar Solicitud"}
                </Button>
              </motion.form>
            )}
          </motion.div>

          {/* Beneficios de ser Socio */}
          <motion.div variants={fadeIn}>

            <h3 className="text-2xl font-semibold mb-4">¿Por qué ser socio de FODINS?</h3>
            <p className="text-gray-600 mb-4">
              Al convertirte en socio de FODINS, no solo apoyas nuestros proyectos, sino que también te conviertes en
              parte de una red de personas y organizaciones comprometidas con el desarrollo sostenible y el bienestar de
              la comunidad. Tu contribución, en cualquiera de sus formas, tiene un impacto directo y significativo en la
              vida de quienes más lo necesitan.
            </p>

            <h4 className="text-xl font-semibold mb-2">Tu apoyo puede tomar muchas formas:</h4>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>
                <strong>Donaciones monetarias:</strong> Contribuciones económicas que nos permiten financiar proyectos,
                adquirir recursos y garantizar la continuidad de nuestras iniciativas.
              </li>
              <li>
                <strong>Donaciones en especie:</strong> Alimentos, útiles escolares, ropa, herramientas, medicamentos y
                otros insumos que son vitales para mejorar las condiciones de vida de las comunidades que servimos.
              </li>
              <li>
                <strong>Voluntariado:</strong> Tu tiempo y habilidades son igual de valiosos. Al unirte como voluntario,
                puedes participar activamente en nuestras actividades y programas, aportando tu experiencia y energía
                para generar un cambio real.
              </li>
              <li>
                <strong>Difusión y concienciación:</strong> Compartir nuestra misión y proyectos con tu red de contactos
                ayuda a ampliar nuestro alcance y a sumar más personas a esta causa.
              </li>
            </ul>

            <h4 className="text-xl font-semibold mb-2">Beneficios de ser socio:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Impacto tangible:</strong> Verás cómo tu contribución se transforma en acciones concretas que
                mejoran la calidad de vida de las personas.
              </li>
              <li>
                <strong>Transparencia:</strong> Garantizamos un uso responsable y eficiente de los recursos, manteniendo
                a nuestros socios informados sobre el avance de los proyectos.
              </li>
              <li>
                <strong>Comunidad:</strong> Formarás parte de un grupo de personas y organizaciones que comparten tu
                compromiso con el desarrollo sostenible y la justicia social.
              </li>
              <li>
                <strong>Reconocimiento:</strong> Tu apoyo será reconocido en nuestras redes y actividades, destacando tu
                compromiso con la causa.
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </motion.main>
  )
}