import "../globals.css";
import { Inter } from "next/font/google";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ministerio Nueva Vida",
  description: "Espacio de fe, amor y comunidad",
};

export default function MinisterioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      {/* Aquí puedes agregar un header o navbar específico para el ministerio */}
      {children}
    </div>
  );
}