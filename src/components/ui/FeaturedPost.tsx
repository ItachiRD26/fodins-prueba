// src/app/components/FeaturedPost.tsx
import Image from "next/image";
import { Post } from "@/data/posts";

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
      <Image
        src={post.imageUrl}
        alt={post.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-6">
        <div className="text-white">
          <span className="text-sm">{post.category}</span>
          <h2 className="text-3xl font-bold mt-2">{post.title}</h2>
          <p className="text-lg mt-2">{post.excerpt}</p>
        </div>
      </div>
    </div>
  );
}