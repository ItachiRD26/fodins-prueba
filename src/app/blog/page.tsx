"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { posts } from "@/data/posts";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
}

const categories = ["Todos", "Educación", "Salud"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      (selectedCategory === "Todos" || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>

      <div className="flex justify-center gap-4 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <Input
        type="text"
        placeholder="Buscar artículos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md mx-auto mb-8"
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function BlogPostCard({ post }: { post: Post }) {
  return (
    <Card>
      <Image src={post.imageUrl} alt={post.title} width={400} height={250} className="w-full h-48 object-cover" />
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <p className="text-sm text-gray-500">
          {format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: es })}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{post.excerpt}</p>
        <Link href={`/blog/${post.id}`}>
          <Button variant="outline" className="mt-4 w-full">Leer más</Button>
        </Link>
      </CardContent>
    </Card>
  );
}