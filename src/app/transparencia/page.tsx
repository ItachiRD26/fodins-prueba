"use client"

import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TransparenciaPage() {
  return (
    <Container className="py-24">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Transparencia</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Nuestro Compromiso con la Transparencia</h2>
              <p className="text-lg text-gray-600">
                En nuestra campaña, creemos en la transparencia como un pilar fundamental. Queremos que nuestros donantes sepan exactamente cómo se utilizan sus contribuciones y cómo impactan en la vida de los niños beneficiados.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Informes Financieros</h2>
              <p className="text-lg text-gray-600">
                Publicamos informes financieros trimestrales para mostrar cómo se distribuyen los fondos recaudados. Estos informes detallan los gastos en educación, alimentación, ropa y asistencia médica.
              </p>
              {/* <Button asChild className="mt-4">
                <Link href="/informes-financieros">Ver Informes Financieros</Link>
              </Button> */}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">¿Cómo Aseguramos la Transparencia?</h2>
              <p className="text-lg text-gray-600">
                Trabajamos con auditores externos para garantizar que cada donación se utilice de manera eficiente y ética. Además, mantenemos una comunicación abierta con nuestros donantes, proporcionando actualizaciones regulares sobre el progreso de la campaña.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Preguntas o Comentarios</h2>
              <p className="text-lg text-gray-600">
                Si tienes alguna pregunta sobre cómo se utilizan los fondos o deseas más información, no dudes en contactarnos. Estamos aquí para responder a todas tus inquietudes.
              </p>
              {/* <Button asChild className="mt-4">
                <Link href="/contacto">Contáctanos</Link>
              </Button> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}