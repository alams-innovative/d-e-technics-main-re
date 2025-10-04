"use client"

import Link from "next/link"
import Image from "next/image"
import MobileMenuToggle from "./mobile-menu-toggle"

export default function Header() {
  return (
    <>

      {/* Header with Navigation */}
      <header className="main-header bg-white py-3 shadow-lg relative z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 lg:gap-4">
          <div className="logo flex items-center flex-shrink-0">
            <Link href="/" className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
              <Image
                src="/images/logo.png"
                alt="D.E. Technics Logo"
                width={180}
                height={56}
                className="h-9 md:h-11 w-auto"
                priority
              />
            </Link>
          </div>
          <nav className="main-nav hidden lg:flex flex-1 justify-center" role="navigation" aria-label="Main navigation">
            <ul className="flex items-center gap-5 xl:gap-6">
              <li>
                <Link href="/" className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/wafer-lines" className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
                  Wafer Lines
                </Link>
              </li>
              <li>
                <Link href="/export" className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
                  Export
                </Link>
              </li>
              <li>
                {/* Blog removed as requested */}
              </li>
              <li>
                <Link href="/clients" className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
                  Our Clients
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-800 text-sm font-medium hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          
          <MobileMenuToggle />
        </div>
      </header>
    </>
  )
}
