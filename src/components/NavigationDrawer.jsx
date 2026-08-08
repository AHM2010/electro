import { useEffect, useId, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { navigationLinks, secondaryLinks } from "../data/navigationLinks";

export default function NavigationDrawer({ isOpen, onClose }) {
  const location = useLocation();
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const focusableElements = drawerRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );

        if (!focusableElements || focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (
        previouslyFocused instanceof HTMLElement &&
        typeof previouslyFocused.focus === "function"
      ) {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleOutsideClick = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-40 lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`absolute top-0 right-0 flex h-full w-80 max-w-[88vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-slate-950 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex min-h-18 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
          <h2 id={titleId} className="text-lg font-semibold text-slate-900 dark:text-white">
            Navigation
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="icon-button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <nav aria-label="Mobile primary navigation" className="space-y-2">
            {navigationLinks.map((link) => {
              const isActive = location.pathname === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300"
                      : "text-slate-700 hover:bg-slate-100 hover:text-blue-500 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {secondaryLinks.length > 0 && (
              <div className="pt-3">
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  More
                </p>
                {secondaryLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className="flex min-h-12 items-center rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-blue-500 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </nav>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 p-4 dark:border-slate-800"><span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Appearance</span><ThemeToggle /></div>
      </aside>
    </div>
  );
}
