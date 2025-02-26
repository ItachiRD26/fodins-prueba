"use client"

import { useEffect, useState } from "react"
import { ref, onValue, off } from "firebase/database"
import { db } from "../firebaseConfig"
import type { Sermon } from "../types"
import { useRouter } from "next/navigation"
import { getCookie, setCookie } from "cookies-next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="outline"
          className="mb-6 bg-white hover:bg-gray-100"
          onClick={() => router.push("/ministerio")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Volver a Ministerio
        </Button>

        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Sermones</h1>

        {loading ? (
          Array(3)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="mb-8 bg-white shadow-sm">
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
            <Card key={sermon.id} className="mb-8 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800">{sermon.titulo}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-8">
                {sermon.imagenUrl && (
                  <div className="w-full h-[400px] relative rounded-lg overflow-hidden">
                    <Image
                      src={sermon.imagenUrl}
                      alt={sermon.titulo}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Contenido del sermón */}
                <div>
                  <div dangerouslySetInnerHTML={{ __html: sermon.contenido }} />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="mb-8 bg-white shadow-sm">
            <CardContent className="text-center py-8">
              <p className="text-xl text-gray-600">No hay sermones disponibles en este momento.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}