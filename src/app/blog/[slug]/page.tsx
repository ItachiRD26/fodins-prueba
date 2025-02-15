"use client"; // Marca el componente como Client Component

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import Image from "next/image";

export default function BlogPost() {
  const params = useParams(); // Obtiene los parámetros de la URL
  const { slug } = params; // Extrae el slug de los parámetros

  console.log("Slug recibido:", slug); // Depuración: Verifica el slug

  // Busca el post correspondiente en posts.ts
  const post = posts.find((post) => post.slug === slug);

  console.log("Post encontrado:", post); // Depuración: Verifica el post encontrado

  if (!post) {
    console.log("Post no encontrado, mostrando página 404..."); // Depuración: Verifica si el post no existe
    notFound(); // Muestra una página 404 si el post no existe
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-8">
          Por {post.author} | {post.date}
        </div>
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={800}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="prose prose-lg mt-8">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}