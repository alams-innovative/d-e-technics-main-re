"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface HeroSectionProps {
  title: string
  subtitle: string
  /**
   * Array of image paths to cycle through. If not provided, falls back to 3 bundled hero images.
   */
  slides?: string[]
  /**
   * Time (ms) each slide stays visible.
   */
  duration?: number
  className?: string
}

export default function HeroSection({
  title,
  subtitle,
  slides = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
  ],
  duration = 5000,
  className = "",
}: HeroSectionProps) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return // no rotation needed or paused
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), duration)
    return () => clearInterval(id)
  }, [slides.length, duration, isPaused])

  const goToSlide = (slideIndex: number) => {
    setIndex(slideIndex)
  }

  const goToPrevious = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setIndex((i) => (i + 1) % slides.length)
  }

  return (
    <section 
      className={`hero-section relative h-[450px] overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Hero background"
          fill
          priority={i === 0}
          className={`hero-slide object-cover transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
            aria-label="Previous slide"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
            aria-label="Next slide"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}


      {(title || subtitle) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            {title && <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{title}</h1>}
            {subtitle && <p className="text-xl md:text-2xl max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        </div>
      )}
    </section>
  )
}
