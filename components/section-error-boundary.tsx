"use client"

import type React from "react"
import { ErrorBoundary } from "./error-boundary"

interface SectionErrorFallbackProps {
  error?: Error
  resetError: () => void
  title?: string
  description?: string
}

function SectionErrorFallback({
  error,
  resetError,
  title = "Section Error",
  description = "This section encountered an error and couldn't load properly.",
}: SectionErrorFallbackProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <i className="fas fa-exclamation-circle text-red-400 text-xl"></i>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <p className="mt-1 text-sm text-red-700">{description}</p>
          {process.env.NODE_ENV === "development" && error && (
            <details className="mt-2">
              <summary className="cursor-pointer text-xs font-medium text-red-800">Technical details</summary>
              <pre className="mt-1 text-xs text-red-600 bg-red-100 p-2 rounded overflow-auto">{error.message}</pre>
            </details>
          )}
          <div className="mt-3">
            <button
              onClick={resetError}
              className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SectionErrorBoundaryProps {
  children: React.ReactNode
  title?: string
  description?: string
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export default function SectionErrorBoundary({ children, title, description, onError }: SectionErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={(props) => <SectionErrorFallback {...props} title={title} description={description} />}
      onError={onError}
    >
      {children}
    </ErrorBoundary>
  )
}
