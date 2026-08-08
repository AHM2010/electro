import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/formatters";

export default function CartDrawer({ isOpen, closeCart }) {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
    totalItems,
  } = useCart();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => event.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus?.();
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <button
        type="button"
        onClick={closeCart}
        aria-label="Close cart"
        className={`absolute inset-0 h-full w-full bg-slate-950/55 backdrop-blur-sm transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-hidden={!isOpen}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 dark:bg-slate-950 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex min-h-18 items-center justify-between border-b border-slate-200 px-4 sm:px-6 dark:border-slate-800">
          <div>
            <h2
              id="cart-title"
              className="text-lg font-bold text-slate-950 dark:text-white"
            >
              Your cart
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            className="icon-button"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <ShoppingBag className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">
              Your cart is waiting
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
              Explore our devices and add something you’ll enjoy using every
              day.
            </p>
            <Link to="/home" onClick={closeCart} className="btn-primary mt-6">
              Start shopping
            </Link>
          </div>
        ) : (
          <ul
            className="flex-1 space-y-1 overflow-y-auto px-4 py-3 sm:px-6"
            aria-label="Cart items"
          >
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-[4.75rem_1fr] gap-3 border-b border-slate-100 py-4 last:border-0 dark:border-slate-800"
              >
                <Link
                  to={`/products/${item.slug}`}
                  onClick={closeCart}
                  className="flex h-19 w-19 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-1.5 dark:border-slate-800 dark:bg-slate-900"
                >
                  <img
                    src={item.images?.[0] || ""}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </Link>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={`/products/${item.slug}`}
                      onClick={closeCart}
                      className="line-clamp-2 text-sm font-bold leading-5 text-slate-900 hover:text-blue-600 dark:text-white"
                    >
                      {item.title}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="icon-button h-9 w-9 shrink-0 text-slate-400 hover:text-red-600"
                      aria-label={`Remove ${item.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm font-bold text-blue-600 dark:text-blue-300">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex h-9 items-center rounded-lg border border-slate-200 dark:border-slate-700">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity === 1}
                        className="icon-button h-8 w-8 disabled:opacity-30"
                        aria-label={`Decrease ${item.title} quantity`}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        className="icon-button h-8 w-8"
                        aria-label={`Increase ${item.title} quantity`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Total {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cartItems.length > 0 && (
          <footer className="border-t border-slate-200 bg-white p-4 shadow-[0_-10px_30px_rgba(15,23,42,.06)] dark:border-slate-800 dark:bg-slate-950 sm:p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Subtotal
                </p>
                <p className="text-xs text-slate-400">
                  Shipping calculated at checkout
                </p>
              </div>
              <p className="text-xl font-extrabold text-slate-950 dark:text-white">
                {formatCurrency(subtotal)}
              </p>
            </div>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="btn-primary mt-4 w-full"
            >
              Secure checkout
            </Link>
            <button
              type="button"
              onClick={closeCart}
              className="mt-3 w-full text-center text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400"
            >
              Continue shopping
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
