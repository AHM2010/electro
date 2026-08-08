import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  CreditCard,
  MapPin,
  Receipt,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useCart } from "../hooks/useCart";
import {
  getFieldError,
  useCheckoutForm,
  validateCheckoutForm,
} from "../hooks/useCheckoutForm";
import { formatCurrency, getOrderTotal } from "../utils/formatters";
import CheckoutEmptyState from "../components/checkout/CheckoutEmptyState";
import CheckoutSection from "../components/checkout/CheckoutSection";
import DeliveryMethodSelector from "../components/checkout/DeliveryMethodSelector";
import FormField from "../components/checkout/FormField";
import OrderSummary from "../components/checkout/OrderSummary";

export default function Checkout() {
  const { cartItems, subtotal, totalItems, clearCart } = useCart();
  const {
    form,
    touched,
    handleChange,
    handleBlur,
    setDeliveryMethod,
    setTouched,
  } = useCheckoutForm();

  const [submitStatus, setSubmitStatus] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);
  const orderTotal = getOrderTotal(subtotal, form.deliveryMethod);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitStatus(null);

    if (!cartItems.length) {
      setSubmitStatus({
        type: "error",
        message: "Your cart is empty. Add items before placing an order.",
      });
      return;
    }

    const validationErrors = validateCheckoutForm(form, {
      billingSameAsShipping: form.billingSameAsShipping,
    });

    if (Object.keys(validationErrors).length > 0) {
      setTouched((current) => ({
        ...current,
        ...Object.fromEntries(
          Object.keys(validationErrors).map((name) => [name, true]),
        ),
      }));

      setSubmitStatus({
        type: "error",
        message:
          "Please fill in all required checkout fields before placing your order.",
      });
      return;
    }

    setPlacedOrder({
      customerName: form.fullName.trim() || "customer",
      itemCount: totalItems,
      total: orderTotal,
    });

    clearCart();
  };

  if (placedOrder) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center px-4 py-12 sm:px-6">
        <section
          data-aos="zoom-in"
          aria-labelledby="order-confirmation-title"
          className="surface-card w-full overflow-hidden text-center"
        >
          <div className="bg-blue-600 px-6 py-10 text-white sm:px-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-8 ring-white/10">
              <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
            </span>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-blue-100">
              Demo checkout complete
            </p>
            <h1
              id="order-confirmation-title"
              className="title mt-2 text-3xl font-extrabold sm:text-4xl"
            >
              Thanks, {placedOrder.customerName}!
            </h1>
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <p role="status" aria-live="polite" className="mx-auto max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Your checkout flow was completed successfully. This was a demo,
              so no payment was processed and no order was sent to a backend.
            </p>

            <div className="mx-auto mt-7 grid max-w-md grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Items
                </p>
                <p className="mt-1 text-xl font-extrabold text-slate-950 dark:text-white">
                  {placedOrder.itemCount}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Demo total
                </p>
                <p className="mt-1 text-xl font-extrabold text-slate-950 dark:text-white">
                  {formatCurrency(placedOrder.total)}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              Your cart has been cleared and is ready for another shopping flow.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/home" className="btn-primary">
                <ShoppingBag className="h-4 w-4" /> Continue shopping
              </Link>
              <Link to="/" className="btn-secondary">
                Return to storefront
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <header data-aos="fade-up" className="mb-8 text-center sm:mb-10">
          <h1 className="title text-3xl font-semibold text-blue-500 sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Review your cart and complete your purchase securely.
          </p>
        </header>

        <CheckoutEmptyState />
      </div>
    );
  }

  return (
    <div className="checkout-page mx-auto max-w-7xl px-3 pb-24 pt-5 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <header data-aos="fade-up" className="mb-5 sm:mb-8">
        <h1 className="title text-3xl font-semibold leading-tight text-blue-600 sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
          Complete the steps below to place your order. Your information is
          saved locally as you go.
        </p>
      </header>

      {submitStatus && (
        <div
          role={submitStatus.type === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
            submitStatus.type === "error"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="grid items-start gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-10">
        <div className="contents lg:block">
          <div className="order-1 lg:hidden">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              itemCount={totalItems}
              deliveryMethod={form.deliveryMethod}
              compact
            />
          </div>

          <form
            id="checkout-form"
            onSubmit={handleSubmit}
            noValidate
            className="order-2 space-y-4 sm:space-y-5 lg:order-0"
            aria-label="Checkout form"
          >
            <CheckoutSection
              id="shipping"
              title="Shipping information"
              description="Where should we deliver your order?"
              icon={MapPin}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Full name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="name"
                  placeholder="John Doe"
                  error={getFieldError("fullName", form.fullName, touched)}
                />

                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  helperText="We'll send your order confirmation here."
                  error={getFieldError("email", form.email, touched)}
                />
              </div>

              <div className="mt-4">
                <FormField
                  label="Street address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="street-address"
                  placeholder="123 Main St"
                  error={getFieldError("address", form.address, touched)}
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <FormField
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="address-level2"
                  placeholder="Riyadh"
                  error={getFieldError("city", form.city, touched)}
                />

                <FormField
                  label="Country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="country-name"
                  placeholder="Saudi Arabia"
                  error={getFieldError("country", form.country, touched)}
                />
              </div>
            </CheckoutSection>

            <CheckoutSection
              id="billing"
              title="Billing information"
              description="Used for your invoice and payment verification."
              icon={Receipt}
            >
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 transition-colors hover:bg-gray-100/80 sm:px-4">
                <input
                  type="checkbox"
                  name="billingSameAsShipping"
                  checked={form.billingSameAsShipping}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                />
                <span>
                  <span className="block text-sm font-medium text-gray-900">
                    Billing address same as shipping
                  </span>
                  <span className="mt-0.5 block text-xs text-gray-500">
                    Uncheck to enter a separate billing address.
                  </span>
                </span>
              </label>

              {!form.billingSameAsShipping && (
                <div className="mt-4 space-y-4">
                  <FormField
                    label="Billing address"
                    name="billingAddress"
                    value={form.billingAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={!form.billingSameAsShipping}
                    autoComplete="billing street-address"
                    placeholder="456 Business Ave"
                    error={getFieldError(
                      "billingAddress",
                      form.billingAddress,
                      touched,
                      { required: !form.billingSameAsShipping },
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Billing city"
                      name="billingCity"
                      value={form.billingCity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required={!form.billingSameAsShipping}
                      autoComplete="billing address-level2"
                      placeholder="Riyadh"
                      error={getFieldError(
                        "billingCity",
                        form.billingCity,
                        touched,
                        { required: !form.billingSameAsShipping },
                      )}
                    />

                    <FormField
                      label="Billing country"
                      name="billingCountry"
                      value={form.billingCountry}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required={!form.billingSameAsShipping}
                      autoComplete="billing country-name"
                      placeholder="Saudi Arabia"
                      error={getFieldError(
                        "billingCountry",
                        form.billingCountry,
                        touched,
                        { required: !form.billingSameAsShipping },
                      )}
                    />
                  </div>
                </div>
              )}
            </CheckoutSection>

            <CheckoutSection
              id="delivery"
              title="Delivery method"
              description="Choose how you'd like your order delivered."
              icon={Truck}
            >
              <DeliveryMethodSelector
                value={form.deliveryMethod}
                onChange={setDeliveryMethod}
                subtotal={subtotal}
              />
            </CheckoutSection>

            <CheckoutSection
              id="payment"
              title="Payment method"
              description="All transactions are secure and encrypted."
              icon={CreditCard}
            >
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-800 sm:text-sm">
                <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Demo checkout — no real payment is processed.</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Name on card"
                  name="cardName"
                  value={form.cardName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="cc-name"
                  placeholder="John Doe"
                  error={getFieldError("cardName", form.cardName, touched)}
                />

                <FormField
                  label="Card number"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="1234 1234 1234 1234"
                  helperText="Enter the 16-digit number on your card."
                  maxLength={19}
                  error={getFieldError("cardNumber", form.cardNumber, touched)}
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Expiry date"
                  name="expiry"
                  type="month"
                  value={form.expiry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  autoComplete="cc-exp"
                  error={getFieldError("expiry", form.expiry, touched)}
                />

                <FormField
                  label="CVV"
                  name="cvv"
                  value={form.cvv}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  helperText="3 or 4 digits on the back of your card."
                  error={getFieldError("cvv", form.cvv, touched)}
                />
              </div>
            </CheckoutSection>

            <div className="hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center sm:justify-between lg:pb-2">
              <Link
                to="/home"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
              >
                Continue shopping
              </Link>

              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-blue-500 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                disabled={!cartItems.length}
              >
                Place order — {formatCurrency(orderTotal)}
              </button>
            </div>
          </form>
        </div>

        <aside
          data-aos="fade-left"
          data-aos-delay="100"
          className="order-3 hidden lg:order-0 lg:block"
        >
          <div className="sticky top-28 space-y-4">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              itemCount={totalItems}
              deliveryMethod={form.deliveryMethod}
            />

            <button
              type="submit"
              form="checkout-form"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
            >
              Place order — {formatCurrency(orderTotal)}
            </button>

            <Link
              to="/home"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
            >
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:px-6 lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(orderTotal)}
            </p>
          </div>

          <button
            type="submit"
            form="checkout-form"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer sm:px-6"
          >
            Place order
          </button>
        </div>
      </div>

      <div className="h-20 sm:h-24 lg:hidden" aria-hidden="true" />
    </div>
  );
}
