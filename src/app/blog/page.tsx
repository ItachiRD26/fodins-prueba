"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Post {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  imageUrl: string
  readMoreLink?: string 
}

interface FeaturedPostProps {
  title: string
  excerpt: string
  imageUrl: string
  date: string
  category: string
}

interface BlogPostProps {
  title: string
  excerpt: string
  date: string
  category: string
  imageUrl: string
  readMoreLink?: string 
}

const posts: Post[] = [
  {
    id: 1,
    title: "Impacto de nuestro programa de educación en comunidades rurales",
    excerpt: "Descubre cómo nuestras iniciativas educativas están transformando vidas en áreas rurales",
    date: "2023-06-01",
    category: "Educación",
    imageUrl: "/blog-edu1.jpg",
    readMoreLink: "/blog/1", // Added readMoreLink
  },
  {
    id: 2,
    title: "Lanzamiento de campaña de salud preventiva",
    excerpt: "Nuestra nueva campaña busca mejorar la salud en comunidades vulnerables",
    date: "2023-05-28",
    category: "Salud",
    imageUrl: "/blog-salu1.jpg",
    readMoreLink: "/blog/2", // Added readMoreLink
  },
  {
    id: 3,
    title: "Nuevo programa de alfabetizacion",
    excerpt: "Conoce nuestro programa de alfabetizacion,le damos acceso a  la eduacion en comunidades vulnerables ",
    date: "2023-05-20",
    category: "Educación",
    imageUrl: "/blog-edu2.jpg",
    readMoreLink: "/blog/3", // Added readMoreLink
  },
  {
    id: 4,
    title: "Talleres de nutrición para familias en situación vulnerable",
    excerpt: "Implementamos talleres para mejorar la alimentación en comunidades necesitadas",
    date: "2023-05-18",
    category: "Salud",
    imageUrl: "/blog-salu2.jpg",
    readMoreLink: "/blog/4", // Added readMoreLink
  },
  {
    id: 5,
    title: "Programa escolar para apoyar el desarrollo de habilidades",
    excerpt: "Trabajamos con organizaciones talleres y cursos para brindar la oportunidad a ninos necesitados",
    date: "2023-05-10",
    category: "Educación",
    imageUrl: "/blog-edu3.jpg",
    readMoreLink: "/blog/5", // Added readMoreLink
  },
  {
    id: 6,
    title: "Programa de vacunación en zonas de difícil acceso",
    excerpt: "Llevamos salud a comunidades remotas con nuestro programa de vacunación",
    date: "2023-05-08",
    category: "Salud",
    imageUrl: "/blog-salu3.jpg",
    readMoreLink: "/blog/6", // Added readMoreLink
  },
  {
    id: 7,
    title: "Programa Deportivo para ninos",
    excerpt: "Ayudamos a diferentes ninos de las comunidades a tener la oportunidad se compartir la pasion por el deporte",
    date: "2023-04-30",
    category: "Educación",
    imageUrl: "/blog-edu4.jpg",
    readMoreLink: "/blog/7", // Added readMoreLink
  },
  {
    id: 8,
    title: "Campaña de prevención de enfermedades",
    excerpt: "Educación y prevención para mejorar la calidad de vida",
    date: "2023-04-28",
    category: "Salud",
    imageUrl: "/blog-salu4.jpg",
    readMoreLink: "/blog/8", // Added readMoreLink
  },
]

const categories = ["Todos", "Educación", "Salud"]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = posts.filter(
    (post) =>
      (selectedCategory === "Todos" || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <motion.div className="container mx-auto px-4 py-12" initial="initial" animate="animate" variants={stagger}>
      <motion.h1 className="text-4xl font-bold text-center mb-12" variants={fadeInUp}>
        Blog de FODINS
      </motion.h1>

      <motion.div variants={fadeInUp} className="mb-12">
        <FeaturedPost
          title="Celebramos 10 años transformando vidas"
          excerpt="Un recorrido por una década de trabajo, logros y desafíos en nuestra misión de crear un futuro mejor"
          imageUrl="/blog1.jpg"
          date="2023-06-05"
          category="Aniversario"
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </motion.div>

      <motion.div variants={fadeInUp} className="mb-8">
        <Input
          type="text"
          placeholder="Buscar artículos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto"
        />
      </motion.div>

      <motion.div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" variants={stagger}>
        {filteredPosts.map((post) => (
          <BlogPost key={post.id} {...post} />
        ))}
      </motion.div>

      {filteredPosts.length === 0 && (
        <motion.p variants={fadeInUp} className="text-center text-gray-500 mt-8">
          No se encontraron artículos que coincidan con tu búsqueda.
        </motion.p>
      )}

      <motion.div variants={fadeInUp} className="mt-12 text-center">
      <Button asChild>
          <Link href="https://www.facebook.com/fundacionfodins" target="_blank" rel="noopener noreferrer">
            Ver Más Artículos
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  )
}

function FeaturedPost({ title, imageUrl, date, category }: FeaturedPostProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-64 md:h-80">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-6">
          <div className="text-white">
            <p className="text-sm font-medium mb-2">{category}</p>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-sm mb-4">{format(new Date(date), "d 'de' MMMM, yyyy", { locale: es })}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function BlogPost({ title, excerpt, date, category, imageUrl, readMoreLink }: BlogPostProps) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="h-full flex flex-col">
        <div className="relative h-48">
          <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-primary">{category}</span>
            <span className="text-sm text-gray-500">{format(new Date(date), "d 'de' MMMM, yyyy", { locale: es })}</span>
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{excerpt}</p>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button variant="outline" className="w-full" asChild>
            <a href={readMoreLink}>
              Leer Más
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

