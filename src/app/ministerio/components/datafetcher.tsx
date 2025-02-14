"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../firebaseConfig"
import type { Verse, Video, Event } from "../types"

export function useDataFetcher() {
  const [verses, setVerses] = useState<Verse[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [posts, setPosts] = useState<Event[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const versesRef = collection(db, "verses")
        const versesQuery = query(versesRef, orderBy("createdAt", "desc"))
        const versesSnapshot = await getDocs(versesQuery)
        setVerses(versesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as unknown as Verse))

        const videosRef = collection(db, "videos")
        const videosQuery = query(videosRef, orderBy("uploadedAt", "desc"))
        const videosSnapshot = await getDocs(videosQuery)
        setVideos(videosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Video))

        const postsRef = collection(db, "posts")
        const postsQuery = query(postsRef, orderBy("createdAt", "desc"))
        const postsSnapshot = await getDocs(postsQuery)
        setPosts(postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Event))
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return { verses, videos, posts }
}