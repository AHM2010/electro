import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatters";

function ProductCard({
  images = [],
  image,
  title = "Untitled product",
  price = 0,
  slug,
}) {
  const mainImage =
    Array.isArray(images) && images.length > 0 ? images[0] : image;
  const productPath = slug ? `/products/${slug}` : "/home";

  return (
    <div className="group cursor-pointer" data-aos="fade-up">
      {/* IMAGE CONTAINER */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-300">
        {/* PRODUCT IMAGE */}
        <Link to={productPath}>
          {mainImage ? (
            <img
              src={mainImage}
              alt={title}
              className="
              w-full
              aspect-[4.7/5]
              object-cover
              transition duration-500
              group-hover:scale-105
            "
              loading="lazy"
            />
          ) : (
            <div className="aspect-[4.7/5] w-full bg-gray-100" />
          )}
        </Link>

        {/* HIDDEN BUTTON */}
        <Link
          to={productPath}
          className="
            absolute
            bottom-4
            left-1/2
            -translate-x-1/2
            translate-y-10
            opacity-0
            text-center

            bg-blue-600
            text-white
            px-6
            py-2
            rounded-xl
            w-full
            max-w-[90%]

            text-sm
            font-medium

            transition-all
            duration-300

            group-hover:translate-y-0
            group-hover:opacity-100
            
            hover:bg-blue-800

            cursor-pointer
          "
        >
          View Details
        </Link>
      </div>

      {/* PRODUCT INFO */}
      <div className="pt-4 space-y-1">
        <Link to={productPath}>
          <h2 className="title text-[18px] font-semibold py-0.5 text-black hover:text-blue-600 transition-colors duration-300">
            {title}
          </h2>
        </Link>

        <p className="text-[17px] text-gray-700">{formatCurrency(price)}</p>
      </div>
    </div>
  );
}

export default ProductCard;
