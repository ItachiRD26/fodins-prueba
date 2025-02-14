"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, DollarSign, Users, Lightbulb } from "lucide-react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { PayPalDonationButton } from "@/components/paypaldonationsbutton"
import { Notification } from "@/components/notification"
import { useRouter } from "next/navigation"
import type React from "react"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function DonacionesPage() {
  const [donationAmount, setDonationAmount] = useState("0")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const router = useRouter()

  const handleDonationAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setDonationAmount(value)
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const resetForm = () => {
    setDonationAmount("0")
    setName("")
    setEmail("")
  }

  const handlePayPalSuccess = (details: { payer?: { name?: { given_name?: string } } }) => {
    const payerName = details.payer?.name?.given_name || "Cliente"
    setNotification({
      message: `¡Gracias ${payerName}! Tu donación ha sido procesada con éxito.`,
      type: "success",
    })
    resetForm()
    setTimeout(() => {
      router.push("/colabora/donaciones/gracias")
    }, 2000)
  }

  const handlePayPalError = (error: Error) => {
    setNotification({
      message: "Ocurrió un error al procesar tu donación. Por favor, inténtalo de nuevo o contacta con soporte.",
      type: "error",
    })
    console.error("Error al cargar el SDK de PayPal:", error)
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: "Aa0dIyE6M5GJqdTo6TBO9Ufdjg2sCQyi-6vic3TZcLYfjN0wHT-p0xsQJix9NMmsZU0HEbF1ZqdlI0uN", // Client ID de producción
        currency: "USD",
        intent: "capture",
        locale: "en_US",
      }}
    >
      <motion.main
        className="bg-white"
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {notification && (
          <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
        )}

        {/* Hero Section */}
        <motion.section className="relative h-[60vh] min-h-[500px]" variants={fadeIn}>
          <Image
            src="/fondis15.jpg"
            alt="Donaciones para FODINS"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent bg-opacity-60 flex items-center justify-start">
            <Container>
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Tu Apoyo Transforma Vidas</h1>
                <p className="text-xl text-white/80">
                  Juntos podemos crear un futuro más brillante para nuestra comunidad.
                </p>
              </div>
            </Container>
          </div>
        </motion.section>

        {/* Main Content */}
        <Container className="py-24">
          <motion.div className="grid lg:grid-cols-2 gap-16" variants={fadeIn}>
            {/* Left Column: Donation Form */}
            <motion.div variants={fadeIn}>
              <Card className="shadow-lg">
                <CardHeader className="bg-primary text-primary-foreground p-6">
                  <CardTitle className="text-3xl font-bold">Haz tu Donación</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                      <Label htmlFor="donation-amount" className="text-lg font-semibold">
                        Monto de la donación
                      </Label>
                      <Input
                        type="text"
                        inputMode="decimal"
                        id="donation-amount"
                        placeholder="Ingrese el monto"
                        className="text-lg"
                        value={donationAmount}
                        onChange={handleDonationAmountChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-lg font-semibold">
                        Nombre completo
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Tu nombre"
                        className="text-lg"
                        value={name}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-lg font-semibold">
                        Correo electrónico
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="tu@email.com"
                        className="text-lg"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                    <PayPalDonationButton
                      amount={donationAmount}
                      onSuccess={handlePayPalSuccess}
                      onError={handlePayPalError}
                    />
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column: Impact Information */}
            <motion.div className="space-y-12" variants={fadeIn}>
              <div>
                <h2 className="text-4xl font-bold mb-6">Tu Impacto</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Cada donación, sin importar su tamaño, tiene un impacto significativo en nuestra comunidad. Tu
                  generosidad nos ayuda a continuar nuestros programas educativos y de desarrollo comunitario,
                  transformando vidas y construyendo un futuro más prometedor para todos.
                </p>
              </div>
              <motion.div className="grid sm:grid-cols-2 gap-6" variants={fadeIn}>
                {[
                  { icon: Heart, text: "Apoyas a familias necesitadas" },
                  { icon: DollarSign, text: "Financias proyectos educativos" },
                  { icon: Users, text: "Fortaleces la comunidad" },
                  { icon: Lightbulb, text: "Inspiras cambios positivos" },
                ].map(({ icon: Icon, text }, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <Icon className="h-16 w-16 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <p className="text-lg font-medium">{text}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>

        {/* FAQ Section */}
        <Container className="py-24">
          <motion.h2 className="text-4xl font-bold mb-12 text-center" variants={fadeIn}>
            Preguntas Frecuentes
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {[
              {
                title: "¿Cómo se utilizan las donaciones?",
                content:
                  "Las donaciones se destinan directamente a nuestros programas educativos, proyectos de desarrollo comunitario y gastos operativos esenciales para mantener nuestra misión.",
              },
              {
                title: "¿Cómo puedo saber el impacto de mi donación?",
                content:
                  "Enviamos actualizaciones regulares a nuestros donantes sobre el progreso de nuestros proyectos y el impacto de sus contribuciones en la comunidad.",
              },
            ].map(({ title, content }, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.main>
    </PayPalScriptProvider>
  )
}