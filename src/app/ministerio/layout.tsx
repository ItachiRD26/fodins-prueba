import type { ReactNode } from "react"

interface MinisterioLayoutProps {
  children: ReactNode
}

const MinisterioLayout = ({ children }: MinisterioLayoutProps) => {
  return <div className="min-h-screen flex flex-col bg-gray-50">{children}</div>
}

export default MinisterioLayout

