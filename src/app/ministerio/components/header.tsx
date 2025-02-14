"use client"

import Image from "next/image"
import { FaYoutube } from "react-icons/fa" // Importa el ícono de YouTube

export default function Header() {
  return (
    <header className="bg-white shadow-lg py-6">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="/logoiglesia.png"
            alt="Ministerio Nueva Vida Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
          <h1 className="text-3xl font-bold text-blue-900">Ministerio Nueva Vida</h1>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://www.youtube.com/@nedsantens1415"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-red-500 hover:text-blue-700"
          >
            <span className="text-sm font-medium">Sintonízanos en nuestro canal de YouTube</span>
            <FaYoutube className="w-6 h-6" /> {/* Ícono de YouTube */}
          </a>
        </div>
      </div>
    </header>
  );
}