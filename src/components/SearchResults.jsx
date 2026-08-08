import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatters";

function SearchResults({
  searchTerm = "",
  filteredProducts = [],
  closeSearch,
}) {
  const navigate = useNavigate();
  const results = Array.isArray(filteredProducts) ? filteredProducts : [];

  const handleProductClick = useCallback(
    (slug) => {
      if (!slug) return;

      navigate(`/products/${slug}`);
      closeSearch?.();
    },
    [closeSearch, navigate],
  );

  if (!searchTerm.trim()) {
    return null;
  }

  return (
    <div className="surface-card mx-auto w-full max-w-5xl overflow-hidden">
      <div className="max-h-100 overflow-y-auto p-6">
        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-semibold text-slate-800 dark:text-white">
              No products found
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Try another keyword or check spelling.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="lg:border-r border-gray-300 lg:pr-8">
              <h3 className="font-semibold text-2xl mb-6">Suggestions</h3>
              <div className="space-y-3">
                {results.slice(0, 5).map((product) => (
                  <button
                    key={`suggestion-${product.id ?? product.slug}`}
                    className="block w-full text-left text-gray-700 hover:text-blue-500 transition-colors text-sm cursor-pointer"
                    type="button"
                    onClick={() => handleProductClick(product.slug)}
                  >
                    {product.title || "Untitled product"}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:pl-0">
              <h3 className="font-semibold text-2xl mb-6">Products</h3>
              <div className="space-y-4">
                {results.slice(0, 5).map((product) => (
                  <button
                    key={`product-${product.id ?? product.slug}`}
                    className="flex w-full gap-3 cursor-pointer items-start hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 rounded-lg p-2 text-left"
                    type="button"
                    onClick={() => handleProductClick(product.slug)}
                  >
                    <img
                      src={product.images?.[0] || ""}
                      alt={product.title || "Product"}
                      className="h-18 w-18 object-contain rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-900 shrink-0"
                      loading="lazy"
                    />
                    <span className="flex-1 min-w-0">
                      <span className="block font-medium text-slate-900 dark:text-white text-sm line-clamp-2">
                        {product.title || "Untitled product"}
                      </span>
                      <span className="mt-1 block text-gray-600 text-sm font-semibold">
                        {formatCurrency(product.price)}
                      </span>
                      <span className={`mt-1 block text-xs font-semibold ${product.inStock === false ? "text-red-600 dark:text-red-300" : "text-emerald-600 dark:text-emerald-300"}`}>
                        {product.inStock === false ? "Out of stock" : "In stock"}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 px-6 py-3 text-xs text-gray-500">
        {results.length === 0
          ? `No results for "${searchTerm}".`
          : `Showing ${Math.min(results.length, 5)} result(s) for "${searchTerm}"`}
      </div>
    </div>
  );
}

export default memo(SearchResults);
