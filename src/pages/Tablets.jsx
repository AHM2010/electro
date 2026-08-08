import ProductList from "../components/ProductList";
import products from "../data/productsData";

export default function Tablets() {
  return (
    <section className="page-section">
      <div className="site-container">
        <header data-aos="fade-up" className="mb-8 sm:mb-10">
          <p className="eyebrow">Work and play</p>
          <h1 className="title mt-2 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Tablets
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            Explore versatile tablets designed for work, creativity, and
            everyday entertainment.
          </p>
        </header>
        <ProductList products={products.tablets} />
      </div>
    </section>
  );
}
