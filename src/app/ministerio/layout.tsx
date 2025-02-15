import type { Metadata } from "next"
import "../globals.css"
import { inter } from "../fonts"

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
    <>
      <div className={inter.className}>
        {children}
      </div>
    </>
  )
}
