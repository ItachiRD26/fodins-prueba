"use client";

import { useFetchData } from "./hooks/useFetchData";
import EventImage from "./components/eventimage";
import { Card, CardContent } from "./components/ui/card";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

export default function MinisterioPage() {
  const { events } = useFetchData();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Eventos Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Próximos Eventos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-0">
                    <EventImage src={event.imageUrl} />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}