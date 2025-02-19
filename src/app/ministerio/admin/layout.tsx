import type { Metadata } from "next";
import "../global.css";
import { inter } from "@/app/fonts"; // Importa la fuente Inter

export const metadata: Metadata = {
  title: "Panel Administrativo",
  description: "Panel de administración de FODINS",
  icons: {
    icon: "/logoiglesia.png",
  },
};

export default function PanelAdministrativoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      {/* Aquí puedes agregar un header o navbar específico para el panel administrativo */}
      {children}
    </div>
  );
}