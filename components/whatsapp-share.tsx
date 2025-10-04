"use client"

import { useEffect, useState } from "react"

interface WhatsAppShareProps {
  phoneNumber?: string
  productTitle?: string
  customMessage?: string
  className?: string
  children?: React.ReactNode
}

export default function WhatsAppShare({
  phoneNumber = "923330184756",
  productTitle,
  customMessage,
  className = "",
  children
}: WhatsAppShareProps) {
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    // Get current page URL
    const pageUrl = window.location.href
    
    // Create share message
    let message = customMessage
    
    if (!message) {
      if (productTitle) {
        message = `Hello! I visited your website and am interested in this product: ${productTitle} ${pageUrl}`
      } else {
        message = `Hello! I visited your website and would like to know more about your products. ${pageUrl}`
      }
    }

    // Create WhatsApp URL
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    setShareUrl(whatsappUrl)
  }, [phoneNumber, productTitle, customMessage])

  const defaultContent = (
    <>
      <i className="fab fa-whatsapp mr-2"></i>
      Share on WhatsApp
    </>
  )

  return (
    <a
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-whatsapp inline-flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 ${className}`}
    >
      {children || defaultContent}
    </a>
  )
}
