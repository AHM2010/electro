import ProductList from "../components/ProductList";
import products from "../data/productsData";

export default function Phones() {
  return (
    <section className="px-6 py-10 md:px-16" data-aos="fade-up">
      <header className="mb-8 sm:mb-10">
        <h1 className="title text-3xl font-semibold text-blue-500 sm:text-4xl">
          Phones
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
          Browse premium smartphones with powerful performance, stunning
          displays, and advanced camera technology.
        </p>
      </header>
      <ProductList products={products.phones} />
    </section>
  );
}
