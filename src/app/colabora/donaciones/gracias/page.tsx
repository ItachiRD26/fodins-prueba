import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GraciasPage() {
  return (
    <Container className="py-24">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">¡Gracias por tu donación!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-xl mb-6">
            Tu generosidad hace una gran diferencia en nuestra comunidad. Gracias a personas como tú, podemos continuar
            nuestra misión de transformar vidas.
          </p>
          <p className="text-lg mb-8">
            Te enviaremos un recibo de tu donación por correo electrónico. Si tienes alguna pregunta, no dudes en
            contactarnos.
          </p>
          <Button asChild>
            <Link href="/colabora/donaciones">Volver a la página de donaciones</Link>
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}

