import products from "../data/productsData";
import { Link } from "react-router-dom";
import ProductList from "./ProductList";

export default function ProductGrid() {
  const featuredProducts = [
    ...products.phones.slice(0, 2),
    ...products.tablets.slice(0, 1),
    ...products.laptops.slice(0, 1),
  ];

  return (
    <section
      id="products"
      className="max-w-7xl mx-auto py-10 px-4"
      data-aos="fade-up"
    >
      <h3 className="title text-3xl font-bold text-center mb-8 text-blue-500 pb-5 border-b-2 border-blue-500 w-fit mx-auto">
        Our Products
      </h3>
      {/* PRODUCTS GRID */}
      <ProductList
        products={featuredProducts}
        className="grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
      />

      {/* SHOP MORE BUTTON */}
      <div className="flex justify-center mt-16">
        <Link
          to="/home"
          className="
            border
            border-black
            px-6
            py-3
            rounded-xl
    
            text-sm
            font-medium
    
            transition-all
            duration-300
    
            hover:bg-blue-500
            hover:text-white
            hover:border-blue-500
    
            cursor-pointer
"
        >
          View More
        </Link>
      </div>
    </section>
  );
}
