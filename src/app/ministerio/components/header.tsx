"use client"

import Image from "next/image"

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
      </div>
    </header>
  );
}