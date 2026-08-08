const sarFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export const EXPRESS_DELIVERY_SURCHARGE = 30;
export const STANDARD_DELIVERY_FEE = 30;
export const FREE_SHIPPING_THRESHOLD = 7000;

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

export function qualifiesForFreeStandardShipping(subtotal) {
  return (Number(subtotal) || 0) > FREE_SHIPPING_THRESHOLD;
}

export function getDeliveryFee(subtotal, deliveryMethod) {
  const standardFee = qualifiesForFreeStandardShipping(subtotal)
    ? 0
    : STANDARD_DELIVERY_FEE;

  return deliveryMethod === "express"
    ? standardFee + EXPRESS_DELIVERY_SURCHARGE
    : standardFee;
}

export function getOrderTotal(subtotal, deliveryMethod) {
  const safeSubtotal = Number(subtotal) || 0;
  return safeSubtotal + getDeliveryFee(safeSubtotal, deliveryMethod);
}
