import ProductList from "../components/ProductList";
import products from "../data/productsData";

export default function Laptops() {
  return (
    <section className="page-section"><div className="site-container">
      <header className="mb-8 sm:mb-10">
        <p className="eyebrow">Portable performance</p><h1 className="title mt-2 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Laptops
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
          Find reliable laptops for studying, remote work, gaming, and creative
          projects.
        </p>
      </header>
      <ProductList products={products.laptops} />
      </div>
    </section>
  );
}
