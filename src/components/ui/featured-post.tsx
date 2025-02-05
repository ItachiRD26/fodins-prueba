import Link from "next/link"
import Image from "next/image"

interface FeaturedPostProps {
  title: string
  excerpt: string
  imageUrl: string
  date: string
  category: string
}

export function FeaturedPost({ title, excerpt, imageUrl, date, category }: FeaturedPostProps) {
  return (
    <article className="card overflow-hidden">
      <div className="relative h-64 mb-4">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <Link href="/blog/featured">
        <h2 className="text-2xl font-semibold mb-2 hover:text-primary transition-colors">{title}</h2>
      </Link>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{date}</span>
        <span className="bg-secondary/10 text-secondary px-2 py-1 rounded">{category}</span>
      </div>
    </article>
  )
}

