"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  menuItems?: Array<{
    label: string
    href: string
    disabled?: boolean
    subItems?: Array<{ label: string; href: string }>
  }>
}

const defaultMenuItems = [
  { label: "Home", href: "/" },
  { 
    label: "Products", 
    href: "/products",
    subItems: [
      { label: "Horizontal Form Fill Seal", href: "/products/horizontal-form-fill-seal" },
      { label: "On Edge Biscuit Wrapping", href: "/products/on-edge-biscuit-wrapping" },
      { label: "Supporting Equipment", href: "/products/supporting-equipment" },
    ]
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog", disabled: true }, // Temporarily disabled
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
]

export default function MobileMenu({ 
  isOpen, 
  onClose, 
  menuItems = defaultMenuItems 
}: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(label)) {
        newSet.delete(label)
      } else {
        newSet.add(label)
      }
      return newSet
    })
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Mobile Menu */}
      <div className="mobile-menu fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-xl z-50 transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="close-menu p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <i className="fas fa-times text-gray-600"></i>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="py-4">
          {menuItems.map((item) => (
            <div key={item.label} className="border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                {item.disabled ? (
                  <span className="flex-1 px-4 py-3 text-gray-400 cursor-not-allowed">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="flex-1 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                )}
                
                {item.subItems && (
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className="px-4 py-3 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label={`Toggle ${item.label} submenu`}
                  >
                    <i className={`fas fa-chevron-${expandedItems.has(item.label) ? 'up' : 'down'}`}></i>
                  </button>
                )}
              </div>

              {/* Submenu */}
              {item.subItems && expandedItems.has(item.label) && (
                <div className="bg-gray-50">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block px-8 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                      onClick={onClose}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        
      </div>
    </>
  )
}
