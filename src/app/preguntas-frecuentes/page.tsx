// app/preguntas-frecuentes/page.tsx
"use client"

import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionItem } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <Container className="py-24">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Preguntas Frecuentes</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <Accordion>
            <AccordionItem
              value="item-1"
              trigger={
                <span className="text-xl font-semibold">
                  ¿Cómo se utilizará mi donación?
                </span>
              }
            >
              <p className="text-lg text-gray-600">
                Tu donación se utilizará para cubrir las necesidades básicas de los niños, incluyendo educación, alimentación, ropa y asistencia médica. Cada contribución se destina directamente a mejorar la calidad de vida de los niños beneficiados.
              </p>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              trigger={
                <span className="text-xl font-semibold">
                  ¿Es seguro donar a través de PayPal?
                </span>
              }
            >
              <p className="text-lg text-gray-600">
                Sí, PayPal es una plataforma segura y confiable para realizar transacciones en línea. Tus datos están protegidos y no compartimos tu información con terceros.
              </p>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              trigger={
                <span className="text-xl font-semibold">
                  ¿Puedo donar si no tengo una cuenta de PayPal?
                </span>
              }
            >
              <p className="text-lg text-gray-600">
                Sí, puedes donar utilizando una tarjeta de crédito o débito sin necesidad de tener una cuenta de PayPal.
              </p>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              trigger={
                <span className="text-xl font-semibold">
                  ¿Recibiré un recibo de mi donación?
                </span>
              }
            >
              <p className="text-lg text-gray-600">
                Sí, te enviaremos un recibo por correo electrónico con los detalles de tu donación.
              </p>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              trigger={
                <span className="text-xl font-semibold">
                  ¿Cómo puedo contactarles si tengo más preguntas?
                </span>
              }
            >
              <p className="text-lg text-gray-600">
                Puedes contactarnos a través de nuestro correo electrónico: fundacion@fodins.org o llamarnos al +1 829-713-7029. Estamos disponibles de lunes a viernes de 9:00 a.m. a 5:00 p.m.
              </p>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </Container>
  )
}