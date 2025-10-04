"use client"

import type React from "react"
import { ErrorBoundary } from "./error-boundary"

interface ImageErrorFallbackProps {
  error?: Error
  resetError: () => void
  width?: number
  height?: number
  alt?: string
}

function ImageErrorFallback({ resetError, width = 300, height = 200, alt = "Image" }: ImageErrorFallbackProps) {
  return (
    <div
      className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500"
      style={{ width: width, height: height }}
    >
      <i className="fas fa-image text-2xl mb-2"></i>
      <p className="text-sm text-center px-2">Failed to load {alt}</p>
      <button
        onClick={resetError}
        className="mt-2 text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
      >
        Retry
      </button>
    </div>
  )
}

interface ImageErrorBoundaryProps {
  children: React.ReactNode
  width?: number
  height?: number
  alt?: string
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export default function ImageErrorBoundary({ children, width, height, alt, onError }: ImageErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={(props) => <ImageErrorFallback {...props} width={width} height={height} alt={alt} />}
      onError={onError}
    >
      {children}
    </ErrorBoundary>
  )
}
