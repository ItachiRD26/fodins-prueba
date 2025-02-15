import { Verse } from "../types";

interface VerseSectionProps {
  verses: Verse[];
}

export function VerseSection({ verses }: VerseSectionProps) {
  return (
    <section id="versiculos" className="py-12 md:py-16 bg-gradient-to-r from-blue-50 to-blue-100 w-full">
      <div className="px-4 w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 md:mb-12 text-center">Versículos Inspiradores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl mx-auto">
          {verses.map((verse, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-blue-200 hover:shadow-2xl transition duration-300 transform hover:scale-105"
            >
              <p className="text-gray-800 italic text-lg md:text-xl mb-4 md:mb-6">{verse.text}</p>
              <p className="text-blue-700 font-semibold text-md md:text-lg">- {verse.reference}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}