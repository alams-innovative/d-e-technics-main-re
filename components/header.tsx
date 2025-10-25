"use client"

import Link from "next/link"
import Image from "next/image"
import MobileMenuToggle from "./mobile-menu-toggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
            >
              <Image
                src="/images/logo.png"
                alt="D.E. Technics Logo"
                width={180}
                height={56}
                className="h-10 sm:h-12 md:h-14 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <nav
            className="hidden lg:flex items-center justify-center flex-1 px-8"
            role="navigation"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-1 xl:gap-2">
              <li>
                <Link
                  href="/"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/wafer-lines"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Wafer Lines
                </Link>
              </li>
              <li>
                <Link
                  href="/export"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Export
                </Link>
              </li>
              <li>
                <Link
                  href="/clients"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Our Clients
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center lg:hidden">
            <MobileMenuToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
