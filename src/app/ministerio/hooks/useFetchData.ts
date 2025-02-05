import { useEffect, useState } from "react";
import { fetchEvents } from "../firebase/firebase";

export const useFetchData = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    getEvents();
  }, []);

  return { events };
};