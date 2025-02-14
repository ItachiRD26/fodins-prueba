// hooks/useDataFetcher.ts
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Verse, Video, Event } from "../types";

export const useDataFetcher = () => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const fetchData = async () => {
    try {
      const versesSnapshot = await getDocs(collection(db, "verses"));
      setVerses(versesSnapshot.docs.map((doc) => doc.data() as Verse));

      const videosSnapshot = await getDocs(collection(db, "videos"));
      setVideos(videosSnapshot.docs.map((doc) => doc.data() as Video));

      const eventsSnapshot = await getDocs(collection(db, "events"));
      setEvents(eventsSnapshot.docs.map((doc) => doc.data() as Event));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { verses, videos, events };
};