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
        className={`mobile-menu-toggle lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors ${className}`}
        aria-label="Toggle mobile menu"
      >
        <i className="fas fa-bars text-xl"></i>
      </button>

      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />
    </>
  )
}
