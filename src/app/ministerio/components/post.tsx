import { Event } from "../types";
import Image from "next/image";
import { useState } from "react";

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
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-blue-200 hover:shadow-2xl transition duration-300 transform hover:scale-105">
      {imageError || !event.imageUrl ? (
        <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-lg">
          <p className="text-gray-500">Error al cargar la imagen</p>
        </div>
      ) : (
        <Image
          src={event.imageUrl}
          alt={event.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover rounded-lg"
          onError={() => setImageError(true)} // Maneja errores de carga
        />
      )}
      <h3 className="text-2xl font-bold mt-4">{event.title}</h3>
      <p className="text-gray-800 mt-2">{event.description}</p>
    </div>
  );
};