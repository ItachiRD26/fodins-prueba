"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { ref, set, push, remove, onValue, type DataSnapshot } from "firebase/database"
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage, auth } from "../firebaseConfig"
import { getVerse } from "../utils/bibleUtils"
import bibleIndex from "../data/biblia/index.json"
import type { Sermon, Event, Video, Verse } from "../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import mammoth from "mammoth"

export default function AdminPanel() {
  const [newVerseText, setNewVerseText] = useState("")
  const [newVerseReference, setNewVerseReference] = useState("")
  const [newVideoUrl, setNewVideoUrl] = useState("")
  const [newVideoTitle, setNewVideoTitle] = useState("")
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventDescription, setNewEventDescription] = useState("")
  const [newEventImage, setNewEventImage] = useState<File | null>(null)
  const [searchBook, setSearchBook] = useState("Génesis")
  const [searchChapter, setSearchChapter] = useState("")
  const [searchVerse, setSearchVerse] = useState("")
  const [versePreview, setVersePreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [titulo, setTitulo] = useState("")
  const [contenido, setContenido] = useState("")
  const [sermonImage, setSermonImage] = useState<File | null>(null)
  const [sermonWordFile, setSermonWordFile] = useState<File | null>(null)
  const [verses, setVerses] = useState<Verse[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [sermones, setSermones] = useState<Sermon[]>([])
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid === "eJLs6IzcKmUbkWGYJkrAMYcHTgN2") {
        console.log("Usuario autenticado y autorizado:", user.uid)
        loadVerses()
        loadVideos()
        loadEvents()
        loadSermones()
      } else {
        console.log("Usuario no autenticado o no autorizado")
        router.push("/ministerio/login")
      }
    })

    return () => unsubscribe()
  }, [router])

  const loadVerses = () => {
    const versesRef = ref(db, "verses")
    onValue(versesRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val()
      if (data) {
        setVerses(Object.entries(data).map(([id, verse]) => ({ id, ...(verse as Verse) })))
      } else {
        setVerses([])
      }
    })
  }

  const loadVideos = () => {
    const videosRef = ref(db, "videos")
    onValue(videosRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val()
      if (data) {
        setVideos(Object.entries(data).map(([id, video]) => ({ id, ...(video as Video) })))
      } else {
        setVideos([])
      }
    })
  }

  const loadEvents = () => {
    const eventsRef = ref(db, "events")
    onValue(eventsRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val()
      if (data) {
        setEvents(Object.entries(data).map(([id, event]) => ({ id, ...(event as Event) })))
      } else {
        setEvents([])
      }
    })
  }

  const loadSermones = () => {
    const sermonesRef = ref(db, "sermones")
    onValue(sermonesRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val()
      if (data) {
        setSermones(Object.entries(data).map(([id, sermon]) => ({ id, ...(sermon as Sermon) })))
      } else {
        setSermones([])
      }
    })
  }

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message)
    setTimeout(() => setSuccessMessage(""), 5000)
  }

  const showErrorMessage = (message: string) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(""), 5000)
  }

  const handleAddVerse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newVerseText || !newVerseReference) {
      showErrorMessage("Por favor, complete el texto y la referencia del versículo")
      return
    }
    try {
      const verseRef = ref(db, "verses")
      const newVerseRef = push(verseRef)
      await set(newVerseRef, {
        text: newVerseText,
        reference: newVerseReference,
      })
      showSuccessMessage("Versículo agregado correctamente")
      setNewVerseText("")
      setNewVerseReference("")
    } catch (error) {
      console.error("Error agregando versículo:", error)
      showErrorMessage("Hubo un error al agregar el versículo")
    }
  }

  const handleDeleteVerse = async (id: string) => {
    try {
      const verseRef = ref(db, `verses/${id}`)
      await remove(verseRef)
      showSuccessMessage("Versículo eliminado correctamente")
    } catch (error) {
      console.error("Error eliminando versículo:", error)
      showErrorMessage("Hubo un error al eliminar el versículo")
    }
  }

  const handleAddVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newVideoUrl || !newVideoTitle) {
      showErrorMessage("Por favor, complete la URL y el título del video")
      return
    }
    try {
      const videoRef = ref(db, "videos")
      const newVideoRef = push(videoRef)
      await set(newVideoRef, {
        url: newVideoUrl,
        title: newVideoTitle,
      })
      showSuccessMessage("Video agregado correctamente")
      setNewVideoUrl("")
      setNewVideoTitle("")
    } catch (error) {
      console.error("Error agregando video:", error)
      showErrorMessage("Hubo un error al agregar el video")
    }
  }

  const handleDeleteVideo = async (id: string) => {
    try {
      const videoRef = ref(db, `videos/${id}`)
      await remove(videoRef)
      showSuccessMessage("Video eliminado correctamente")
    } catch (error) {
      console.error("Error eliminando video:", error)
      showErrorMessage("Hubo un error al eliminar el video")
    }
  }

  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newEventTitle || !newEventDescription || !newEventImage) {
      showErrorMessage("Por favor, complete todos los campos del evento")
      return
    }

    setUploading(true)

    try {
      const imageRef = storageRef(storage, `event-images/${newEventImage.name}`)
      await uploadBytes(imageRef, newEventImage)
      const imageUrl = await getDownloadURL(imageRef)

      const eventRef = ref(db, "events")
      const newEventRef = push(eventRef)
      await set(newEventRef, {
        title: newEventTitle,
        description: newEventDescription,
        imageUrl: imageUrl,
      })

      showSuccessMessage("Evento agregado correctamente")
      setNewEventTitle("")
      setNewEventDescription("")
      setNewEventImage(null)
    } catch (error) {
      console.error("Error agregando evento:", error)
      showErrorMessage("Hubo un error al agregar el evento")
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteEvent = async (id: string, imageUrl: string) => {
    try {
      const imageRef = storageRef(storage, imageUrl)
      await deleteObject(imageRef)

      const eventRef = ref(db, `events/${id}`)
      await remove(eventRef)

      showSuccessMessage("Evento eliminado correctamente")
    } catch (error) {
      console.error("Error eliminando evento:", error)
      showErrorMessage("Hubo un error al eliminar el evento")
    }
  }

  const searchBibleVerse = () => {
    const verseText = getVerse(searchBook, searchChapter, searchVerse)
    if (verseText) {
      setVersePreview(verseText)
    } else {
      showErrorMessage("No se encontró el versículo")
    }
  }

  const handleAddVerseFromSearch = async () => {
    if (!versePreview) {
      showErrorMessage("Por favor, busque un versículo antes de agregarlo")
      return
    }
    try {
      const verseRef = ref(db, "verses")
      const newVerseRef = push(verseRef)
      await set(newVerseRef, {
        text: versePreview,
        reference: `${searchBook} ${searchChapter}:${searchVerse}`,
      })
      showSuccessMessage("Versículo agregado correctamente")
      setVersePreview(null)
      setSearchBook("Génesis")
      setSearchChapter("")
      setSearchVerse("")
    } catch (error) {
      console.error("Error agregando versículo:", error)
      showErrorMessage("Hubo un error al agregar el versículo")
    }
  }

  const handleAddSermon = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!titulo || !contenido) {
      showErrorMessage("Por favor, complete todos los campos del sermón.")
      return
    }

    setUploading(true)

    try {
      let imagenUrl = ""
      if (sermonImage) {
        const imageRef = storageRef(storage, `sermon-images/${sermonImage.name}`)
        await uploadBytes(imageRef, sermonImage)
        imagenUrl = await getDownloadURL(imageRef)
      }

      const sermonesRef = ref(db, "sermones")
      const newSermonRef = push(sermonesRef)
      const newSermon: Sermon = {
        titulo,
        contenido,
        imagenUrl,
      }
      await set(newSermonRef, newSermon)

      showSuccessMessage("Sermón agregado correctamente.")
      setTitulo("")
      setContenido("")
      setSermonImage(null)
      setSermonWordFile(null)
    } catch (error) {
      console.error("Error agregando sermón:", error)
      showErrorMessage("Hubo un error al agregar el sermón.")
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteSermon = async (id: string, imagenUrl?: string) => {
    try {
      if (imagenUrl) {
        const imageRef = storageRef(storage, imagenUrl)
        await deleteObject(imageRef)
      }

      const sermonRef = ref(db, `sermones/${id}`)
      await remove(sermonRef)

      showSuccessMessage("Sermón eliminado correctamente.")
    } catch (error) {
      console.error("Error eliminando sermón:", error)
      showErrorMessage("Hubo un error al eliminar el sermón.")
    }
  }

  const handleWordFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSermonWordFile(file)
  
      // Leer el archivo Word y extraer el contenido en HTML
      const arrayBuffer = await file.arrayBuffer()
      const result = await mammoth.convertToHtml({ arrayBuffer })
  
      if (result.value) {
        // Agregar estilos en línea al HTML generado
        const styledContent = `
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            h1, h2, h3, h4, h5, h6 {
              font-family: 'Times New Roman', serif;
              font-weight: bold;
              margin-top: 1.5rem;
              margin-bottom: 1rem;
            }
            p {
              margin-bottom: 1.5rem;
            }
            ul, ol {
              margin-bottom: 1.5rem;
              padding-left: 1.5rem;
            }
            li {
              margin-bottom: 0.5rem;
            }
            strong, b {
              font-family: 'Times New Roman', serif;
              font-weight: bold;
            }
            a {
              color: #2563eb;
              text-decoration: underline;
            }
            blockquote {
              margin-top: 1.5rem;
              margin-bottom: 1.5rem;
              padding-left: 1rem;
              border-left: 4px solid #ddd;
              color: #666;
            }
          </style>
          ${result.value}
        `
        setContenido(styledContent) // Guardar el HTML con estilos en línea
      } else {
        showErrorMessage("No se pudo extraer el contenido del archivo Word.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Panel de Administración</h1>
      <Button
        onClick={() => signOut(auth).then(() => router.push("/ministerio/login"))}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded block mx-auto mb-8"
      >
        Cerrar Sesión
      </Button>

      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">{errorMessage}</div>
      )}

      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Buscar y Agregar Versículo</h2>
        <div className="flex space-x-2 mb-4">
          <select
            className="border p-2 rounded w-1/3 bg-white text-black"
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
          >
            {bibleIndex.map((book) => (
              <option key={book.shortTitle} value={book.shortTitle}>
                {book.shortTitle}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Capítulo"
            className="border p-2 rounded w-1/3 bg-white text-black"
            value={searchChapter}
            onChange={(e) => setSearchChapter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Versículo"
            className="border p-2 rounded w-1/3 bg-white text-black"
            value={searchVerse}
            onChange={(e) => setSearchVerse(e.target.value)}
          />
        </div>
        <Button
          onClick={searchBibleVerse}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded block w-full mb-4"
        >
          Buscar Versículo
        </Button>

        {versePreview && (
          <Card>
            <CardContent>
              <p className="text-gray-800 italic text-xl mb-4">{versePreview}</p>
              <p className="text-blue-700 font-semibold text-lg">
                - {searchBook} {searchChapter}:{searchVerse}
              </p>
              <Button
                onClick={handleAddVerseFromSearch}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
              >
                Agregar Versículo
              </Button>
            </CardContent>
          </Card>
        )}

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Agregar Versículo Manualmente</h2>
        <form onSubmit={handleAddVerse} className="flex flex-col space-y-4">
          <Textarea
            placeholder="Texto del versículo"
            className="border p-2 rounded bg-white text-black"
            value={newVerseText}
            onChange={(e) => setNewVerseText(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Referencia (Ej: Juan 3:16)"
            className="border p-2 rounded bg-white text-black"
            value={newVerseReference}
            onChange={(e) => setNewVerseReference(e.target.value)}
          />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Agregar Versículo
          </Button>
        </form>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Versículos</h2>
        {verses.map((verse) => (
          <Card key={verse.id} className="mb-4">
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="text-lg font-semibold">{verse.reference}</p>
                <p className="text-gray-700">{verse.text}</p>
              </div>
              <Button variant="destructive" onClick={() => handleDeleteVerse(verse.id!)}>
                Eliminar
              </Button>
            </CardContent>
          </Card>
        ))}

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Agregar Video</h2>
        <form onSubmit={handleAddVideo} className="flex flex-col space-y-4">
          <Input
            type="text"
            placeholder="Título del video"
            className="border p-2 rounded bg-white text-black"
            value={newVideoTitle}
            onChange={(e) => setNewVideoTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="URL del video de YouTube"
            className="border p-2 rounded bg-white text-black"
            value={newVideoUrl}
            onChange={(e) => setNewVideoUrl(e.target.value)}
          />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Agregar Video
          </Button>
        </form>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Videos</h2>
        {videos.map((video) => (
          <Card key={video.id} className="mb-4">
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="text-lg font-semibold">{video.title}</p>
                <p className="text-gray-700">{video.url}</p>
              </div>
              <Button variant="destructive" onClick={() => handleDeleteVideo(video.id!)}>
                Eliminar
              </Button>
            </CardContent>
          </Card>
        ))}

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Agregar Evento</h2>
        <form onSubmit={handleAddEvent} className="flex flex-col space-y-4">
          <Input
            type="text"
            placeholder="Título del evento"
            className="border p-2 rounded bg-white text-black"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
          />
          <Textarea
            placeholder="Descripción del evento"
            className="border p-2 rounded bg-white text-black"
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
          />
          <Input
            type="file"
            accept="image/*"
            className="border p-2 rounded bg-white text-black"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setNewEventImage(e.target.files[0])
              }
            }}
          />
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            disabled={uploading}
          >
            {uploading ? "Subiendo..." : "Agregar Evento"}
          </Button>
        </form>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Eventos</h2>
        {events.map((event) => (
          <Card key={event.id} className="mb-4">
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="text-lg font-semibold">{event.title}</p>
                <p className="text-gray-700">{event.description}</p>
              </div>
              <Button variant="destructive" onClick={() => handleDeleteEvent(event.id!, event.imageUrl)}>
                Eliminar
              </Button>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Agregar Sermón</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSermon} className="space-y-4">
              <Input
                type="text"
                placeholder="Título del sermón"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <div>
                <h3 className="text-xl font-semibold mb-2">Subir Documento Word:</h3>
                <Input
                  type="file"
                  accept=".docx"
                  onChange={handleWordFileUpload}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Imagen del sermón:</h3>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSermonImage(e.target.files[0])
                    }
                  }}
                />
              </div>
              <Button className="text-white bg-blue-500" type="submit" disabled={uploading}>
                {uploading ? "Subiendo..." : "Agregar Sermón"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Sermones</h2>
        {sermones.map((sermon) => (
          <Card key={sermon.id} className="mb-4">
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="text-lg font-semibold">{sermon.titulo}</p>
              </div>
              <Button variant="destructive" onClick={() => handleDeleteSermon(sermon.id!, sermon.imagenUrl)}>
                Eliminar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}