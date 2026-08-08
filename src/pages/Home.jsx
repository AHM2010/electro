import ProductList from "../components/ProductList";
import { allProducts } from "../data/productsData";

export default function Home() {
  return (
    <section className="page-section">
      <div className="site-container">
      <header className="mb-8 sm:mb-10">
        <p className="eyebrow">Electro collection</p>
        <h1 className="title mt-2 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          All products
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
          Discover the latest electronics, smart devices, and everyday
          essentials curated for your lifestyle.
        </p>
      </header>
      <ProductList products={allProducts} />
      </div>
    </section>
  );
}
