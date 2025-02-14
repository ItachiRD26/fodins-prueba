import { Verse } from "../types";

interface VerseSectionProps {
  verses: Verse[];
}

export function VerseSection({ verses }: VerseSectionProps) {
  return (
    <section id="versiculos" className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">Versículos Inspiradores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {verses.map((verse, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg border border-blue-200 hover:shadow-2xl transition duration-300 transform hover:scale-105"
            >
              <p className="text-gray-800 italic text-xl mb-6">{verse.text}</p>
              <p className="text-blue-700 font-semibold text-lg">- {verse.reference}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}