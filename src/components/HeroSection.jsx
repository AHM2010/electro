import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useEffect, useReducer } from "react";
import smartphonesHero from "../assets/hero/electro-slider-smartphones.webp";
import tabletsHero from "../assets/hero/electro-slider-tablets.webp";
import laptopsHero from "../assets/hero/electro-slider-laptops.webp";

const slides = [
  {
    label: "Smartphones",
    title: "Flagship power in your pocket",
    copy: "Discover advanced cameras, brilliant displays, and all-day performance.",
    image: smartphonesHero,
  },
  {
    label: "Tablets",
    title: "Create, stream, and go further",
    copy: "Versatile tablets built for focused work and immersive entertainment.",
    image: tabletsHero,
  },
  {
    label: "Laptops",
    title: "Serious performance, beautifully portable",
    copy: "Premium laptops for ambitious work, creativity, and everything between.",
    image: laptopsHero,
  },
];

const initialCarouselState = {
  current: 0,
  previous: null,
  direction: "left",
  transition: 0,
};

function carouselReducer(state, action) {
  const next =
    action.type === "select"
      ? action.index
      : (state.current + action.step + slides.length) % slides.length;

  if (next === state.current) return state;

  const isReturningToFirst = state.current === slides.length - 1 && next === 0;
  const direction = isReturningToFirst
    ? "right"
    : action.type === "select"
      ? next > state.current
        ? "left"
        : "right"
      : action.step > 0
        ? "left"
        : "right";

  return {
    current: next,
    previous: state.current,
    direction,
    transition: state.transition + 1,
  };
}

export default function HeroSection() {
  const [carousel, dispatch] = useReducer(
    carouselReducer,
    initialCarouselState,
  );

  useEffect(() => {
    const interval = window.setInterval(
      () => dispatch({ type: "move", step: 1 }),
      5500,
    );
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    slides.slice(1).forEach((slide) => {
      const image = new window.Image();
      image.src = slide.image;
    });
  }, []);

  const activeSlide = slides[carousel.current];
  const previousSlide =
    carousel.previous === null ? null : slides[carousel.previous];

  return (
    <section
      className="relative overflow-hidden bg-slate-950 text-white"
      aria-roledescription="carousel"
      aria-label="Featured categories"
    >
      <div className="relative min-h-136 overflow-hidden sm:min-h-152 lg:min-h-[min(42rem,calc(100vh-5rem))]">
        <div className="absolute inset-0 h-full">
          {previousSlide && (
            <div
              key={`previous-${carousel.transition}`}
              className={`hero-slide hero-slide-exit-${carousel.direction}`}
            >
              <img
                src={previousSlide.image}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          )}
          <div
            key={`current-${carousel.transition}`}
            className={`hero-slide ${previousSlide ? `hero-slide-enter-${carousel.direction}` : ""}`}
          >
            <img
              src={activeSlide.image}
              alt=""
              className="h-full w-full object-cover object-center"
              loading={carousel.current === 0 ? "eager" : "lazy"}
            />
          </div>
        </div>
        <div className="hero-visual-overlay absolute inset-0" />
        <div className="site-container relative flex min-h-136 items-center py-16 sm:min-h-152 lg:min-h-[min(42rem,calc(100vh-5rem))]">
          <div className="max-w-2xl lg:max-w-[48%] xl:max-w-[46%]">
            <div key={activeSlide.label} className="hero-copy-enter">
              <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                <ShieldCheck className="h-4 w-4" /> Trusted premium technology
              </p>
              <h1 className="title text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                {activeSlide.title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                {activeSlide.copy}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#products" className="btn-primary">
                Shop now <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#why-electro"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                Why Electro
              </a>
            </div>
          </div>
        </div>
        <div className="site-container absolute inset-x-0 bottom-5 flex items-center justify-between">
          <div className="flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => dispatch({ type: "select", index })}
                className={`hero-slide-indicator h-2.5 rounded-full transition-all duration-300 ease-out ${carousel.current === index ? "w-8 bg-blue-500" : "w-2.5 bg-white/50 hover:bg-white hover:scale-105"}`}
                aria-label={`Show ${slide.label}`}
                aria-current={carousel.current === index ? "true" : undefined}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => dispatch({ type: "move", step: -1 })}
              className="icon-button border-white/20 bg-slate-950/40 text-white hover:bg-white hover:text-slate-950"
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "move", step: 1 })}
              className="icon-button border-white/20 bg-slate-950/40 text-white hover:bg-white hover:text-slate-950"
              aria-label="Next slide"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
