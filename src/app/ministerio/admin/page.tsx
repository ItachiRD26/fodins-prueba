"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref, set, push } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../firebaseConfig";
import { getVerse } from "../utils/bibleUtils";
import bibleIndex from "../data/biblia/index.json";

export default function AdminPanel() {
  const [newVerseText, setNewVerseText] = useState("");
  const [newVerseReference, setNewVerseReference] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventImage, setNewEventImage] = useState<File | null>(null);
  const [searchBook, setSearchBook] = useState("Génesis");
  const [searchChapter, setSearchChapter] = useState("");
  const [searchVerse, setSearchVerse] = useState("");
  const [versePreview, setVersePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Mensaje de éxito
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.uid === "eJLs6IzcKmUbkWGYJkrAMYcHTgN2") {
        console.log("Usuario autenticado y autorizado:", user.uid);
      } else {
        console.log("Usuario no autenticado o no autorizado");
        router.push("/ministerio/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Función para mostrar un mensaje de éxito
  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 5000); // Ocultar después de 5 segundos
  };

  // Función para mostrar un mensaje de error
  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 5000); // Ocultar después de 5 segundos
  };

  const handleAddVerse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newVerseText || !newVerseReference) {
      showErrorMessage("Por favor, complete el texto y la referencia del versículo");
      return;
    }
    try {
      const verseRef = ref(db, "verses");
      const newVerseRef = push(verseRef);
      await set(newVerseRef, {
        text: newVerseText,
        reference: newVerseReference,
      });
      showSuccessMessage("Versículo agregado correctamente");
      setNewVerseText("");
      setNewVerseReference("");
    } catch (error) {
      console.error("Error agregando versículo:", error);
      showErrorMessage("Hubo un error al agregar el versículo");
    }
  };

  const handleAddVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newVideoUrl || !newVideoTitle) {
      showErrorMessage("Por favor, complete la URL y el título del video");
      return;
    }
    try {
      const videoRef = ref(db, "videos");
      const newVideoRef = push(videoRef);
      await set(newVideoRef, {
        url: newVideoUrl,
        title: newVideoTitle,
      });
      showSuccessMessage("Video agregado correctamente");
      setNewVideoUrl("");
      setNewVideoTitle("");
    } catch (error) {
      console.error("Error agregando video:", error);
      showErrorMessage("Hubo un error al agregar el video");
    }
  };

  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDescription || !newEventImage) {
      showErrorMessage("Por favor, complete todos los campos del evento");
      return;
    }

    setUploading(true);

    try {
      // Subir la imagen a Firebase Storage
      const imageRef = storageRef(storage, `event-images/${newEventImage.name}`);
      await uploadBytes(imageRef, newEventImage);

      // Obtener la URL de la imagen subida
      const imageUrl = await getDownloadURL(imageRef);

      // Guardar el evento en Realtime Database con la URL de la imagen
      const eventRef = ref(db, "events");
      const newEventRef = push(eventRef);
      await set(newEventRef, {
        title: newEventTitle,
        description: newEventDescription,
        imageUrl: imageUrl,
      });

      showSuccessMessage("Evento agregado correctamente");
      setNewEventTitle("");
      setNewEventDescription("");
      setNewEventImage(null);
    } catch (error) {
      console.error("Error agregando evento:", error);
      showErrorMessage("Hubo un error al agregar el evento");
    } finally {
      setUploading(false);
    }
  };

  const searchBibleVerse = () => {
    console.log("Buscando versículo:", { searchBook, searchChapter, searchVerse });
    const verseText = getVerse(searchBook, searchChapter, searchVerse);
    if (verseText) {
      setVersePreview(verseText);
    } else {
      showErrorMessage("No se encontró el versículo");
    }
  };

  const handleAddVerseFromSearch = async () => {
    if (!versePreview) {
      showErrorMessage("Por favor, busque un versículo antes de agregarlo");
      return;
    }
    try {
      const verseRef = ref(db, "verses");
      const newVerseRef = push(verseRef);
      await set(newVerseRef, {
        text: versePreview,
        reference: `${searchBook} ${searchChapter}:${searchVerse}`,
      });
      showSuccessMessage("Versículo agregado correctamente");
      setVersePreview(null);
      setSearchBook("Génesis");
      setSearchChapter("");
      setSearchVerse("");
    } catch (error) {
      console.error("Error agregando versículo:", error);
      showErrorMessage("Hubo un error al agregar el versículo");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Panel de Administración</h1>
      <button
        onClick={() => signOut(auth).then(() => router.push("/ministerio/login"))}
        className="bg-red-500 text-white px-4 py-2 rounded block mx-auto mb-4"
      >
        Cerrar Sesión
      </button>

      {/* Notificaciones de éxito y error */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg">
          {errorMessage}
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* Formulario para buscar y agregar versículos */}
        <h2 className="text-2xl font-bold mb-4">Buscar y Agregar Versículo</h2>
        <div className="flex space-x-2 mb-4">
          <select
            className="border p-2 rounded w-1/3"
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
            className="border p-2 rounded w-1/3"
            value={searchChapter}
            onChange={(e) => setSearchChapter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Versículo"
            className="border p-2 rounded w-1/3"
            value={searchVerse}
            onChange={(e) => setSearchVerse(e.target.value)}
          />
        </div>
        <button
          onClick={searchBibleVerse}
          className="bg-green-500 text-white py-2 px-4 rounded block w-full mb-4"
        >
          Buscar Versículo
        </button>

        {/* Preview del versículo */}
        {versePreview && (
          <div className="bg-white p-4 rounded-lg shadow-lg border border-blue-200 mb-4">
            <p className="text-gray-800 italic text-xl mb-4">{versePreview}</p>
            <p className="text-blue-700 font-semibold text-lg">
              - {searchBook} {searchChapter}:{searchVerse}
            </p>
            <button
              onClick={handleAddVerseFromSearch}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            >
              Agregar Versículo
            </button>
          </div>
        )}

        {/* Formulario para agregar versículos manualmente */}
        <h2 className="text-2xl font-bold mt-8 mb-4">Agregar Versículo Manualmente</h2>
        <form onSubmit={handleAddVerse} className="flex flex-col space-y-4">
          <textarea
            placeholder="Texto del versículo"
            className="border p-2 rounded"
            value={newVerseText}
            onChange={(e) => setNewVerseText(e.target.value)}
          />
          <input
            type="text"
            placeholder="Referencia (Ej: Juan 3:16)"
            className="border p-2 rounded"
            value={newVerseReference}
            onChange={(e) => setNewVerseReference(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Agregar Versículo
          </button>
        </form>

        {/* Formulario para agregar videos */}
        <h2 className="text-2xl font-bold mt-8 mb-4">Agregar Video</h2>
        <form onSubmit={handleAddVideo} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Título del video"
            className="border p-2 rounded"
            value={newVideoTitle}
            onChange={(e) => setNewVideoTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="URL del video de YouTube"
            className="border p-2 rounded"
            value={newVideoUrl}
            onChange={(e) => setNewVideoUrl(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Agregar Video
          </button>
        </form>

        {/* Formulario para agregar eventos */}
        <h2 className="text-2xl font-bold mt-8 mb-4">Agregar Evento</h2>
        <form onSubmit={handleAddEvent} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Título del evento"
            className="border p-2 rounded"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
          />
          <textarea
            placeholder="Descripción del evento"
            className="border p-2 rounded"
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setNewEventImage(e.target.files[0]);
              }
            }}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={uploading}
          >
            {uploading ? "Subiendo..." : "Agregar Evento"}
          </button>
        </form>
      </div>
    </div>
  );
}