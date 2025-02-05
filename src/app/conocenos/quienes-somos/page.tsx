import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target, Users, ShieldCheck, Zap } from "lucide-react";
import type { TeamMember } from "@/types/team";
import Link from 'next/link';

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "lc.Negaud Joseph",
    role: "Presidente y fundador",
    bio: "Lidera FODINS con visión estratégica, guiando la organización hacia un impacto sostenible en la comunidad.",
    imageUrl: "/team.jpg",
  },
  {
    id: 2,
    name: "Alceus Lentz",
    role: "Vice presidente",
    bio: "Apoya la dirección estratégica y supervisa las operaciones diarias para asegurar el cumplimiento de los objetivos de FODINS.",
    imageUrl: "/team1.jpg",
  },
  {
    id: 3,
    name: "Gertha Darius",
    role: "Secretaria General",
    bio: "Coordina las actividades administrativas y mantiene una comunicación efectiva entre los miembros del equipo y los colaboradores externos.",
    imageUrl: "/team2.jpg",
  },
  {
    id: 4,
    name: "Ing.Claudy Alexis",
    role: "Secretario de finanzas",
    bio: "Gestiona los recursos financieros de FODINS, asegurando una administración transparente y eficiente de los fondos.",
    imageUrl: "/team3.jpg",
  },
  {
    id: 5,
    name: "L.c Johane Moise ",
    role: "Coordinadora de Proyectos",
    bio: "Planifica, implementa y supervisa los proyectos de FODINS, asegurando que cumplan con los objetivos y plazos establecidos.",
    imageUrl: "/team4.jpg",
  },
  {
    id: 6,
    name: "LC. Thierry keneneth",
    role: "Coordinador",
    bio: "Facilita la colaboración entre diferentes áreas de FODINS y coordina iniciativas para maximizar el impacto de nuestros programas.",
    imageUrl: "/team5.jpg",
  },
  {
    id: 7,
    name: "Yviane Elma",
    role: "Secretaria de Acta",
    bio: "Documenta las reuniones y decisiones importantes, manteniendo un registro preciso de las actividades y acuerdos de FODINS.",
    imageUrl: "/team6.jpg",
  },
  {
    id: 8,
    name: "Adner achelus",
    role: "Delegado voluntario",
    bio: "Representa y coordina el cuerpo de voluntarios, asegurando una participación activa y efectiva en los proyectos de FODINS.",
    imageUrl: "/team7.jpg",
  },
];

const values = [
  {
    title: "Tolerancia",
    description: "Formar ciudadanos/as Solidarios/as, Tolerantes y Justos.",
    icon: Users,
  },
  {
    title: "Responsabilidad",
    description: "Ofertar un servicio con Responsabilidad, Credibilidad, Honestidad y Respeto.",
    icon: ShieldCheck,
  },
  {
    title: "Eficiencia",
    description:
      "Impulsar ciudadanos/as eficientes con indicadores fundamentales para el logro de la Calidad y la Competitividad.",
    icon: Zap,
  },
];

export default function QuienesSomosPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="/fondis5.jpg?height=800&width=1600"
          alt="Equipo de FODINS"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">FODINS</h1>
        </div>
      </section>

      {/* Mission and Vision */}
      <Container className="py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  Nuestra Misión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nuestra misión está enmarcada en la Educación como piedra angular del desarrollo de los pueblos,
                  trabajando unidos para una nueva alternativa comunitaria. Al mismo tiempo tener una nueva cultura de
                  integración en la comunidad. Gestionar las estructuras necesarias que van al ritmo del desarrollo
                  cultural, siempre llevando como ejemplo los valores cristianos.
                </p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Target className="h-6 w-6 text-primary" />
                  Nuestra Visión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lograr que los habitantes de esta comunidad se convierta en un modelo a seguir en lo educativo,
                  cultural, progreso social, justicia, respeto y unión.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>

      {/* Our Team */}
      <section className="bg-gray-50 py-16">
        <Container>
          <h2 className="text-3xl font-bold mb-12 text-center">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center text-center bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative w-40 h-40 mb-4 overflow-hidden rounded-full border-4 border-primary">
                  <Image
                    src={member.imageUrl || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Values */}
      <Container className="py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Nuestros Valores</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index}>
              <Card className="bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    {value.icon && <value.icon className="h-6 w-6 text-primary" />}
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Container>

      {/* Call to Action */}
      <section className="relative bg-primary text-white py-24">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <Container className="relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">Únete a Nuestra Misión</h2>
          <p className="mb-8 max-w-2xl mx-auto text-lg">
            Juntos podemos crear un impacto duradero en las vidas de quienes más lo necesitan. Descubre cómo puedes
            contribuir a nuestra causa y ser parte del cambio.
          </p>
          <Link href="/colabora/voluntariado" passHref>
  <Button
    size="lg"
    variant="secondary"
    className="font-semibold text-white hover:bg-white hover:text-primary transition-colors duration-300"
  >
    Colabora con Nosotros
  </Button>
</Link>
        </Container>
      </section>
    </main>
  );
}