import type { Metadata } from "next"
import "../globals.css"
import { inter } from "../fonts" // Importa la fuente Inter

export const metadata: Metadata = {
  title: "Ministerio Nueva Vida",
  description: "Espacio de fe, amor y comunidad",
  icons: {
    icon: "/logoiglesia.png",
  },
}

export default function MinisterioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={inter.className}>
        {/* Aquí puedes agregar un header o navbar específico para el ministerio */}
        {children}
      </body>
    </html>
  )
}