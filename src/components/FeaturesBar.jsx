const benefits = [
  {
    icon: "bi-truck",
    title: "Free Shipping",
    description: "Free shipping for orders over 7000 SAR",
  },
  {
    icon: "bi-arrow-left-right",
    title: "Exchange Guarantee",
    description: "Within 3 days for exchange",
  },
  {
    icon: "bi-credit-card",
    title: "Flexible Payment",
    description: "Pay with Credit Cards",
  },
];

export default function FeaturesBar() {
  return (
    <section className="py-16 px-6" data-aos="fade-up">
      <h3 className="title text-3xl font-bold text-center mb-8 text-blue-500 pb-5 border-b-2 border-blue-500 w-fit mx-auto">
        Our features
      </h3>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 place-items-center mt-13">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div key={benefit.title} className="flex gap-5">
              <i className={`bi ${Icon} text-5xl text-black`} />
              <div>
                <h3 className="text-2xl font-medium">{benefit.title}</h3>
                <p className="mt-2 text-gray-500">{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
