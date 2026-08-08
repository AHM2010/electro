import { AtSign, Mail, MapPin, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";
import WideLogoDark from "../assets/logos/electro-logo-wide-dark.png";
import MiniLogoDark from "../assets/logos/electro-logo-mini-dark.png";

const shopLinks = [{ to: "/phones", label: "Phones" }, { to: "/tablets", label: "Tablets" }, { to: "/laptops", label: "Laptops" }];
const supportLinks = [{ to: "/contact", label: "Contact us" }, { to: "/checkout", label: "Checkout" }, { to: "/home", label: "All products" }];
const linkClass = "text-sm text-slate-400 transition hover:text-white focus-visible:text-white";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="site-container py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_.7fr_.7fr_1.2fr]">
          <div><Link to="/" aria-label="Electro home" className="inline-flex items-center"><img src={MiniLogoDark} alt="Electro" className="h-11 w-11 sm:hidden" /><img src={WideLogoDark} alt="Electro" className="hidden h-12 w-auto sm:block" /></Link><p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Premium technology chosen for performance, creativity, and everyday life.</p><div className="mt-5 space-y-2 text-sm text-slate-400"><p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Riyadh, Saudi Arabia</p><p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +966 11 000 0000</p></div></div>
          <div><h2 className="text-sm font-bold uppercase tracking-wider">Shop</h2><ul className="mt-4 space-y-3">{shopLinks.map((link) => <li key={link.to}><Link className={linkClass} to={link.to}>{link.label}</Link></li>)}</ul></div>
          <div><h2 className="text-sm font-bold uppercase tracking-wider">Support</h2><ul className="mt-4 space-y-3">{supportLinks.map((link) => <li key={link.to}><Link className={linkClass} to={link.to}>{link.label}</Link></li>)}</ul></div>
          <div><h2 className="text-sm font-bold uppercase tracking-wider">Get product updates</h2><p className="mt-3 text-sm text-slate-400">New devices, practical tips, and member offers.</p><form className="mt-4 flex gap-2" onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="footer-email">Email address</label><div className="relative min-w-0 flex-1"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /><input id="footer-email" type="email" required placeholder="Email address" className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-blue-500" /></div><button type="submit" className="btn-primary h-12 w-12 px-0" aria-label="Subscribe"><Send className="h-4 w-4" /></button></form><a href="https://www.instagram.com" className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><AtSign className="h-4 w-4" /> Instagram</a></div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Electro. All rights reserved.</p><p>Designed for smarter technology shopping.</p></div>
      </div>
    </footer>
  );
}
