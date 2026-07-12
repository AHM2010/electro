import { useEffect, useMemo, useState } from "react";
import { useCart } from "../hooks/useCart";
import { ShoppingCart, Truck } from "lucide-react";
import { formatCurrency, formatDeliveryWindow } from "../utils/formatters";

export default function ProductPage({
  product,
  title = "Untitled product",
  price = 0,
  description = "No description is available for this product.",
  images = [],
  specs = {},
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart } = useCart();

  const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];
  const mainImage = safeImages[0];
  const galleryImages = safeImages.slice(1, 3);
  const specEntries = useMemo(() => Object.entries(specs || {}), [specs]);
  const deliveryWindow = useMemo(() => formatDeliveryWindow(), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  return (
    <section className="px-6 py-10 md:px-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          {mainImage ? (
            <img
              src={mainImage}
              alt={`${title} main`}
              className="w-full object-cover border border-gray-300 rounded-2xl"
              loading="eager"
            />
          ) : (
            <div className="w-full h-[450px] bg-gray-100 rounded-2xl" />
          )}

          {galleryImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`${title} ${index + 2}`}
                  className="w-full object-cover border border-gray-300 rounded-2xl px-2"
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>

        <div className="h-fit lg:sticky lg:top-24">
          <h1 className="title text-4xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h1>

          <p className="text-3xl text-gray-800 mt-6 font-medium">
            {formatCurrency(price)}
          </p>

          <div className="mt-8">
            <p className="mb-4 font-medium text-gray-800">Quantity</p>

            <div className="flex items-center justify-between w-[170px] border border-gray-300 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity === 1}
                className="px-5 py-3 text-xl hover:bg-gray-100 transition cursor-pointer disabled:text-gray-400 disabled:cursor-auto disabled:hover:bg-transparent"
                aria-label="Decrease quantity"
              >
                -
              </button>

              <span className="text-lg">{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
                className="px-5 py-3 text-xl hover:bg-gray-100 transition cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product, quantity)}
            disabled={!product}
            className="w-full bg-blue-500 text-white py-4 rounded-xl text-lg hover:bg-blue-700 transition-all duration-300 mt-8 font-medium cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Add to cart <ShoppingCart className="w-5 h-5 ml-2 inline-block" />
          </button>

          <div className="mt-6">
            <p className="flex flex-wrap items-center text-lg text-gray-800">
              <Truck className="w-6 h-6 mr-2 inline-block" />
              <span className="font-semibold">Estimated Delivery:</span>
              <span className="ml-3 font-medium text-gray-600">
                {deliveryWindow}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-24">
        <div className="relative md:border-b md:border-gray-300">
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-gray-100 p-1 md:flex md:flex-wrap md:gap-10 md:rounded-none md:bg-transparent md:p-0">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              aria-pressed={activeTab === "description"}
              className={`relative rounded-lg px-3 py-3 text-sm font-medium transition-all duration-300 md:rounded-none md:px-0 md:pb-4 md:pt-0 md:text-lg ${
                activeTab === "description"
                  ? "bg-white text-blue-500 shadow-sm md:bg-transparent md:shadow-none"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <span>Product Description</span>
              <div
                className={`absolute left-0 bottom-0 hidden h-[3px] w-full origin-left bg-blue-500 transition-transform duration-300 md:block ${activeTab === "description" ? "scale-x-100" : "scale-x-0"}`}
              />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("shipping")}
              aria-pressed={activeTab === "shipping"}
              className={`relative rounded-lg px-3 py-3 text-sm font-medium transition-all duration-300 md:rounded-none md:px-0 md:pb-4 md:pt-0 md:text-lg ${
                activeTab === "shipping"
                  ? "bg-white text-blue-500 shadow-sm md:bg-transparent md:shadow-none"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <span>Shipping & Return</span>
              <div
                className={`absolute left-0 bottom-0 hidden h-[3px] w-full origin-left bg-blue-500 transition-transform duration-300 md:block ${activeTab === "shipping" ? "scale-x-100" : "scale-x-0"}`}
              />
            </button>
          </div>
        </div>

        <div className="mt-6 mb-16 md:mt-10">
          {activeTab === "description" && (
            <div className="space-y-6">
              <p className="text-gray-500 mt-6">{description}</p>

              {specEntries.length > 0 && (
                <div className="space-y-5">
                  {specEntries.map(([key, value]) => (
                    <div key={key} className="flex gap-3 text-lg leading-8">
                      <span className="font-semibold uppercase text-gray-600">
                        {key}:
                      </span>
                      <span className="text-gray-400">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="text-gray-500 mt-6 space-y-4">
              <p>
                We want you to be 100% satisfied with your purchase. Items can
                be exchanged
                <span className="font-semibold"> within 3 days</span> of
                delivery and a fee is applied. No returns. If the item is
                received damaged, we will exchange it for free. Returns are not
                accepted unless the item arrives damaged. In approved cases,
                only the original shipping fee will be deducted.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
