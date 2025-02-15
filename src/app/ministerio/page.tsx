"use client";

import { HeroSection } from "./components/hero";
import { VerseSection } from "./components/verse";
import { VideoSection } from "./components/video";
import { EventSection } from "./components/post";
import { ContactSection } from "./components/contact";
import Header from "./components/header";
import Footer from "./components/footer";
import { useEffect, useState } from "react";
import { ref as dbRef, onValue } from "firebase/database"; // Cambia el nombre de `ref` para evitar conflictos
import { db } from "./firebaseConfig"; // Solo necesitamos `db` ahora
import type { Event } from "./types"; // Importa el tipo `Event`

export default function Home() {
  const [verses, setVerses] = useState([]);
  const [videos, setVideos] = useState([]);
  const [events, setEvents] = useState<Event[]>([]); // Define el tipo de `events`

  useEffect(() => {
    const fetchData = async () => {
      // Obtener versículos
      const versesRef = dbRef(db, "verses");
      onValue(versesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setVerses(Object.values(data));
        }
      });

      // Obtener videos
      const videosRef = dbRef(db, "videos");
      onValue(videosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setVideos(Object.values(data));
        }
      });

      // Obtener eventos
      const eventsRef = dbRef(db, "events");
      onValue(eventsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const eventsArray = Object.values(data) as Event[]; // Asegura que `data` sea del tipo `Event[]`
          setEvents(eventsArray);
        }
      });
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <VerseSection verses={verses} />
        <VideoSection videos={videos} />
        <EventSection events={events} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}