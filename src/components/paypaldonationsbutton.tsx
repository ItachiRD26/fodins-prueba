import type React from "react"
import { PayPalButtons } from "@paypal/react-paypal-js"

interface PayPalDonationButtonProps {
  amount: string
  onSuccess: (details: any) => void
  onError: (error: any) => void
}

export const PayPalDonationButton: React.FC<PayPalDonationButtonProps> = ({ amount, onSuccess, onError }) => {
  const safeAmount = Number(amount) >= 0 ? amount : "0"

  return (
    <PayPalButtons
      style={{
        layout: "vertical",
        color: "blue",
        shape: "rect",
        label: "donate",
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                value: safeAmount,
                currency_code: "USD",
              },
            },
          ],
          application_context: {
            shipping_preference: "NO_SHIPPING", // Configura para no solicitar la dirección de envío
          },
        })
      }}
      onApprove={(data, actions) => {
        return actions.order!.capture().then((details) => {
          onSuccess(details)
        })
      }}
      onError={(err) => {
        onError(err)
      }}
    />
  )
}