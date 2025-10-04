"use client"
import type React from "react"

import Link from "next/link"

export default function Footer() {
  
  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">D.E. Technics</h3>
            <p className="text-gray-300 mb-4">
              D.E. Technics is a leading manufacturer of advanced machinery and equipment, dedicated to delivering
              innovative and high-quality solutions for various industries.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com/detechnicspk" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-blue-400 hover:bg-gray-600 hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Follow us on Facebook"
                target="_blank" rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://www.youtube.com/@DETechnicsPK" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-red-400 hover:bg-gray-600 hover:text-red-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Subscribe to our YouTube channel"
                target="_blank" rel="noopener noreferrer"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a 
                href="https://twitter.com/detechnicspk" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-blue-400 hover:bg-gray-600 hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Follow us on Twitter"
                target="_blank" rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-blue-400 hover:bg-gray-600 hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Connect with us on LinkedIn"
                target="_blank" rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 text-pink-400 hover:bg-gray-600 hover:text-pink-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Follow us on Instagram"
                target="_blank" rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-1">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-1">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-1">Services</Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-1">Products</Link>
              </li>
              <li>
                <Link href="/wafer-lines" className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-1">Wafer Lines</Link>
              </li>
              <li>
                <Link href="/export" className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-1">Export</Link>
              </li>
              {/* Blog link removed as requested */}
              <li>
                <Link href="/clients" className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-1">Our Clients</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-1">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                <span>Glaxo Town, 20th Km, Ferozepur Road Lahore-54760, Pakistan</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-mobile-alt mr-2"></i>
                <span>+92-333-0184756</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                <a
                  href="tel:+924235272601-02"
                  className="hover:text-white"
                  aria-label="Call landline +92 42 35272601-02"
                >
                  +92 42 35272601-02
                </a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <span>info@detechnics.com</span>
              </li>
            </ul>
          </div>

          
        </div>

        <div className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} <span className="whitespace-nowrap">D.E. Technics</span>. All rights reserved.
            <span className="mx-2">|</span>
            Digital Growth by{" "}
            <a
              href="https://alamsinnovate.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              Alams
            </a>{" "}
            <span aria-hidden>💚 Pakistan</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
