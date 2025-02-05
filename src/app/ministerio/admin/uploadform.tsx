"use client";

import { useState } from "react";
import { uploadFile, saveEvent } from "../firebase/firebase";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (image) {
        const path = `events/${image.name}`;
        imageUrl = await uploadFile(image, path);
      }

      await saveEvent(title, description, imageUrl, videoUrl);
      alert("Evento guardado exitosamente");

      // Clear form
      setTitle("");
      setDescription("");
      setImage(null);
      setVideoUrl("");
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Error al guardar el evento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Título del evento"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Descripción del evento"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="border p-2 rounded"
      />
      <input
        type="url"
        placeholder="URL del video de YouTube (opcional)"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="border p-2 rounded"
      />
      <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded">
        {loading ? "Subiendo..." : "Subir evento"}
      </button>
    </form>
  );
};

export default UploadForm;