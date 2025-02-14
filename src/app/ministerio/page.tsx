"use client";

import { HeroSection } from "./components/hero";
import { VerseSection } from "./components/verse";
import { VideoSection } from "./components/video";
import { EventSection } from "./components/post";
import { ContactSection } from "./components/contact";
import Header from "./components/header";
import Footer from "./components/footer";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebaseConfig";

export default function Home() {
  const [verses, setVerses] = useState([]);
  const [videos, setVideos] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const versesRef = ref(db, "verses");
    onValue(versesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVerses(Object.values(data));
      }
    });

    const videosRef = ref(db, "videos");
    onValue(videosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVideos(Object.values(data));
      }
    });

    const eventsRef = ref(db, "events");
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setEvents(Object.values(data));
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