import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { OnApproveData, OnApproveActions, CreateOrderActions, OrderResponseBody } from "@paypal/paypal-js";

interface PayPalDonationButtonProps {
  amount: string;
  onSuccess: (details: OnApproveData & OrderResponseBody) => void;
  onError: (error: Record<string, unknown>) => void;
}

export const PayPalDonationButton: React.FC<PayPalDonationButtonProps> = ({ amount, onSuccess, onError }) => {
  const safeAmount = Number(amount) >= 0 ? amount : "0";

  return (
    <PayPalScriptProvider
      options={{
        clientId: "Aa0dIyE6M5GJqdTo6TBO9Ufdjg2sCQyi-6vic3TZcLYfjN0wHT-p0xsQJix9NMmsZU0HEbF1ZqdlI0uN",
        currency: "USD",
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "donate",
        }}
        createOrder={(data: Record<string, unknown>, actions: CreateOrderActions) => {
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
              shipping_preference: "NO_SHIPPING",
            },
          });
        }}
        onApprove={(data: OnApproveData, actions: OnApproveActions) => {
          if (actions.order) {
            return actions.order.capture().then((details: OrderResponseBody) => {
              onSuccess({
                ...data,
                ...details,
              });
            });
          }
          return Promise.reject(new Error('Order actions not available'));
        }}
        onError={(err: Record<string, unknown>) => {
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};