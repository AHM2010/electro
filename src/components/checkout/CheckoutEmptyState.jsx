import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function CheckoutEmptyState() {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
      <div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-500"
        aria-hidden="true"
      >
        <ShoppingBag className="h-8 w-8" strokeWidth={1.5} />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-gray-900">
        Your cart is empty
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-gray-500">
        Add items to your cart before checking out. Browse our latest devices
        and accessories to get started.
      </p>

      <Link
        to="/home"
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Continue shopping
      </Link>
    </div>
  );
}
