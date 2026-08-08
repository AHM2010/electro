import ProductCard from "./ProductCard";

export default function ProductList({ products = [], className = "" }) {
  const gridColumns =
    className || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="surface-card px-6 py-16 text-center">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          No products available
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Please check back soon for new arrivals.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 sm:gap-5 lg:gap-6 ${gridColumns}`}>
      {products.map((product, index) => (
        <div
          key={product.id ?? product.slug}
          data-aos="fade-up"
          data-aos-delay={Math.min(index * 70, 280)}
          className="h-full"
        >
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  );
}
