import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { posts } from "@/data/posts";

interface PostProps {
  params: { id: string }; // ✅ Asegura que params es un objeto simple
}


export async function generateMetadata({ params }: PostProps) {
  const post = posts.find((p) => p.id === params.id);
  return { title: post ? post.title : "Post no encontrado" };
}


export default function BlogPost({ params }: PostProps) {
  const post = posts.find((p) => p.id === params.id);
  if (!post) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/blog">
        <Button variant="ghost" className="mb-4">← Volver al blog</Button>
      </Link>
      <Card>
        <Image src={post.imageUrl} alt={post.title} width={800} height={400} className="w-full h-64 object-cover" />
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <p className="text-sm text-gray-500">{post.date}</p>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-gray-700">{post.content}</p>
        </CardContent>
      </Card>
    </div>
  );
}
