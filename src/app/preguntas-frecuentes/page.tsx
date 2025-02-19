// app/preguntas-frecuentes/page.tsx
"use client"

import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <Container className="py-24">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Preguntas Frecuentes</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="text-xl font-semibold">
                  ¿Cómo se utilizará mi donación?
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-lg text-gray-600">
                  Tu donación se utilizará para cubrir las necesidades básicas de los niños, incluyendo educación, alimentación, ropa y asistencia médica. Cada contribución se destina directamente a mejorar la calidad de vida de los niños beneficiados.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <span className="text-xl font-semibold">
                  ¿Es seguro donar a través de PayPal?
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-lg text-gray-600">
                  Sí, PayPal es una plataforma segura y confiable para realizar transacciones en línea. Tus datos están protegidos y no compartimos tu información con terceros.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                <span className="text-xl font-semibold">
                  ¿Puedo donar si no tengo una cuenta de PayPal?
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-lg text-gray-600">
                  Sí, puedes donar utilizando una tarjeta de crédito o débito sin necesidad de tener una cuenta de PayPal.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                <span className="text-xl font-semibold">
                  ¿Recibiré un recibo de mi donación?
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-lg text-gray-600">
                  Sí, te enviaremos un recibo por correo electrónico con los detalles de tu donación.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                <span className="text-xl font-semibold">
                  ¿Cómo puedo contactarles si tengo más preguntas?
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-lg text-gray-600">
                  Puedes contactarnos a través de nuestro correo electrónico: fundacion@fodins.org o llamarnos al +1 829-713-7029. Estamos disponibles de lunes a viernes de 9:00 a.m. a 5:00 p.m.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </Container>
  )
}