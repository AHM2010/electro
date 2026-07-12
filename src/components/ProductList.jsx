import ProductCard from "./ProductCard";

export default function ProductList({ products = [], className = "" }) {
  const gridColumns = className || "grid-cols-1 lg:grid-cols-2";

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <p className="py-12 text-center text-gray-500">
        No products are available right now.
      </p>
    );
  }

  return (
    <div className={`grid gap-x-8 gap-y-14 ${gridColumns}`}>
      {products.map((product) => (
        <ProductCard key={product.id ?? product.slug} {...product} />
      ))}
    </div>
  );
}
