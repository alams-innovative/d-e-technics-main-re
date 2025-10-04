"use client"

import React, { useEffect, useState } from "react"

interface FabBackToTopProps {
  showAfter?: number
  className?: string
}

export default function FabBackToTop({ showAfter = 300, className = "" }: FabBackToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false
    const updateVisibility = () => {
      setIsVisible(window.pageYOffset > showAfter)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateVisibility)
        ticking = true
      }
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [showAfter])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!isVisible) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg hover:shadow-xl transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 flex items-center justify-center ${className}`}
    >
      <i className="fas fa-arrow-up text-2xl" aria-hidden="true"></i>
    </button>
  )
}
