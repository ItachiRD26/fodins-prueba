// src/app/blog/[id]/page.tsx
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { posts } from "@/data/posts"; // Importamos los posts desde el archivo posts.ts

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const post = posts.find((post) => post.id === params.id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
  };
}

export default function BlogPost({ params }: Props) {
  const post = posts.find((post) => post.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/blog" passHref>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la lista de posts
        </Button>
      </Link>
      <Card className="max-w-4xl mx-auto">
        <Image
          src={post.imageUrl || "/placeholder.svg"}
          alt={post.title}
          width={600}
          height={400}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <User className="mr-2 h-4 w-4" />
            <span className="mr-4">{post.author}</span>
            <Calendar className="mr-2 h-4 w-4" />
            <span>{post.date}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}