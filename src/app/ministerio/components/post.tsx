import { Event } from "../types";
import Image from "next/image";
import { useState } from "react";

interface EventSectionProps {
  events: Event[];
}

export function EventSection({ events }: EventSectionProps) {
  return (
    <section id="events" className="py-12 md:py-16 bg-gradient-to-r from-blue-50 to-blue-100 w-full">
      <div className="px-4 w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 md:mb-12 text-center">Próximos Eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl mx-auto">
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
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-blue-200 hover:shadow-2xl transition duration-300 transform hover:scale-105">
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
          onError={() => setImageError(true)}
        />
      )}
      <h3 className="text-xl md:text-2xl font-bold mt-4">{event.title}</h3>
      <p className="text-gray-800 mt-2">{event.description}</p>
    </div>
  );
};