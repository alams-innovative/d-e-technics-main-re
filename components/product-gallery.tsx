"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductGalleryProps {
  images: Array<{
    src: string
    alt: string
    thumbnail?: string
  }>
  className?: string
}

export default function ProductGallery({ 
  images, 
  className = "" 
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const activeImage = images[activeIndex]

  return (
    <div className={`product-gallery ${className}`}>
      {/* Main Image */}
      <div className="main-image-container mb-4">
        <div className="relative aspect-square w-full max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden">
          <Image
            id="main-product-image"
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="thumbnails-container">
          <div className="flex gap-2 justify-center overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`thumbnail flex-shrink-0 relative w-16 h-16 rounded border-2 overflow-hidden transition-all duration-200 ${
                  index === activeIndex 
                    ? "border-blue-500 ring-2 ring-blue-200" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                data-image={image.src}
              >
                <Image
                  src={image.thumbnail || image.src}
                  alt={`${image.alt} thumbnail`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
