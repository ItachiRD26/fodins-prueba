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
  if (typeof window !== "undefined") {
    const cachedData = localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }
  return null;
};

// Función para guardar datos en el localStorage
const cacheData = <T,>(key: string, data: T) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export default function Home() {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Cargar datos desde el cache (localStorage) si existen
    const cachedVerses = getCachedData<Verse[]>("verses");
    const cachedVideos = getCachedData<Video[]>("videos");
    const cachedEvents = getCachedData<Event[]>("events");

    if (cachedVerses) {
      setVerses(cachedVerses);
    }
    if (cachedVideos) {
      setVideos(cachedVideos);
    }
    if (cachedEvents) {
      setEvents(cachedEvents);
    }

    // Escuchar cambios en la base de datos para versículos
    const versesRef = dbRef(db, "verses");
    onValue(versesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const versesArray = Object.values(data) as Verse[];
        setVerses(versesArray); // Actualizar el estado con los nuevos datos
        cacheData("verses", versesArray); // Actualizar el cache
      }
    });

    // Escuchar cambios en la base de datos para videos
    const videosRef = dbRef(db, "videos");
    onValue(videosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const videosArray = Object.values(data) as Video[];
        setVideos(videosArray); // Actualizar el estado con los nuevos datos
        cacheData("videos", videosArray); // Actualizar el cache
      }
    });

    // Escuchar cambios en la base de datos para eventos
    const eventsRef = dbRef(db, "events");
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const eventsArray = Object.values(data) as Event[];
        setEvents(eventsArray); // Actualizar el estado con los nuevos datos
        cacheData("events", eventsArray); // Actualizar el cache
      }
    });
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