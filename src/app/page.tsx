"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel } from "@/components/ui/carousel"
import { Container } from "@/components/ui/container"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import LoadingScreen from "@/components/loading-screen"
import Link from "next/link";


const slides = [
  {
    title: "Transformando vidas",
    description: "Ayudamos a crear un futuro mejor para las comunidades",
    image: "/fondis3.jpg?height=600&width=1200",
  },
  {
    title: "Proyectos Sostenibles",
    description: "Desarrollamos iniciativas que perduran en el tiempo",
    image: "/fondis2.jpg?height=600&width=1200",
  },
  {
    title: "Impacto Social",
    description: "Creamos cambios positivos en la sociedad",
    image: "/fondis23.jpg?height=600&width=1200",
  },
]

const proyectos = [
  {
    id: 1,
    titulo: "Alfabetización sobre edad escolar",
    descripcion:
      "Programa educativo para enseñar a leer y escribir a niños y adultos que no tuvieron acceso a la educación a tiempo.",
    imagen: "/proyecto1.jpg",
    enlace: "/proyectos/alfabetizacion-escolar",
  },
  {
    id: 2,
    titulo: "Orientación sobre el conflicto familiar",
    descripcion:
      "Iniciativa para ofrecer apoyo psicológico y talleres para resolver conflictos familiares y promover relaciones saludables.",
    imagen: "/proyecto2.jpg",
    enlace: "/proyectos/orientacion-conflicto-familiar",
  },
  {
    id: 3,
    titulo: "Apadrinado",
    descripcion:
      "Proyecto que conecta a familias en situación vulnerable con padrinos que ofrecen apoyo económico y educativo para mejorar sus condiciones de vida.",
    imagen: "/proyecto3.jpg",
    enlace: "/proyectos/apadrinado",
  },
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Carousel slides={slides} />

      <motion.section
        style={{ padding: "3rem 0" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 max-w-4xl mx-auto">
            Nuestra misión está enmarcada en la Educación como piedra angular del desarrollo de los pueblos, trabajando
            unidos para una nueva alternativa comunitaria.
          </h2>
        </Container>
      </motion.section>

      <motion.section
        style={{ padding: "3rem 0", backgroundColor: "#f9fafb" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Nuestros Proyectos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectos.map((proyecto, index) => (
              <motion.div
                key={proyecto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <div className="relative w-full h-48">
                    <Image
                      src={proyecto.imagen || "/placeholder.svg"}
                      alt={proyecto.titulo}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{proyecto.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{proyecto.descripcion}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={proyecto.enlace}>
                        Saber más <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.section>

      <motion.section
        style={{ padding: "3rem 0", backgroundColor: "#3b82f6", color: "#ffffff" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1000+", label: "Beneficiarios" },
              { number: "10+", label: "Proyectos" },
              { number: "20+", label: "Alianzas" },
              { number: "10", label: "Años de experiencia" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.section>

      <motion.section
        style={{ padding: "3rem 0", backgroundColor: "#ffffff" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
<Container>
  <div className="text-center">
    <h2 className="text-2xl md:text-3xl font-bold mb-8">¿Quieres ser parte del cambio?</h2>
    <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600">
      Únete a nosotros y ayuda a crear un impacto positivo en la sociedad
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Link href="/colabora/hazte-socio" passHref>
        <Button className="bg-blue-500 hover:bg-blue-900" size="lg">HAZTE SOCIO</Button>
      </Link>
      <Link href="/conocenos/quienes-somos" passHref>
        <Button variant="outline" size="lg">CONOCE MÁS</Button>
      </Link>
    </div>
  </div>
</Container>
      </motion.section>
    </motion.div>
  )
}

