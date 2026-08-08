import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
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
  { label: "Smartphones", title: "Flagship power in your pocket", copy: "Discover advanced cameras, brilliant displays, and all-day performance.", phone: phoneHero1, tablet: tabletHero1, laptop: laptopHero1 },
  { label: "Tablets", title: "Create, stream, and go further", copy: "Versatile tablets built for focused work and immersive entertainment.", phone: phoneHero2, tablet: tabletHero2, laptop: laptopHero2 },
  { label: "Laptops", title: "Serious performance, beautifully portable", copy: "Premium laptops for ambitious work, creativity, and everything between.", phone: phoneHero3, tablet: tabletHero3, laptop: laptopHero3 },
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => setCurrentImage((prev) => (prev + 1) % slides.length), 5500);
    return () => window.clearInterval(interval);
  }, []);

  const move = (direction) => setCurrentImage((current) => (current + direction + slides.length) % slides.length);
  const activeSlide = slides[currentImage];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white" aria-roledescription="carousel" aria-label="Featured categories">
      <div className="relative min-h-[34rem] overflow-hidden sm:min-h-[38rem] lg:min-h-[min(42rem,calc(100vh-5rem))]">
        <div className="absolute inset-0 flex h-full transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
          {slides.map((slide, index) => (
            <picture key={slide.label} className="h-full w-full shrink-0">
              <source media="(min-width:1024px)" srcSet={slide.laptop} />
              <source media="(min-width:768px)" srcSet={slide.tablet} />
              <img src={slide.phone} alt="" className="h-full w-full object-cover object-center" loading={index === 0 ? "eager" : "lazy"} />
            </picture>
          ))}
        </div>
        <div className="absolute inset-0 bg-slate-950/90 lg:bg-gradient-to-r lg:from-slate-950 lg:via-slate-950/85 lg:to-slate-950/35" />
        <div className="site-container relative flex min-h-[34rem] items-center py-16 sm:min-h-[38rem] lg:min-h-[min(42rem,calc(100vh-5rem))]">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300"><ShieldCheck className="h-4 w-4" /> Trusted premium technology</p>
            <h1 className="title text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">{activeSlide.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">{activeSlide.copy}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#products" className="btn-primary">Shop now <ArrowRight className="h-4 w-4" /></a>
              <a href="#why-electro" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15">Why Electro</a>
            </div>
          </div>
        </div>
        <div className="site-container absolute inset-x-0 bottom-5 flex items-center justify-between">
          <div className="flex gap-2">
            {slides.map((slide, index) => <button key={slide.label} type="button" onClick={() => setCurrentImage(index)} className={`h-2.5 rounded-full transition-all ${currentImage === index ? "w-8 bg-blue-500" : "w-2.5 bg-white/50 hover:bg-white"}`} aria-label={`Show ${slide.label}`} aria-current={currentImage === index ? "true" : undefined} />)}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => move(-1)} className="icon-button border-white/20 bg-slate-950/40 text-white hover:bg-white hover:text-slate-950" aria-label="Previous slide"><ArrowLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => move(1)} className="icon-button border-white/20 bg-slate-950/40 text-white hover:bg-white hover:text-slate-950" aria-label="Next slide"><ArrowRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
