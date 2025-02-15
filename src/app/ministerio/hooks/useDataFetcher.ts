// hooks/useDataFetcher.ts
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database"; // Usa métodos de Realtime Database
import { db } from "../firebaseConfig";
import { Verse, Video, Event } from "../types";

export const useDataFetcher = () => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        // Obtener versículos
        const versesRef = ref(db, "verses");
        onValue(versesRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setVerses(Object.values(data));
          }
        });

        // Obtener videos
        const videosRef = ref(db, "videos");
        onValue(videosRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setVideos(Object.values(data));
          }
        });

        // Obtener eventos
        const eventsRef = ref(db, "events");
        onValue(eventsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setEvents(Object.values(data));
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return { verses, videos, events };
};