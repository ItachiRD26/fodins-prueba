"use client"

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion} from "framer-motion"

interface Project {
  id: number
  title: string
  description: string
  imageUrl: string
  categories: string[]
  year: number
  slug: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Alfabetización sobre edad escolar",
    description:
      "Programa educativo diseñado para mejorar las habilidades de lectura y escritura de niños en edad escolar. Este proyecto ha beneficiado a más de 500 estudiantes, mejorando significativamente sus oportunidades educativas y su rendimiento académico.",
    imageUrl: "/proyecto1.jpg",
    categories: ["Educación", "Desarrollo Infantil"],
    year: 2021,
    slug: "alfabetizacion-escolar",
  },
  {
    id: 2,
    title: "Orientación sobre el cofito familiar",
    description:
      "Iniciativa de educación financiera para familias, enfocada en la gestión del presupuesto familiar y el ahorro. Este programa ha ayudado a más de 300 familias a mejorar su estabilidad económica y planificación financiera a largo plazo.",
    imageUrl: "/proyecto2.jpg",
    categories: ["Educación Financiera", "Desarrollo Familiar"],
    year: 2018,
    slug: "orientacion-conflicto-familiar",
  },
  {
    id: 3,
    title: "Apadrinado",
    description:
      "Programa de apadrinamiento que conecta a niños y jóvenes con mentores que les brindan apoyo educativo, emocional y financiero. Este proyecto ha beneficiado a más de 100 niños, mejorando sus oportunidades de vida y desarrollo personal.",
    imageUrl: "/proyecto3.jpg",
    categories: ["Desarrollo Infantil", "Educación"],
    year: 2021,
    slug: "apadrinado",
  },
  {
    id: 4,
    title: "Proyecto Deportivo",
    description:
      "Iniciativa que promueve la actividad física y el deporte entre los jóvenes de la comunidad. Este proyecto ha establecido ligas deportivas locales y ha proporcionado equipamiento deportivo, beneficiando a más de 200 jóvenes y fomentando un estilo de vida saludable.",
    imageUrl: "/proyecto4.jpg",
    categories: ["Deporte", "Desarrollo Juvenil"],
    year: 2022,
    slug: "proyecto-deportivo",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function ProyectosPage() {
  return (
    <main className="bg-white">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="relative h-[40vh] min-h-[300px]">
          <Image src="/fondis7.jpg" alt="Proyectos de FODINS" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Nuestros Proyectos</h1>
          </div>
        </div>
      </motion.section>

      <Container className="py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="grid gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="relative h-64 md:h-full">
                        <Image
                          src={project.imageUrl || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-2xl">{project.title}</CardTitle>
                          <Badge variant="secondary">{project.year}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.categories.map((category, index) => (
                            <Badge key={index} variant="outline">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <Link href={`/proyectos/${project.slug}`}>
                          <Button variant="outline">Leer más</Button>
                        </Link>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="bg-primary text-white py-16">
          <Container className="text-center">
            <h2 className="text-3xl font-bold mb-6">Apoya Nuestros Proyectos</h2>
            <p className="mb-8 max-w-2xl mx-auto text-lg">
              Tu contribución puede hacer una gran diferencia en la vida de muchas personas. Ayúdanos a seguir
              transformando vidas y construyendo futuros.
            </p>
            <Link href="/colabora/donaciones">
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold text-white hover:bg-white hover:text-primary transition-colors duration-300"
              >
                Donar Ahora
              </Button>
            </Link>
          </Container>
        </div>
      </motion.section>
    </main>
  )
}