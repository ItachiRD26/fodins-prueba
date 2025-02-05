import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const EventList = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData);
    };
    
    fetchEvents();
  }, []);

  return (
    <div className="space-y-4">
      {events.length === 0 ? (
        <p>No hay eventos disponibles</p>
      ) : (
        events.map(event => (
          <div key={event.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p>{event.description}</p>
            {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="w-full h-auto mt-2" />}
            {event.videoUrl && (
              <iframe 
                className="w-full h-60 mt-2"
                src={`https://www.youtube.com/embed/${new URL(event.videoUrl).searchParams.get("v")}`} 
                allowFullScreen 
              ></iframe>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
