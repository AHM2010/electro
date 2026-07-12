import { Menu } from "lucide-react";

export default function HamburgerButton({
  isOpen,
  onClick,
  ariaLabel = "Open navigation menu",
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation-drawer"
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:border-blue-500 hover:text-blue-500 lg:hidden cursor-pointer"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
