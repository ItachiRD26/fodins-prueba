// src/app/components/BlogPostClient.tsx
"use client"; // Marca el componente como Client Component

import Image from "next/image";

interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  tags: string[];
}

interface BlogPostClientProps {
  post: Post;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-8">
          Por {post.author} | {post.date}
        </div>
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={800}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div className="prose prose-lg mt-8">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}