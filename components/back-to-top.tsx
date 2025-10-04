"use client"

import { useState, useEffect } from "react"

interface BackToTopProps {
  showAfter?: number
  className?: string
}

export default function BackToTop({ 
  showAfter = 300,
  className = ""
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const updateVisibility = () => {
      setIsVisible(window.pageYOffset > showAfter)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateVisibility)
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showAfter])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 w-12 h-12 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 z-50 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${className}`}
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up text-lg"></i>
    </button>
  )
}
