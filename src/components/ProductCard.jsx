import { Check, PackageX, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/formatters";

const getCategory = (id) =>
  id <= 4 ? "Smartphone" : id <= 8 ? "Tablet" : "Laptop";

function ProductCard(product) {
  const {
    images = [],
    image,
    title = "Untitled product",
    price = 0,
    slug,
    id,
    rating = 4.7,
  } = product;
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const mainImage =
    Array.isArray(images) && images.length > 0 ? images[0] : image;
  const productPath = slug ? `/products/${slug}` : "/home";
  const isInStock = product.inStock !== false;

  const handleAdd = () => {
    if (!isInStock) return;

    addToCart(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="group surface-card flex h-full flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_20px_45px_rgba(15,23,42,0.10)] dark:hover:border-blue-500/50">
      <Link
        to={productPath}
        className="relative block aspect-square overflow-hidden bg-slate-50 p-5 dark:bg-slate-900"
        aria-label={`View ${title}`}
      >
        {mainImage ? (
          <img
            src={mainImage}
            alt={title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full rounded-xl bg-slate-100 dark:bg-slate-800" />
        )}
        <span
          className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur ${isInStock ? "border-emerald-200 bg-emerald-50/95 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300" : "border-red-200 bg-red-50/95 text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300"}`}
        >
          {isInStock ? "In stock" : "Out of stock"}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            {getCategory(id)}
          </p>
          <p
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300"
            aria-label={`Rated ${rating} out of 5`}
          >
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{" "}
            {rating}
          </p>
        </div>

        <Link to={productPath} className="mt-2">
          <h2 className="min-h-12 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-300 sm:text-lg">
            {title}
          </h2>
        </Link>

        <p className="mt-3 text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
          {formatCurrency(price)}
        </p>

        <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-4">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!isInStock}
            className="btn-primary min-h-11 px-3 py-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none dark:disabled:bg-slate-700 dark:disabled:text-slate-300"
            aria-live="polite"
          >
            {!isInStock ? (
              <PackageX className="h-4 w-4" />
            ) : added ? (
              <Check className="h-4 w-4" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
            {!isInStock ? "Out of stock" : added ? "Added" : "Add to cart"}
          </button>
          <Link
            to={productPath}
            className="btn-secondary min-h-11 px-3 py-2"
            aria-label={`View details for ${title}`}
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
