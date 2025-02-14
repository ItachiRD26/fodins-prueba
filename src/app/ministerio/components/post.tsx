import { Event } from "../types";

interface EventSectionProps {
  events: Event[];
}

export function EventSection({ events }: EventSectionProps) {
  return (
    <section id="events" className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">Próximos Eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-blue-200 hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-2xl font-bold mt-4">{event.title}</h3>
              <p className="text-gray-800 mt-2">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}