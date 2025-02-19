"use client"

import { useEffect, useState } from "react"
import { ref, onValue, off } from "firebase/database"
import { db } from "../firebaseConfig"
import type { Sermon } from "../types"
import { useRouter } from "next/navigation"
import { getCookie, setCookie } from "cookies-next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronLeft } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

export default function Sermones() {
  const [sermones, setSermones] = useState<Sermon[]>([])
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cachedSermones = getCookie("sermones")
    if (cachedSermones) {
      setSermones(JSON.parse(cachedSermones as string))
    }

    const sermonesRef = ref(db, "sermones")
    const listener = onValue(sermonesRef, (snapshot) => {
      const data = snapshot.val()

      if (data) {
        const sermonesArray = Object.entries(data).map(([id, sermon]) => ({
          id,
          ...(sermon as Sermon),
        }))

        setSermones(sermonesArray)
        setCookie("sermones", JSON.stringify(sermonesArray), { maxAge: 3600 })
      } else {
        setSermones([])
        setCookie("sermones", JSON.stringify([]), { maxAge: 3600 })
      }
      setLoading(false)
    })

    return () => {
      off(sermonesRef, "value", listener)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" className="mb-6" onClick={() => router.push("/ministerio")}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Volver a Ministerio
        </Button>
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Sermones</h1>
        {loading ? (
          Array(3)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="mb-8 bg-white shadow-lg">
                <CardHeader>
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="w-full h-64 mb-6" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))
        ) : sermones.length > 0 ? (
          sermones.map((sermon) => (
            <Card key={sermon.id} className="mb-8 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{sermon.titulo}</CardTitle>
                <CardDescription>{sermon.descripcion}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full aspect-video mb-6">
                  <iframe
                    src={`https://www.youtube.com/embed/${sermon.youtubeLink.split("v=")[1]}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>

                {sermon.imagenUrl && (
                  <div className="w-full h-[400px] mb-6">
                    <Image
                    src={sermon.imagenUrl || "/placeholder.svg"}
                    alt={sermon.titulo}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  </div>
                )}

                <Accordion type="single" collapsible className="w-full">
                  {sermon.subtemas.map((subtema, index) => (
                    <AccordionItem key={index} value={`subtema-${index}`}>
                      <AccordionTrigger>{subtema.titulo}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">{subtema.contenido}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
              <CardFooter>
                <div className="w-full">
                  <h3 className="text-xl font-semibold mb-2">Preguntas para reflexionar:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {sermon.preguntasReflexion.map((pregunta, index) => (
                      <li key={index} className="text-gray-700">
                        {pregunta}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Card className="mb-8 bg-white shadow-lg">
            <CardContent className="text-center py-8">
              <p className="text-xl text-gray-600">No hay sermones disponibles en este momento.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

