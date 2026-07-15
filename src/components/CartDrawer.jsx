import { useCart } from "../hooks/useCart";
import { XCircle, Trash2 } from "lucide-react";
import { formatCurrency } from "../utils/formatters";
import { Link } from "react-router-dom";

export default function CartDrawer({ isOpen, closeCart }) {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
    totalItems,
  } = useCart();

  return (
    <>
      <div
        onClick={closeCart}
        className={`
          fixed inset-0
          bg-black/50
          backdrop-blur-sm
          transition-all duration-300
          z-50
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      <aside
        className={`
          fixed top-0 right-0
          h-screen w-105 max-w-full
          bg-white
          z-60
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-hidden={!isOpen}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className="text-xl font-semibold">Cart ({totalItems})</h2>

          <button
            type="button"
            onClick={closeCart}
            className="hover:text-black transition-colors duration-300 cursor-pointer text-xl text-gray-400"
            aria-label="Close cart"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex items-center justify-center h-full p-4 text-center text-gray-500">
            Your cart is empty.
          </div>
        ) : (
          <div className="max-h-[calc(100vh-150px)] overflow-y-auto pb-32">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-gray-300 py-2 px-3 w-[90%] mx-auto mt-1"
              >
                <img
                  src={item.images?.[0] || ""}
                  alt={item.title || "Cart item"}
                  className="w-20 h-20 object-cover border border-gray-300 rounded-lg p-1"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium max-w-[95%] wrap-break-words">
                    {item.title || "Untitled product"}
                  </h3>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(item.price)}
                  </p>

                  <div className="flex items-center gap-3 mt-8">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition duration-300 cursor-pointer"
                      aria-label={`Remove ${item.title || "item"} from cart`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center h-8 bg-gray-100 rounded-full px-2">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-5 text-lg text-gray-400 hover:text-black transition-colors duration-300
                        cursor-pointer disabled:text-gray-300 disabled:cursor-auto"
                        disabled={item.quantity === 1}
                        aria-label={`Decrease ${item.title || "item"} quantity`}
                      >
                        -
                      </button>

                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        className="w-5 text-lg text-gray-400 hover:text-black transition-colors duration-300 cursor-pointer"
                        aria-label={`Increase ${item.title || "item"} quantity`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.08)]">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold">{formatCurrency(subtotal)}</span>
            </div>

            <Link to="/checkout" onClick={closeCart}>
              <button
                type="button"
                className="bg-blue-500 text-white px-8 py-3 mt-3 rounded-lg w-full hover:bg-blue-700 transition-all duration-300 cursor-pointer"
              >
                Secure checkout - {formatCurrency(subtotal)}
              </button>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
