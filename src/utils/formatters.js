const sarFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export const EXPRESS_DELIVERY_FEE = 30;

export function formatCurrency(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "0 SAR";
  }

  return `${sarFormatter.format(amount)} SAR`;
}

export function formatDeliveryWindow(daysFromNowStart = 3, daysFromNowEnd = 7) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  });

  const startDate = new Date();
  const endDate = new Date();

  startDate.setDate(startDate.getDate() + daysFromNowStart);
  endDate.setDate(endDate.getDate() + daysFromNowEnd);

  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
}

export function getDeliveryFee(deliveryMethod) {
  return deliveryMethod === "express" ? EXPRESS_DELIVERY_FEE : 0;
}

export function getOrderTotal(subtotal, deliveryMethod) {
  return (Number(subtotal) || 0) + getDeliveryFee(deliveryMethod);
}
