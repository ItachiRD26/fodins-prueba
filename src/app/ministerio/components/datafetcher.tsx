"use client";

import { useEffect, useState } from "react";
import { ref, get } from "firebase/database"; // Import Realtime Database methods
import { db } from "../firebaseConfig"; // Ensure this is the Realtime Database instance
import type { Verse, Video, Event } from "../types";

export function useDataFetcher() {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch verses from Realtime Database
        const versesRef = ref(db, "verses");
        const versesSnapshot = await get(versesRef);
        if (versesSnapshot.exists()) {
          const versesData = versesSnapshot.val();
          const versesArray = Object.keys(versesData).map((key) => ({
            id: key, // Add the unique key as the ID
            ...versesData[key], // Spread the verse data
          })) as Verse[];
          setVerses(versesArray);
        }

        // Fetch videos from Realtime Database
        const videosRef = ref(db, "videos");
        const videosSnapshot = await get(videosRef);
        if (videosSnapshot.exists()) {
          const videosData = videosSnapshot.val();
          const videosArray = Object.keys(videosData).map((key) => ({
            id: key, // Add the unique key as the ID
            ...videosData[key], // Spread the video data
          })) as Video[];
          setVideos(videosArray);
        }

        // Fetch events from Realtime Database
        const eventsRef = ref(db, "events");
        const eventsSnapshot = await get(eventsRef);
        if (eventsSnapshot.exists()) {
          const eventsData = eventsSnapshot.val();
          const eventsArray = Object.keys(eventsData).map((key) => ({
            id: key, // Add the unique key as the ID
            ...eventsData[key], // Spread the event data
          })) as Event[];
          setEvents(eventsArray);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return { verses, videos, events };
}