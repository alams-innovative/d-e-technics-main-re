"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type HeroSliderProps = {
  images?: { src: string; alt?: string }[];
  autoPlayMs?: number;
};

export default function HeroSlider({
  images,
  autoPlayMs = 5000,
}: HeroSliderProps) {
  const slides = useMemo(
    () =>
      images ?? [
        { src: "/images/hero1.jpg", alt: "Hero image 1" },
        { src: "/images/hero2.jpg", alt: "Hero image 2" },
        { src: "/images/hero3.jpg", alt: "Hero image 3" },
      ],
    [images]
  );

  const [index, setIndex] = useState(0);

  // Auto play
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [slides.length, autoPlayMs]);

  const goTo = (i: number) => setIndex(((i % slides.length) + slides.length) % slides.length);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  return (
    <section className="relative h-[300px] md:h-[450px] lg:h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt || "Hero slide"}
            fill
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
            sizes="100vw"
            className="object-cover object-center"
            quality={85}
          />
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3 z-10 pb-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`relative h-[15px] w-[15px] rounded-full border-2 border-white/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/20 before:absolute before:inset-0 before:-m-4 before:rounded-full ${
              i === index ? "bg-white scale-110" : "bg-white/50 hover:bg-white/80"
            }`}
            style={{ minWidth: '44px', minHeight: '44px' }}
          />
        ))}
      </div>

      {/* Prev/Next Arrows */}
      <button
        aria-label="Previous slide"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-black/30 text-white/90 hover:bg-black/50 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/20"
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        <i className="fas fa-chevron-left text-lg" />
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-black/30 text-white/90 hover:bg-black/50 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/20"
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        <i className="fas fa-chevron-right text-lg" />
      </button>

      {/* Gradient overlay for readability if content added later */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
    </section>
  );
}
