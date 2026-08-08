import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import WideLogoLight from "../assets/logos/electro-logo-wide-light.png";
import WideLogoDark from "../assets/logos/electro-logo-wide-dark.png";
import MiniLogoLight from "../assets/logos/electro-logo-mini-light.png";
import MiniLogoDark from "../assets/logos/electro-logo-mini-dark.png";
import { useCart } from "../hooks/useCart";
import HamburgerButton from "./HamburgerButton";
import NavigationDrawer from "./NavigationDrawer";
import ThemeToggle from "./ThemeToggle";
import { navigationLinks } from "../data/navigationLinks";

export default function Navbar({ openCart, openSearch }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav
        aria-label="Primary navigation"
        className={`border-b transition-all duration-200 ${
          isScrolled
            ? "border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/88"
            : "border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/80"
        }`}
      >
        <div className="site-container flex h-18 items-center justify-between gap-4 lg:h-20">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Electro home">
            <span className="sm:hidden">
              <img src={MiniLogoLight} alt="Electro" className="h-10 w-10 dark:hidden" loading="eager" />
              <img src={MiniLogoDark} alt="Electro" className="hidden h-10 w-10 dark:block" loading="eager" />
            </span>
            <span className="hidden sm:block">
              <img src={WideLogoLight} alt="Electro" className="h-11 w-auto dark:hidden" loading="eager" />
              <img src={WideLogoDark} alt="Electro" className="hidden h-11 w-auto dark:block" loading="eager" />
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/12 dark:text-blue-300"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button type="button" onClick={openSearch} className="icon-button" aria-label="Search products">
              <Search className="h-5 w-5" />
            </button>
            <span className="hidden min-[375px]:inline-flex"><ThemeToggle /></span>
            <button type="button" onClick={openCart} className="icon-button relative" aria-label={`Open cart with ${totalItems} items`}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
            <HamburgerButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              ariaLabel={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            />
          </div>
        </div>
      </nav>

      <NavigationDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
