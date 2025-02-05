"use client"

import { motion } from "framer-motion"
import Image from "next/image"
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

  const handlePayPalSuccess = (details: any) => {
    const payerName = details.payer?.name?.given_name || "Cliente"
    const amount = parseFloat(donationAmount)

    // Actualizar el total de donaciones en Firebase
    const newTotal = totalDonations + amount
    set(ref(database, "totalDonations"), newTotal)

    setNotification({
      message: `¡Gracias ${payerName}! Tu donación ha sido procesada con éxito.`,
      type: "success",
    })
    resetForm()
    setTimeout(() => {
      router.push("/campana/gracias")
    }, 2000)
  }

  const handlePayPalError = (error: any) => {
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
        locale: "en_US", // Configura el idioma en inglés
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
            src="/campana5.jpg" // Cambia por la imagen de tu campaña
            alt="Campaña de Donación"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
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
                Nuestra campaña busca ayudar a niños en situación de calle que no cuentan con un hogar ni con acceso a educación o alimentación adecuada. A través de este programa de apadrinamiento, queremos brindarles estabilidad y una oportunidad para un futuro mejor.
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Nuestro Objetivo</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Queremos recaudar fondos suficientes para cubrir las necesidades básicas de estos niños, incluyendo educación, alimentación, ropa y asistencia médica. Cada donación contribuye a mejorar su calidad de vida y brindarles una segunda oportunidad.
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
                        style={{ width: `${(totalDonations / 10000) * 100}%` }} // Ajusta el objetivo de la campaña (ej. $10,000)
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