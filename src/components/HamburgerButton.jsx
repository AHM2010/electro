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
      className="icon-button lg:hidden"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
