import { useEffect, useRef } from "react";
import Logo from "../assets/images/electro-logo.png";
import { useCart } from "../hooks/useCart";
import { ShoppingCart } from "lucide-react";
import { inputStyles } from "./checkout/FormField";

export default function SearchDrawer({
  isOpen,
  closeSearch,
  openCart,
  searchTerm = "",
  setSearchTerm = () => {},
}) {
  const { totalItems } = useCart();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      <div
        onClick={closeSearch}
        className={`
          fixed inset-0
          bg-black/50
          backdrop-blur-sm
          transition-all duration-300
          z-40
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      <aside
        className={`
          fixed
          top-0
          left-0
          w-full
          h-40
          max-h-40
          bg-white
          z-50
          transition-transform
          duration-300
          overflow-hidden
          ${isOpen ? "translate-y-0" : "-translate-y-full"}
        `}
        aria-hidden={!isOpen}
      >
        <div className="mx-auto flex h-full w-full items-center justify-between gap-3 px-4 sm:w-[90%] sm:gap-4 sm:px-6">
          <div className="hidden sm:block">
            <img src={Logo} alt="Electro" className="h-17" loading="eager" />
          </div>

          <div className="relative min-w-0 flex-1 sm:w-[60%] sm:flex-none">
            <input
              ref={inputRef}
              type="search"
              placeholder="Search products"
              className={inputStyles}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="relative group w-fit text-gray-700 hover:text-blue-500 transition-colors duration-300">
            <button type="button" onClick={openCart} aria-label="Open cart">
              <ShoppingCart className="w-6 h-6 cursor-pointer" />
              {totalItems > 0 && (
                <div
                  onClick={openCart}
                  className="absolute -top-1.5 -right-3 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-semibold cursor-pointer"
                >
                  {totalItems}
                </div>
              )}
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 top-10 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-blue-500 text-white text-sm px-3 py-2 rounded-md whitespace-nowrap pointer-events-none">
              Cart
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
