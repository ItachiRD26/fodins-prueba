"use client";

import { HeroSection } from "./components/hero";
import { VerseSection } from "./components/verse";
import { VideoSection } from "./components/video";
import { EventSection } from "./components/post";
import { ContactSection } from "./components/contact";
import Header from "./components/header";
import Footer from "./components/footer";
import { useEffect, useState } from "react";
import { ref as dbRef, onValue } from "firebase/database";
import { db } from "./firebaseConfig";
import type { Event, Verse, Video } from "./types";

// Función para obtener datos del localStorage
const getCachedData = <T,>(key: string): T | null => {
  const cachedData = localStorage.getItem(key);
  return cachedData ? JSON.parse(cachedData) : null;
};

// Función para guardar datos en el localStorage
const cacheData = <T,>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export default function Home() {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Verificar si hay datos en caché para versículos
      const cachedVerses = getCachedData<Verse[]>("verses");
      if (cachedVerses) {
        setVerses(cachedVerses);
      } else {
        // Obtener versículos desde Firebase si no hay caché
        const versesRef = dbRef(db, "verses");
        onValue(versesRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const versesArray = Object.values(data) as Verse[];
            setVerses(versesArray);
            cacheData("verses", versesArray); // Guardar en caché
          }
        });
      }

      // Verificar si hay datos en caché para videos
      const cachedVideos = getCachedData<Video[]>("videos");
      if (cachedVideos) {
        setVideos(cachedVideos);
      } else {
        // Obtener videos desde Firebase si no hay caché
        const videosRef = dbRef(db, "videos");
        onValue(videosRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const videosArray = Object.values(data) as Video[];
            setVideos(videosArray);
            cacheData("videos", videosArray); // Guardar en caché
          }
        });
      }

      // Verificar si hay datos en caché para eventos
      const cachedEvents = getCachedData<Event[]>("events");
      if (cachedEvents) {
        setEvents(cachedEvents);
      } else {
        // Obtener eventos desde Firebase si no hay caché
        const eventsRef = dbRef(db, "events");
        onValue(eventsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const eventsArray = Object.values(data) as Event[];
            setEvents(eventsArray);
            cacheData("events", eventsArray); // Guardar en caché
          }
        });
      }
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