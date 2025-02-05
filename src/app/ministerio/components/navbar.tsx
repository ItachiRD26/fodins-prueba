// components/Navbar.tsx
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Ministerio</h1>
      <ul className="flex gap-4">
        <li><Link href="/ministerio">Inicio</Link></li>
        <li><Link href="/ministerio/admin">Admin</Link></li>
      </ul>
    </nav>
  );
}