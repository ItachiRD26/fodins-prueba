"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Facebook, Instagram, Mail, ChevronDown, Youtube} from "lucide-react";
import Image from "next/image";

const navItems = [
  {
    name: "CONÓCENOS",
    href: "", // Este no tiene un href válido, pero tiene subitems
    subitems: [{ name: "Quiénes somos", href: "/conocenos/quienes-somos" }],
  },
  { name: "PROYECTOS", href: "/proyectos" }, // Tiene un href válido
  {
    name: "COLABORA",
    href: "", // Este no tiene un href válido, pero tiene subitems
    subitems: [
      { name: "Hazte socio", href: "/colabora/hazte-socio" },
      { name: "Donaciones", href: "/colabora/donaciones" },
      { name: "Voluntariado", href: "/colabora/voluntariado " },
    ],
  },
  { name: "CAMPAÑA", href: "/campana" }, // Tiene un href válido
  { name: "BLOG", href: "/blog" }, // Tiene un href válido
  { name: "MINISTERIO", href: "/ministerio"}, // Tiene un href válido
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/fundacionfodins" },
  { icon: Instagram, href: "https://www.instagram.com/fodinsdesarrollo/" },
  { icon: Youtube, href: "https://www.youtube.com/@fundacionfodins7948" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");
  const pathname = usePathname();

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setActiveDropdown("");
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleNavItemClick = useCallback(
    (href: string) => {
      if (href) {
        closeMobileMenu();
      }
    },
    [closeMobileMenu]
  );

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="bg-gray-100 py-2 md:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between md:h-10">
            <div className="flex justify-center md:justify-start space-x-4 mb-2 md:mb-0">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="flex justify-center md:justify-end items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <a href="mailto:contact@fundacion.org" className="text-sm text-gray-500 hover:text-gray-700">
                fundacion@fodins.org
              </a>
            </div>
          </div>
        </div>
      </div>
      <nav className="shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={100}
                  height={56}
                  className="h-14 w-auto"
                />
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:justify-between md:flex-1 ml-40 font-extrabold">
              <div className="flex space-x-8">
                {navItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium group-hover:border-primary ${
                        pathname === item.href
                          ? "border-primary text-gray-900"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {item.name}
                      {item.subitems && <ChevronDown className="ml-1 h-4 w-4" />}
                    </Link>
                    {item.subitems && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="py-1">
                          {item.subitems.map((subitem) => (
                            <Link
                              key={subitem.name}
                              href={subitem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {subitem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <Button className="text-white bg-blue-500 hover:bg-blue-900" asChild>
                  <Link href="/colabora/hazte-socio">HAZTE SOCIO</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.subitems ? (
                    // Elemento con subitems
                    <>
                      <button
                        onClick={() => {
                          setActiveDropdown(activeDropdown === item.name ? "" : item.name);
                        }}
                        className={`w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                          pathname === item.href
                            ? "bg-primary-50 border-primary text-primary"
                            : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        {item.name}
                        <ChevronDown
                          className={`ml-1 h-4 w-4 inline transition-transform duration-200 ${
                            activeDropdown === item.name ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="pl-6 space-y-1">
                          {item.subitems.map((subitem) => (
                            <Link
                              key={subitem.name}
                              href={subitem.href}
                              className="block py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                              onClick={closeMobileMenu}
                            >
                              {subitem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    // Elemento sin subitems (enlace directo)
                    <Link
                      href={item.href}
                      className={`w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                        pathname === item.href
                          ? "bg-primary-50 border-primary text-primary"
                          : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t text-white bg-blue-500 border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Button asChild>
                    <Link href="/colabora/hazte-socio" className="w-full">
                      HAZTE SOCIO
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}