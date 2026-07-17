import { memo, useMemo } from "react";
import {
  formatCurrency,
  formatDeliveryWindow,
  getDeliveryFee,
  getOrderTotal,
} from "../../utils/formatters";

function OrderSummaryItem({ item, compact = false }) {
  const lineTotal =
    (Number(item.price) || 0) * (Number(item.quantity) || 0);

  return (
    <li className={`flex items-center ${compact ? "gap-2" : "gap-3"}`}>
      <img
        src={item.images?.[0]}
        alt={item.title || "Product"}
        className={`${compact ? "h-12 w-12" : "h-16 w-16"} shrink-0 rounded-lg border border-gray-100 object-cover`}
        loading="lazy"
      />

      <div className="min-w-0 flex-1">
        <p className={`${compact ? "line-clamp-2 text-sm leading-snug" : "truncate"} font-medium text-gray-900`}>{item.title}</p>
        <p className="mt-0.5 text-sm text-gray-500">Qty: {item.quantity}</p>
      </div>

      <p className={`${compact ? "text-xs" : "text-sm"} shrink-0 font-semibold text-gray-900`}>
        {formatCurrency(lineTotal)}
      </p>
    </li>
  );
}

function OrderSummary({
  cartItems,
  subtotal,
  itemCount,
  deliveryMethod = "standard",
  compact = false,
  className = "",
}) {
  const isEmpty = cartItems.length === 0;
  const deliveryFee = useMemo(
    () => getDeliveryFee(deliveryMethod),
    [deliveryMethod],
  );
  const total = useMemo(
    () => getOrderTotal(subtotal, deliveryMethod),
    [subtotal, deliveryMethod],
  );
  const deliveryLabel =
    deliveryMethod === "express" ? "Express delivery" : "Standard delivery";

  return (
    <aside
      aria-labelledby="order-summary-heading"
      className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      <div className={`${compact ? "p-4" : "p-5 sm:p-6"}`}>
        <h2
          id="order-summary-heading"
          className="text-lg font-semibold text-gray-900 sm:text-xl"
        >
          Order summary
        </h2>

        {!compact && (
          <p className="mt-1 text-sm text-gray-500">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        )}

        <div className="mt-4">
          {isEmpty ? (
            <p className="rounded-lg bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
              Your cart is empty.
            </p>
          ) : (
            <ul className="space-y-4" aria-label="Cart items">
              {cartItems.map((item) => (
                <OrderSummaryItem key={item.id} item={item} compact={compact} />
              ))}
            </ul>
          )}
        </div>

        <div className={`${compact ? "mt-4 pt-3" : "mt-6 pt-4"} space-y-2 border-t border-gray-100`}>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>{deliveryLabel}</span>
            <span
              className={
                deliveryFee === 0
                  ? "font-medium text-emerald-700"
                  : "font-medium text-gray-900"
              }
            >
              {deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}
            </span>
          </div>

          <div className="flex justify-between border-t border-gray-100 pt-3 text-base font-semibold text-gray-900">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <p className="text-xs leading-relaxed text-gray-500">
            Est. delivery:{" "}
            {formatDeliveryWindow(
              deliveryMethod === "express" ? 1 : 3,
              deliveryMethod === "express" ? 2 : 7,
            )}
          </p>
        </div>
      </div>
    </aside>
  );
}

export default memo(OrderSummary);
