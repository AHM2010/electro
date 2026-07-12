import { useParams } from "react-router-dom";
import { allProducts } from "../data/productsData";
import ProductPage from "../pages/ProductPage";

export default function ProductDetails() {
  const { slug } = useParams();
  const product = allProducts.find((item) => item.slug === slug);

  if (!product) {
    return (
      <section className="px-16 py-10">
        <h1 className="text-4xl font-semibold">Product not found</h1>
        <p className="mt-4 text-gray-600">
          We couldn't find the product you requested.
        </p>
      </section>
    );
  }

  return (
    <ProductPage
      product={product}
      title={product.title}
      price={product.price}
      images={product.images}
      description={product.description}
      specs={product.specs}
    />
  );
}
