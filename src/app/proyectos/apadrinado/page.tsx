import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProyectoPage() {
  // En una aplicación real, obtendrías estos datos de una API o base de datos
  const proyecto = {
    titulo: "Programa de Apadrinamiento",
    descripcion:
      "Nuestro Programa de Apadrinamiento conecta a niños y jóvenes de escasos recursos con padrinos comprometidos que apoyan su educación y desarrollo integral. Este proyecto cubre no solo los costos educativos, sino también proporciona tutoría, apoyo psicológico y oportunidades de desarrollo personal.",
    imagenUrl: "/fondis22.jpg",
    categorias: ["Educación", "Desarrollo Juvenil", "Igualdad de Oportunidades"],
    anioInicio: 2020,
    impacto:
      "Hemos apadrinado a más de 1,000 estudiantes, con una tasa de permanencia escolar del 95% y un 80% de beneficiarios que han mejorado significativamente su rendimiento académico.",
    duracion: "2020-Presente",
    ubicacion: "Red nacional de escuelas en áreas de bajos recursos",
  }
  
  

  return (
    <main className="bg-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/proyectos" className="inline-flex items-center text-primary hover:underline mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Volver a Proyectos
        </Link>

        <div className="space-y-8">
          <div className="relative aspect-video w-full">
            <Image
              src={proyecto.imagenUrl || "/placeholder.svg"}
              alt={proyecto.titulo}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{proyecto.titulo}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {proyecto.categorias.map((categoria, index) => (
                <Badge key={index} variant="secondary">
                  {categoria}
                </Badge>
              ))}
            </div>
            <p className="text-gray-600 mb-6">{proyecto.descripcion}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Año de inicio</h3>
              <p>{proyecto.anioInicio}</p>
            </div>
            <div>
              <h3 className="font-semibold">Impacto</h3>
              <p>{proyecto.impacto}</p>
            </div>
            <div>
              <h3 className="font-semibold">Duración</h3>
              <p>{proyecto.duracion}</p>
            </div>
            <div>
              <h3 className="font-semibold">Ubicación</h3>
              <p>{proyecto.ubicacion}</p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">¿Quieres apoyar este proyecto?</h2>
            <Link href="/colabora/donaciones">
              <Button size="lg" className="font-semibold">
                Donar Ahora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

