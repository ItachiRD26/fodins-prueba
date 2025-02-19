import Image from "next/image";

export function HeroSection() {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/biblia3.jpg"
          alt="Church Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="transform scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 text-center px-4 w-full">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 drop-shadow-lg animate-fade-in">Bienvenidos al Ministerio Nueva Vida</h2>
        <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto animate-fade-in delay-100">Un espacio de fe, amor y comunidad donde todos son bienvenidos.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in delay-200">
          <a
            href="#contacto"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full text-lg transition duration-300 shadow-lg"
          >
            Únete a Nosotros
          </a>
          <a
            href="/ministerio/sermones"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full text-lg transition duration-300 shadow-lg"
          >
            Explora Más
          </a>
        </div>
      </div>
    </section>
  );
}