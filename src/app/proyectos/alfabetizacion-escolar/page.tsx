import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProyectoPage() {
  // En una aplicación real, obtendrías estos datos de una API o base de datos
  const proyecto = {
    titulo: "Alfabetización Escolar",
    descripcion:
      "Nuestro programa de Alfabetización Escolar busca erradicar el analfabetismo en comunidades vulnerables, proporcionando educación básica de calidad a niños y adultos. Utilizamos métodos pedagógicos innovadores y tecnología educativa para maximizar el impacto y la retención del aprendizaje.",
    imagenUrl: "/fondis21.jpg",
    categorias: ["Educación", "Alfabetización", "Desarrollo Comunitario"],
    anioInicio: 2018,
    impacto:
      "Hemos alfabetizado a más de 5,000 personas en 20 comunidades, aumentando las tasas de alfabetización en un 40% en las áreas atendidas.",
    duracion: "2018-Presente",
    ubicacion: "Diversas comunidades rurales y urbanas marginadas en la región central del país",
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

