import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import products from "../data/productsData";
import ProductList from "./ProductList";

export default function ProductGrid() {
  const featuredProducts = [
    ...products.phones.slice(0, 2),
    ...products.tablets.slice(0, 1),
    ...products.laptops.slice(0, 1),
  ];

  return (
    <section id="products" className="page-section scroll-mt-20">
      <div className="site-container">
        <div
          data-aos="fade-up"
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="eyebrow">Curated for you</p>
            <h2 className="title mt-2 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Featured technology
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
              Flagship devices selected for performance, design, and everyday
              reliability.
            </p>
          </div>
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
          >
            Browse all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ProductList products={featuredProducts} />
      </div>
    </section>
  );
}
