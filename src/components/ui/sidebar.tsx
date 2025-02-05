import Link from "next/link"

const categories = ["Educación", "Salud", "Desarrollo Económico", "Medio Ambiente", "Derechos Humanos"]
const recentPosts = [
  { id: 1, title: "Impacto de nuestro programa de educación en comunidades rurales" },
  { id: 2, title: "Lanzamiento de campaña de salud preventiva" },
  { id: 3, title: "Éxito en el proyecto de microcréditos para emprendedores locales" },
]

export function Sidebar() {
  return (
    <aside className="space-y-8">
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Categorías</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <Link
                href={`/blog/category/${category.toLowerCase().replace(" ", "-")}`}
                className="hover:text-primary transition-colors"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Artículos Recientes</h3>
        <ul className="space-y-2">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Suscríbete</h3>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" className="btn-primary w-full">
            Suscribirse
          </button>
        </form>
      </div>
    </aside>
  )
}

