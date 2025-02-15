"use client"

import Image from "next/image"
import { FaYoutube } from "react-icons/fa"

export default function Header() {
  return (
    <header className="bg-white shadow-lg py-4 md:py-6">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2 md:space-x-4">
          <Image
            src="/logoiglesia.png"
            alt="Ministerio Nueva Vida Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className="text-xl md:text-3xl font-bold text-blue-900">Ministerio Nueva Vida</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <a
            href="https://www.youtube.com/@nedsantens1415"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 md:space-x-2 text-red-500 hover:text-blue-700"
          >
            <span className="text-xs md:text-sm font-medium">Sintonízanos en YouTube</span>
            <FaYoutube className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        </div>
      </div>
    </header>
  );
}