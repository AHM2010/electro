import { memo } from "react";
import { Truck, Zap } from "lucide-react";
import {
  formatCurrency,
  FREE_SHIPPING_THRESHOLD,
  getDeliveryFee,
} from "../../utils/formatters";

const deliveryOptions = [
  {
    id: "standard",
    label: "Standard delivery",
    description: "Delivered in 3–7 business days",
    icon: Truck,
  },
  {
    id: "express",
    label: "Express delivery",
    description: "Delivered in 1–2 business days",
    icon: Zap,
  },
];

function DeliveryMethodSelector({ value, onChange, subtotal = 0 }) {
  return (
    <fieldset>
      <legend className="sr-only">Choose a delivery method</legend>

      <div className="grid gap-3 sm:grid-cols-2">
        {deliveryOptions.map((option) => {
          const isSelected = value === option.id;
          const OptionIcon = option.icon;
          const deliveryFee = getDeliveryFee(subtotal, option.id);

          return (
            <label
              key={option.id}
              className={`relative flex cursor-pointer gap-3 rounded-lg border p-3 transition-all duration-200 sm:p-4 ${
                isSelected
                  ? "border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20 dark:bg-blue-500/10"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              }`}
            >
              <input
                type="radio"
                name="deliveryMethod"
                value={option.id}
                checked={isSelected}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />

              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                aria-hidden="true"
              >
                <OptionIcon className="h-5 w-5" strokeWidth={1.75} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-start justify-between gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {option.label}
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-blue-600">
                    {deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}
                  </span>
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  {option.description}
                </span>
              </span>
            </label>
          );
        })}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-gray-500">
        Standard delivery is free when the merchandise subtotal exceeds{" "}
        {formatCurrency(FREE_SHIPPING_THRESHOLD)}; otherwise, a 30 SAR shipping
        fee applies. Express delivery adds a further 30 SAR surcharge.
      </p>
    </fieldset>
  );
}

export default memo(DeliveryMethodSelector);
