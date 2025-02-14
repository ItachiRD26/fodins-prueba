import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin, Youtube } from "lucide-react";
import Image from "next/image";

// Enlaces personalizables
const links = {
  social: [
    { icon: Facebook, href: "https://www.facebook.com/fundacionfodins" },
    { icon: Instagram, href: "https://www.instagram.com/fodinsdesarrollo/" },
    { icon: Youtube, href: "https://www.youtube.com/@fundacionfodins7948" },
  ],
  about: [
    { label: "Conócenos", href: "/conocenos/quienes-somos" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Blog", href: "/blog" },
  ],
  collaborate: [
    { label: "Hazte Socio", href: "/colabora/hazte-socio" },
    { label: "Voluntariado", href: "/colabora/voluntariado" },
  ],
  resources: [
    { label: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
    { label: "Transparencia", href: "/transparencia" },
  ],
  contact: {
    email: "fundacion@fodins.org",
    phone: "+1-809-713-7029",
    address:
      "C/2da No.9, Urb. Vista Verde, San Felipe, Punta, Villa Mella, Santo Domingo Norte, Santo Domingo",
  },
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          {/* Logo y redes sociales */}
          <div className="space-y-8 xl:col-span-1">
            <Image
              src="/logoblanco.png"
              alt="FONDIS"
              width={80}
              height={80}
              className="h-20 w-auto"
            />
            <p className="text-gray-400 text-sm leading-6">
              Transformando vidas y creando oportunidades para un futuro mejor.
            </p>
            <div className="flex space-x-6">
              {links.social.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.href.split(".com")[0]}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Enlaces de navegación */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Sobre Nosotros */}
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Sobre Nosotros
                </h3>
                <ul role="list" className="space-y-4">
                  {links.about.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Colabora */}
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Colabora
                </h3>
                <ul role="list" className="space-y-4">
                  {links.collaborate.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Recursos */}
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Recursos
                </h3>
                <ul role="list" className="space-y-4">
                  {links.resources.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contacto */}
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Contacto
                </h3>
                <ul role="list" className="space-y-4">
                  <li className="flex">
                    <Mail className="flex-shrink-0 h-6 w-6 text-gray-400 mr-3" aria-hidden="true" />
                    <a
                      href={`mailto:${links.contact.email}`}
                      className="text-base text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {links.contact.email}
                    </a>
                  </li>
                  <li className="flex">
                    <Phone className="flex-shrink-0 h-6 w-6 text-gray-400 mr-3" aria-hidden="true" />
                    <p className="text-base text-gray-400">{links.contact.phone}</p>
                  </li>
                  <li className="flex">
                    <MapPin className="flex-shrink-0 h-6 w-6 text-gray-400 mr-3" aria-hidden="true" />
                    <p className="text-base text-gray-400">{links.contact.address}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex justify-center">
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} Fondis. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}