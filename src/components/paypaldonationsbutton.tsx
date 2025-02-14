import React from "react";
import { PayPalButtons, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/react-paypal-js";

interface PayPalDonationButtonProps {
  amount: string;
  onSuccess: (details: OnApproveData) => void;
  onError: (error: Error) => void;
}

export const PayPalDonationButton: React.FC<PayPalDonationButtonProps> = ({ amount, onSuccess, onError }) => {
  const safeAmount = Number(amount) >= 0 ? amount : "0";

  return (
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
        return actions.order!.capture().then((details) => {
          onSuccess(details);
        });
      }}
      onError={(err: Error) => {
        onError(err);
      }}
    />
  );
};