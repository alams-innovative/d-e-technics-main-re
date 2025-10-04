"use client"

import { useMemo } from "react"

interface ProductShareProps {
  productName: string
}

export default function ProductShare({ productName }: ProductShareProps) {
  const pageUrl = useMemo(() => {
    if (typeof window === "undefined") return ""
    return window.location.href
  }, [])

  const encodedMsg = useMemo(() => {
    const msg = `Hello! I visited your website and am interested in this product: ${productName} ${pageUrl}`
    return encodeURIComponent(msg)
  }, [productName, pageUrl])

  const encodedTitle = encodeURIComponent(productName)
  const encodedUrl = encodeURIComponent(pageUrl)

  return (
    <div className="mt-6">
      <div className="text-sm text-neutral-600 mb-3">Share:</div>
      <div className="flex items-center gap-3">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-neutral-300 hover:bg-neutral-50"
        >
          <i className="fab fa-facebook-f"></i>
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-neutral-300 hover:bg-neutral-50"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-neutral-300 hover:bg-neutral-50"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a
          href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Pinterest"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-neutral-300 hover:bg-neutral-50"
        >
          <i className="fab fa-pinterest-p"></i>
        </a>
        <a
          href={`https://wa.me/923330184756?text=${encodedMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share via WhatsApp"
          className="inline-flex items-center gap-2 rounded-xl border border-green-600 text-green-700 px-4 h-10 hover:bg-green-50"
        >
          <i className="fab fa-whatsapp"></i>
          <span className="text-sm">WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
