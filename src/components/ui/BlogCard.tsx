// src/app/components/BlogCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/data/posts";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Image
        src={post.imageUrl}
        alt={post.title}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <span className="text-sm text-gray-500">{post.date}</span>
        <h2 className="text-xl font-bold mt-2">{post.title}</h2>
        <p className="text-gray-600 mt-2">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-blue-500 hover:text-blue-700">
          Leer más →
        </Link>
      </div>
    </div>
  );
}