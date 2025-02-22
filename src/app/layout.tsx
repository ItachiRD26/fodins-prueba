import type { Metadata } from "next"
import "./globals.css"
import { inter, roboto_mono } from "./fonts"
import RootLayoutClient from "./layout.client" // Importa el Client Component

export const metadata: Metadata = {
  title: "FODINS",
  description:
    "Fodins es una fundación comprometida con el desarrollo social, brindando oportunidades y apoyo a quienes más lo necesitan. Juntos, construimos un futuro mejor.",
    keywords: ["fundación", "desarrollo social", "fondins republica dominicana", "oportunidades", "fodins", "educación", "salud"],
  icons: {
    icon: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`h-full ${inter.variable} ${roboto_mono.variable}`}>
      <body className="flex flex-col min-h-full font-sans">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}