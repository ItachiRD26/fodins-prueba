// src/app/blog/page.tsx
import { posts } from "@/data/posts";
import FeaturedPost from "@/components/ui/FeaturedPost";
import BlogCard from "@/components/ui/BlogCard";

export default function BlogPage() {
  const featuredPost = posts[0]; // El primer post será el destacado
  const otherPosts = posts.slice(1); // Los demás posts

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Blog de FODINS</h1>

      {/* Post destacado */}
      <FeaturedPost post={featuredPost} />

      {/* Lista de posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {otherPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}