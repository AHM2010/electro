import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import SearchDrawer from "../components/SearchDrawer";
import { useCallback, useMemo, useState } from "react";
import { allProducts } from "../data/productsData";
import SearchResults from "../components/SearchResults";

export default function Layout({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) return [];

    return allProducts.filter((product) => {
      return (
        product.title?.toLowerCase().includes(normalizedSearchTerm) ||
        product.slug?.toLowerCase().includes(normalizedSearchTerm)
      );
    });
  }, [searchTerm]);

  return (
    <>
      <Navbar openCart={openCart} openSearch={openSearch} />
      <SearchDrawer
        isOpen={isSearchOpen}
        closeSearch={closeSearch}
        openCart={openCart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {isSearchOpen && searchTerm.trim() && (
        <div className="fixed left-0 right-0 top-40 z-50 w-full px-4 py-4 sm:px-6 lg:px-10">
          <SearchResults
            searchTerm={searchTerm}
            filteredProducts={filteredProducts}
            closeSearch={closeSearch}
          />
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} closeCart={closeCart} />
      <main
        className="pt-20"
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-offset="0"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
