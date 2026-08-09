import {
  Check,
  ChevronLeft,
  ChevronRight,
  Expand,
  Minus,
  PackageX,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../hooks/useCart";
import { formatCurrency, formatDeliveryWindow } from "../utils/formatters";

const prettyLabel = (label) =>
  label.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());

export default function ProductPage({
  product,
  title = "Untitled product",
  price = 0,
  description = "No description is available for this product.",
  images = [],
  specs = {},
  rating = 4.7,
  reviewCount = 0,
}) {
  const safeImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images],
  );
  const [activeImage, setActiveImage] = useState(safeImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [added, setAdded] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const closeViewerButtonRef = useRef(null);
  const { addToCart } = useCart();
  const specEntries = useMemo(() => Object.entries(specs || {}), [specs]);
  const isInStock = product?.inStock !== false;
  const activeImageIndex = Math.max(0, safeImages.indexOf(activeImage));

  const showPreviousImage = useCallback(() => {
    const previousIndex =
      (activeImageIndex - 1 + safeImages.length) % safeImages.length;
    setActiveImage(safeImages[previousIndex]);
  }, [activeImageIndex, safeImages]);

  const showNextImage = useCallback(() => {
    const nextIndex = (activeImageIndex + 1) % safeImages.length;
    setActiveImage(safeImages[nextIndex]);
  }, [activeImageIndex, safeImages]);

  useEffect(() => {
    if (!isImageViewerOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeViewerButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsImageViewerOpen(false);
      if (safeImages.length > 1 && event.key === "ArrowLeft") {
        showPreviousImage();
      }
      if (safeImages.length > 1 && event.key === "ArrowRight") {
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isImageViewerOpen, safeImages.length, showNextImage, showPreviousImage]);

  const handleAdd = () => {
    if (!isInStock) return;

    addToCart(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section className="page-section">
      <div className="site-container">
        <nav
          data-aos="fade-down"
          aria-label="Breadcrumb"
          className="mb-6 text-sm text-slate-500 dark:text-slate-400"
        >
          <a href="/home" className="hover:text-blue-600">
            Products
          </a>
          <span className="mx-2">/</span>
          <span className="text-slate-800 dark:text-slate-200">{title}</span>
        </nav>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,.9fr)] lg:gap-12">
          <div
            data-aos="fade-right"
            className="grid gap-3 sm:grid-cols-[5rem_1fr] sm:items-start"
          >
            <div
              className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col"
              aria-label="Product images"
            >
              {safeImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  className={`h-18 w-18 shrink-0 overflow-hidden rounded-xl border bg-white p-1.5 transition dark:bg-slate-900 sm:h-20 sm:w-20 ${activeImage === image ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200 hover:border-blue-300 dark:border-slate-700"}`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
            <div className="group relative order-1 flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:order-2 lg:p-8">
              {activeImage ? (
                <button
                  type="button"
                  onClick={() => setIsImageViewerOpen(true)}
                  className="flex h-full w-full cursor-zoom-in items-center justify-center"
                  aria-label={`View ${title} image ${activeImageIndex + 1} fullscreen`}
                >
                  <img
                    src={activeImage}
                    alt={title}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/70 text-white shadow-lg backdrop-blur-sm transition group-hover:bg-blue-600 sm:right-4 sm:top-4">
                    <Expand className="h-5 w-5" aria-hidden="true" />
                  </span>
                </button>
              ) : (
                <div className="h-full w-full bg-slate-100 dark:bg-slate-800" />
              )}
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-delay="100"
            className="h-fit lg:sticky lg:top-26"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${isInStock ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300"}`}
              >
                {isInStock ? "In stock" : "Out of stock"}
              </span>
              <span className="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />{" "}
                {rating}
                <span className="ml-1 font-normal text-slate-400">
                  ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                </span>
              </span>
            </div>
            <h1 className="title mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-3xl font-extrabold tracking-tight text-blue-600 dark:text-blue-300">
              {formatCurrency(price)}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              {description}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-300 bg-white p-1 dark:border-slate-700 dark:bg-slate-900 sm:w-36">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={!isInStock || quantity === 1}
                  className="icon-button h-10 w-10 disabled:opacity-35"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-bold tabular-nums">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  disabled={!isInStock}
                  className="icon-button h-10 w-10 disabled:opacity-35"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={handleAdd}
                disabled={!isInStock}
                className="btn-primary flex-1 text-base disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none dark:disabled:bg-slate-700 dark:disabled:text-slate-300"
                aria-live="polite"
              >
                {!isInStock ? (
                  <PackageX className="h-5 w-5" />
                ) : added ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <ShoppingCart className="h-5 w-5" />
                )}
                {!isInStock
                  ? "Out of stock"
                  : added
                    ? "Added to cart"
                    : "Add to cart"}
              </button>
            </div>

            <div className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                {isInStock ? (
                  <Truck className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                ) : (
                  <PackageX className="h-5 w-5 text-red-600 dark:text-red-300" />
                )}
                <span>
                  {isInStock ? (
                    <>
                      <strong>Estimated delivery:</strong>{" "}
                      {formatDeliveryWindow()}
                    </>
                  ) : (
                    <strong>Currently unavailable for delivery</strong>
                  )}
                </span>
              </p>
              <p className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                <span>Secure checkout and 3-day exchange guarantee</span>
              </p>
            </div>
          </div>
        </div>

        <div data-aos="fade-up" className="mt-12 lg:mt-20">
          <div
            className="overflow-x-auto border-b border-slate-200 dark:border-slate-800"
            role="tablist"
            aria-label="Product information"
          >
            <div className="flex min-w-max gap-6">
              {[
                ["description", "Description"],
                ["specifications", "Specifications"],
                ["shipping", "Shipping & returns"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === key}
                  onClick={() => setActiveTab(key)}
                  className={`border-b-2 px-1 pb-3 text-sm font-bold transition ${activeTab === key ? "border-blue-600 text-blue-600 dark:text-blue-300" : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="max-w-4xl py-7 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            {activeTab === "description" && <p>{description}</p>}
            {activeTab === "specifications" && (
              <dl className="grid overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 sm:grid-cols-2">
                {specEntries.map(([key, value]) => (
                  <div
                    key={key}
                    className="border-b border-slate-200 p-4 last:border-b-0 dark:border-slate-800 sm:nth-last-(-n+2):border-b-0"
                  >
                    <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      {prettyLabel(key)}
                    </dt>
                    <dd className="mt-1 font-semibold text-slate-900 dark:text-white">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            {activeTab === "shipping" && (
              <p>
                Exchange eligible items within 3 days of delivery. If your item
                arrives damaged, contact us immediately and we’ll arrange a free
                exchange. Standard shipping terms apply.
              </p>
            )}
          </div>
        </div>
      </div>

      {isImageViewerOpen &&
        activeImage &&
        createPortal(
          <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} image viewer`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsImageViewerOpen(false);
              }
            }}
          >
            <button
              ref={closeViewerButtonRef}
              type="button"
              onClick={() => setIsImageViewerOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white sm:right-6 sm:top-6"
              aria-label="Close fullscreen image"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            {safeImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white sm:left-6 sm:h-12 sm:w-12"
                  aria-label="View previous image"
                >
                  <ChevronLeft className="h-7 w-7" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white sm:right-6 sm:h-12 sm:w-12"
                  aria-label="View next image"
                >
                  <ChevronRight className="h-7 w-7" aria-hidden="true" />
                </button>
              </>
            )}

            <img
              src={activeImage}
              alt={`${title}, image ${activeImageIndex + 1} of ${safeImages.length}`}
              className="max-h-[calc(100vh-8rem)] max-w-[calc(100vw-2rem)] select-none object-contain sm:max-w-[calc(100vw-8rem)]"
            />

            <p
              className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm sm:bottom-6"
              aria-live="polite"
            >
              {activeImageIndex + 1} / {safeImages.length}
            </p>
          </div>,
          document.body,
        )}
    </section>
  );
}
