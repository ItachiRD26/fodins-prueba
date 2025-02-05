"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "../firebase/firebase"
import { onAuthStateChanged, User } from "firebase/auth"

const ADMIN_UID = "HUD7XNKKzxcHz1Lh7HSXngcJlXn1"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.uid !== ADMIN_UID) {
        router.push("/ministerio") // Redirige a la página principal si no es el admin
      } else {
        setUser(currentUser)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  if (loading) return <p>Cargando...</p>

  return user ? <>{children}</> : null
}
