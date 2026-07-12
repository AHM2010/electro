import { useEffect, useState } from "react";
import laptopHero1 from "../assets/images/laptop-hero-1-phones.png";
import laptopHero2 from "../assets/images/laptop-hero-2-tablets.png";
import laptopHero3 from "../assets/images/laptop-hero-3-laptops.png";
import tabletHero1 from "../assets/images/tablet-hero-1-phones.png";
import tabletHero2 from "../assets/images/tablet-hero-2-laptops.png";
import tabletHero3 from "../assets/images/tablet-hero-3-tablets.png";
import phoneHero1 from "../assets/images/phone-hero-1-phones.png";
import phoneHero2 from "../assets/images/phone-hero-2-laptops.png";
import phoneHero3 from "../assets/images/phone-hero-3-tablets.png";

const slides = [
  {
    label: "Smartphones",
    phone: phoneHero1,
    tablet: tabletHero1,
    laptop: laptopHero1,
  },
  {
    label: "Tablets",
    phone: phoneHero2,
    tablet: tabletHero2,
    laptop: laptopHero2,
  },
  {
    label: "Laptops",
    phone: phoneHero3,
    tablet: tabletHero3,
    laptop: laptopHero3,
  },
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative -mt-5 overflow-hidden bg-slate-950"
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="100"
      data-aos-offset="0"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden md:aspect-[128/75] lg:aspect-[48/17]">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <picture
              key={slide.label}
              className="block h-full w-full flex-shrink-0"
            >
              <source media="(min-width:1024px)" srcSet={slide.laptop} />
              <source media="(min-width:768px)" srcSet={slide.tablet} />
              <img
                src={slide.phone}
                alt={`${slide.label} hero`}
                className="h-full w-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </picture>
          ))}
        </div>

        <div className="absolute left-1/2 bottom-[6%] z-10 flex -translate-x-1/2 flex-col items-center gap-4 sm:bottom-[10%] lg:bottom-8">
          <a
            href="#products"
            className="inline-block rounded-xl border border-white/70 bg-white/90 px-6 py-3 text-sm font-medium text-slate-950 shadow-sm backdrop-blur transition-all duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Shop Now
          </a>

          <div className="flex justify-center gap-4">
            {slides.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => setCurrentImage(index)}
                className={`h-3 w-3 rounded-full border border-white/70 transition-all duration-300 ease-in-out cursor-pointer ${
                  currentImage === index
                    ? "scale-125 bg-blue-600 border-blue-600"
                    : "bg-white/80 hover:bg-blue-500 hover:border-blue-500"
                }`}
                aria-label={`Show ${slide.label} slide`}
                aria-current={currentImage === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
