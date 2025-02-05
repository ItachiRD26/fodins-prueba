import Link from "next/link"

interface BlogPostProps {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
}

export function BlogPost({ id, title, excerpt, date, category }: BlogPostProps) {
  return (
    <article className="card hover:shadow-lg transition-shadow">
      <Link href={`/blog/${id}`}>
        <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">{title}</h2>
      </Link>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{date}</span>
        <span className="bg-secondary/10 text-secondary px-2 py-1 rounded">{category}</span>
      </div>
    </article>
  )
}

