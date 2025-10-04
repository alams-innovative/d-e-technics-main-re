"use client"

import React from "react"

interface FabWhatsAppProps {
  phoneNumber?: string
  message?: string
  className?: string
}

export default function FabWhatsApp({
  phoneNumber = "923330184756",
  message,
  className = "",
}: FabWhatsAppProps) {
  const pageUrl = typeof window !== "undefined" ? window.location.href : ""
  const defaultMessage = `Hello! I visited your website and would like to know more about your products. ${pageUrl}`
  const encodedMessage = encodeURIComponent(message || defaultMessage)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 flex items-center justify-center ${className}`}
    >
      <i className="fab fa-whatsapp text-2xl" aria-hidden="true"></i>
    </a>
  )
}
