import { Laptop, Smartphone, Tablet } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { to: "/phones", label: "Phones", copy: "Flagship performance", icon: Smartphone },
  { to: "/tablets", label: "Tablets", copy: "Work and play anywhere", icon: Tablet },
  { to: "/laptops", label: "Laptops", copy: "Power for bigger ideas", icon: Laptop },
];

export default function Headline() {
  return (
    <section className="border-b border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="site-container grid gap-3 sm:grid-cols-3">
        {categories.map(({ to, label, copy, icon: Icon }) => (
          <Link key={to} to={to} className="group flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/50 dark:hover:bg-blue-500/10">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm dark:bg-slate-800 dark:text-blue-300"><Icon className="h-5 w-5" /></span>
            <span><strong className="block text-sm text-slate-950 dark:text-white">{label}</strong><span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">{copy}</span></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
