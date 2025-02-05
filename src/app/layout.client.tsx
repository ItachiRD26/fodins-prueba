"use client"; // Este sí es un Client Component

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMinisterio = pathname.startsWith("/ministerio");

  return (
    <>
      {!isMinisterio && <Navbar />}
      <main className="flex-grow w-full">{children}</main>
      {!isMinisterio && <Footer />}
    </>
  );
}
