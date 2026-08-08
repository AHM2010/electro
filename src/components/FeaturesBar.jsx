import { CreditCard, RefreshCw, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free shipping",
    description: "On orders over 7,000 SAR",
  },
  {
    icon: RefreshCw,
    title: "Exchange guarantee",
    description: "Straightforward 3-day exchange",
  },
  {
    icon: CreditCard,
    title: "Flexible payment",
    description: "Secure major card payments",
  },
  {
    icon: ShieldCheck,
    title: "Trusted checkout",
    description: "Clear totals and protected details",
  },
];

export default function FeaturesBar() {
  return (
    <section className="page-section">
      <div className="site-container">
        <div data-aos="fade-up" className="mb-8 text-center">
          <p className="eyebrow">Shop with confidence</p>
          <h2 className="title mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">
            The Electro promise
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className="surface-card p-5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-slate-950 dark:text-white">
                {title}
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
