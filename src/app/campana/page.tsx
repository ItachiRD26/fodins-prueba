"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { PayPalDonationButton } from "@/components/paypaldonationsbutton"
import { Notification } from "@/components/notification"
import { useRouter } from "next/navigation"
import { database, ref, set, onValue } from "@/firebase"
import type { OnApproveData, OrderResponseBody } from "@paypal/paypal-js"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function CampanaPage() {
  const [donationAmount, setDonationAmount] = useState("0")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [totalDonations, setTotalDonations] = useState(0)
  const router = useRouter()

  // Obtener el total de donaciones desde Firebase
  useEffect(() => {
    const donationsRef = ref(database, "totalDonations")
    onValue(donationsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setTotalDonations(data)
      }
    })
  }, [])

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

  const handlePayPalSuccess = (details: OnApproveData & OrderResponseBody) => {
    const payerName = details.payer?.name?.given_name || "Cliente"
    const amount = Number.parseFloat(donationAmount)

    if (isNaN(amount)) {
      setNotification({
        message: "El monto de la donación no es válido.",
        type: "error",
      })
      return
    }

    // Actualizar el total de donaciones en Firebase
    const newTotal = totalDonations + amount
    set(ref(database, "totalDonations"), newTotal)
      .then(() => {
        setNotification({
          message: `¡Gracias ${payerName}! Tu donación ha sido procesada con éxito.`,
          type: "success",
        })
        resetForm()
        setTimeout(() => {
          router.push("/campana/gracias")
        }, 2000)
      })
      .catch((error) => {
        console.error("Error al actualizar el total de donaciones:", error)
        setNotification({
          message: "Hubo un error al procesar tu donación. Por favor, inténtalo de nuevo.",
          type: "error",
        })
      })
  }

  const handlePayPalError = (error: Record<string, unknown>) => {
    setNotification({
      message: "Ocurrió un error al procesar tu donación. Por favor, inténtalo de nuevo o contacta con soporte.",
      type: "error",
    })
    console.error("Error al cargar el SDK de PayPal:", error)
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        currency: "USD",
        intent: "capture",
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
          <video
            autoPlay
            muted
            loop
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/campananinos.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent bg-opacity-60 flex items-center justify-start">
            <Container>
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Campaña de Donación</h1>
                <p className="text-xl text-white/80">
                  Juntos podemos hacer la diferencia. Tu apoyo es crucial para lograr nuestros objetivos.
                </p>
              </div>
            </Container>
          </div>
        </motion.section>

        {/* Información de la campaña */}
        <Container className="py-12">
          <motion.div className="grid lg:grid-cols-2 gap-16" variants={fadeIn}>
            <div>
              <h2 className="text-4xl font-bold mb-6">Sobre la Campaña</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Nuestra campaña busca ayudar a niños en situación de calle que no cuentan con un hogar ni con acceso a
                educación o alimentación adecuada. A través de este programa de apadrinamiento, queremos brindarles
                estabilidad y una oportunidad para un futuro mejor.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed mt-4">
                Muchos de estos niños no tienen acceso a una educación básica, lo que limita sus oportunidades de desarrollo.
                Con tu ayuda, podemos proporcionarles materiales escolares, uniformes y acceso a escuelas, dándoles la
                oportunidad de aprender y crecer en un entorno seguro.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Nuestro Objetivo</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Queremos recaudar fondos suficientes para cubrir las necesidades básicas de estos niños, incluyendo
                educación, alimentación, ropa y asistencia médica. Cada donación contribuye a mejorar su calidad de vida
                y brindarles una segunda oportunidad.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed mt-4">
                Nuestro objetivo es recaudar $10,000 para ayudar a 100 niños este año. Con tu apoyo, podemos lograrlo.
              </p>
            </div>
          </motion.div>
        </Container>

        {/* Formulario de donación y contador */}
        <Container className="py-12">
          <motion.div className="grid lg:grid-cols-2 gap-16" variants={fadeIn}>
            {/* Formulario de donación */}
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

            {/* Contador de donaciones */}
            <motion.div variants={fadeIn}>
              <Card className="shadow-lg">
                <CardHeader className="bg-primary text-primary-foreground p-6">
                  <CardTitle className="text-3xl font-bold">Progreso de la Campaña</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <p className="text-xl font-semibold">
                      Total recaudado: <span className="text-primary">${totalDonations.toFixed(2)}</span>
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-primary h-4 rounded-full"
                        style={{ width: `${(totalDonations / 10000) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-600">Objetivo: $10,000</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </Container>
      </motion.main>
    </PayPalScriptProvider>
  )
}