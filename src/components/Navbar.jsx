import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import Logo from "../assets/images/electro-logo.png";
import { useCart } from "../hooks/useCart";
import HamburgerButton from "./HamburgerButton";
import NavigationDrawer from "./NavigationDrawer";
import { navigationLinks } from "../data/navigationLinks";

const navLinkClassName = `
  relative
  w-fit
  whitespace-nowrap
  hover:text-blue-500
  transition-colors
  duration-300
  after:content-['']
  after:absolute
  after:left-0
  after:-bottom-1
  after:h-[1px]
  after:w-full
  after:bg-blue-500
  after:scale-x-0
  after:origin-left
  after:transition-transform
  after:duration-300
  hover:after:scale-x-100
`;

export default function Navbar({ openCart, openSearch }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setShowNavbar(
        currentScrollY <= 100 || currentScrollY < lastScrollY.current,
      );
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const mobileActions = [
    {
      label: "Search",
      onClick: openSearch,
      icon: <Search className="h-5 w-5" />,
    },
    {
      label: "Cart",
      onClick: openCart,
      icon: (
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-semibold text-white">
              {totalItems}
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <header className="w-full">
      <nav
        className={`fixed left-0 top-0 z-30 w-full bg-white shadow-md transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="hidden items-center justify-between gap-4 overflow-visible px-4 py-4 sm:px-6 lg:flex lg:py-6 lg:px-10">
          <div className="flex shrink-0 gap-4 text-xs font-bold text-gray-700 sm:gap-6 sm:text-sm">
            {navigationLinks.map((link) => (
              <Link key={link.to} to={link.to} className={navLinkClassName}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="absolute left-1/2 hidden -translate-x-1/2 transform text-xl font-bold lg:block">
            <Link to="/">
              <img src={Logo} alt="Electro" className="h-20" loading="eager" />
            </Link>
          </div>

          <div className="flex shrink-0 gap-5 sm:gap-10">
            <div className="group relative w-fit text-gray-700 transition-colors duration-300 hover:text-blue-500">
              <button
                type="button"
                onClick={openSearch}
                aria-label="Open search"
              >
                <Search className="h-6 w-6 cursor-pointer" />
              </button>

              <div className="pointer-events-none absolute left-1/2 top-10 z-10 -translate-x-1/2 translate-y-2 rounded-md bg-blue-500 px-3 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Search
              </div>
            </div>

            <div className="group relative w-fit text-gray-700 transition-colors duration-300 hover:text-blue-500">
              <button type="button" onClick={openCart} aria-label="Open cart">
                <ShoppingCart className="h-6 w-6 cursor-pointer" />
                {totalItems > 0 && (
                  <div
                    onClick={openCart}
                    className="absolute -right-3 -top-1.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white"
                  >
                    {totalItems}
                  </div>
                )}
              </button>

              <div className="pointer-events-none absolute left-1/2 top-10 z-10 -translate-x-1/2 translate-y-2 rounded-md bg-blue-500 px-3 py-2 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Cart
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:hidden">
          <Link to="/" className="flex shrink-0 items-center">
            <img
              src={Logo}
              alt="Electro"
              className="h-12 sm:h-14"
              loading="eager"
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {mobileActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={action.onClick}
                aria-label={action.label}
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
              >
                {action.icon}
              </button>
            ))}

            <HamburgerButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              ariaLabel={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
            />
          </div>
        </div>
      </nav>

      <NavigationDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
