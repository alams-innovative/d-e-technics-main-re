"use client"

import Image from "next/image"
import Link from "next/link"
import ImageErrorBoundary from "./image-error-boundary"
import React from "react"

interface ProductCardProps {
  image: string
  title: string
  description: string
  link: string
  linkText?: string
}

export default function ProductCard({ image, title, description, link, linkText = "Learn More →" }: ProductCardProps) {
  // Fallback share URL is the card link (canonical product URL)
  const shareUrl = typeof window === 'undefined' ? link : (new URL(link, window.location.origin)).toString()
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(shareUrl)
  const waMsg = encodeURIComponent(`Hello! I'm interested in this product: ${title} ${shareUrl}`)
  return (
    <Link
      href={link}
      aria-label={`${title} – ${linkText}`}
      className="group bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <ImageErrorBoundary width={300} height={192} alt={title}>
        <Image
          src={image || "/placeholder.svg?height=200&width=300"}
          alt={`${title} - Professional packaging machine equipment by D.E. Technics Pakistan`}
          width={300}
          height={200}
          className="w-full aspect-[4/3] object-cover"
          loading="lazy"
        />
      </ImageErrorBoundary>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-3 leading-tight">{title}</h3>
        <p className="text-neutral-700 text-sm leading-relaxed mb-4">{description}</p>
        <span className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-transform duration-200 group-hover:translate-x-1">
          {linkText}
        </span>
        <div className="mt-4 pt-4 border-t border-neutral-200 flex items-center gap-3 text-neutral-600">
          <span className="text-xs">Share:</span>
          <button
            type="button"
            aria-label="Share on WhatsApp"
            className="w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-green-50 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}?text=${waMsg}`, '_blank', 'noopener,noreferrer')
            }}
          >
            <i className="fab fa-whatsapp text-green-600"></i>
          </button>
          <button
            type="button"
            aria-label="Share on Facebook"
            className="w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-blue-50 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank', 'noopener,noreferrer')
            }}
          >
            <i className="fab fa-facebook text-blue-600"></i>
          </button>
          <button
            type="button"
            aria-label="Share on X"
            className="w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-neutral-50 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank', 'noopener,noreferrer')
            }}
          >
            <i className="fab fa-x-twitter"></i>
          </button>
          <button
            type="button"
            aria-label="Share on LinkedIn"
            className="w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-sky-50 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank', 'noopener,noreferrer')
            }}
          >
            <i className="fab fa-linkedin text-sky-700"></i>
          </button>
        </div>
      </div>
    </Link>
  )
}
