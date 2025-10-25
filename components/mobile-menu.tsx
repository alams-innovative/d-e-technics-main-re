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
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  {
    label: "Products",
    href: "/products",
    subItems: [
      { label: "Horizontal Form Fill Seal", href: "/products/horizontal-form-fill-seal" },
      { label: "On Edge Biscuit Wrapping", href: "/products/on-edge-biscuit-wrapping" },
      { label: "Supporting Equipment", href: "/products/supporting-equipment" },
    ],
  },
  { label: "Wafer Lines", href: "/wafer-lines" },
  { label: "Export", href: "/export" },
  { label: "Our Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
]

export default function MobileMenu({ isOpen, onClose, menuItems = defaultMenuItems }: MobileMenuProps) {
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
    setExpandedItems((prev) => {
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
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] max-w-[85vw] bg-white shadow-2xl z-50 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <i className="fas fa-times text-gray-600 text-xl"></i>
          </button>
        </div>

        {/* Menu Items - Scrollable */}
        <nav className="overflow-y-auto h-[calc(100vh-73px)] py-2">
          {menuItems.map((item) => (
            <div key={item.label} className="border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                {item.disabled ? (
                  <span className="flex-1 px-4 sm:px-6 py-3.5 text-gray-400 cursor-not-allowed text-sm sm:text-base">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="flex-1 px-4 sm:px-6 py-3.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100 transition-colors text-sm sm:text-base font-medium"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                )}

                {item.subItems && (
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className="px-4 py-3.5 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label={`Toggle ${item.label} submenu`}
                    aria-expanded={expandedItems.has(item.label)}
                  >
                    <i className={`fas fa-chevron-${expandedItems.has(item.label) ? "up" : "down"} text-sm`}></i>
                  </button>
                )}
              </div>

              {/* Submenu with smooth animation */}
              {item.subItems && expandedItems.has(item.label) && (
                <div className="bg-gray-50 border-t border-gray-200 animate-in slide-in-from-top duration-200">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block px-8 sm:px-10 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 active:bg-gray-200 transition-colors"
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
