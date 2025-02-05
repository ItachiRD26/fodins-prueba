import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface NotificationProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

export const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!isVisible) return null

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}
    >
      <div className="flex items-center">
        <p>{message}</p>
        <button onClick={() => setIsVisible(false)} className="ml-4">
          <X size={18} />
        </button>
      </div>
    </div>
  )
}

