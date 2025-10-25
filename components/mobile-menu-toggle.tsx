"use client"

import { useState } from "react"
import MobileMenu from "./mobile-menu"

interface MobileMenuToggleProps {
  className?: string
}

export default function MobileMenuToggle({ className = "" }: MobileMenuToggleProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <button
        onClick={toggleMenu}
        className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
        aria-label="Toggle mobile menu"
        aria-expanded={isMenuOpen}
      >
        <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl sm:text-2xl`}></i>
      </button>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  )
}
