import { Search, ShoppingCart, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useCart } from "../hooks/useCart";

export default function SearchDrawer({ isOpen, closeSearch, openCart, searchTerm = "", setSearchTerm = () => {} }) {
  const { totalItems } = useCart();
  const inputRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return undefined;
    inputRef.current?.focus();
    const onKeyDown = (event) => event.key === "Escape" && closeSearch();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeSearch]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <button type="button" onClick={closeSearch} aria-label="Close search" className={`absolute inset-0 h-full w-full bg-slate-950/55 backdrop-blur-sm transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`} />
      <aside role="dialog" aria-modal="true" aria-label="Search products" aria-hidden={!isOpen} className={`absolute inset-x-0 top-0 border-b border-slate-200 bg-white shadow-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950 ${isOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="site-container flex min-h-40 items-center gap-2 sm:gap-3"><div className="relative min-w-0 flex-1"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><label htmlFor="site-search" className="sr-only">Search products</label><input ref={inputRef} id="site-search" type="search" placeholder="Search phones, tablets, laptops…" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="h-13 w-full rounded-xl border border-slate-300 bg-slate-50 pl-12 pr-10 text-base text-slate-950 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />{searchTerm && <button type="button" onClick={() => setSearchTerm("")} className="absolute right-2 top-1/2 -translate-y-1/2 icon-button h-9 w-9" aria-label="Clear search"><X className="h-4 w-4" /></button>}</div><button type="button" onClick={openCart} className="icon-button relative" aria-label={`Open cart with ${totalItems} items`}><ShoppingCart className="h-5 w-5" />{totalItems > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">{totalItems}</span>}</button><button type="button" onClick={closeSearch} className="icon-button" aria-label="Close search"><X className="h-5 w-5" /></button></div>
      </aside>
    </div>
  );
}
