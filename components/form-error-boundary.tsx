"use client"

import type React from "react"
import { ErrorBoundary } from "./error-boundary"

interface FormErrorFallbackProps {
  error?: Error
  resetError: () => void
  formName?: string
}

function FormErrorFallback({ error, resetError, formName = "Form" }: FormErrorFallbackProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <i className="fas fa-exclamation-triangle text-red-400 text-xl"></i>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{formName} Error</h3>
          <p className="mt-1 text-sm text-red-700">
            The form encountered an error and couldn't be displayed. Please try refreshing the page.
          </p>
          {process.env.NODE_ENV === "development" && error && (
            <details className="mt-2">
              <summary className="cursor-pointer text-xs font-medium text-red-800">Error details</summary>
              <pre className="mt-1 text-xs text-red-600 bg-red-100 p-2 rounded overflow-auto max-h-32">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
      <div className="mt-4 flex space-x-3">
        <button
          onClick={resetError}
          className="bg-red-100 text-red-800 px-3 py-2 rounded text-sm hover:bg-red-200 transition-colors"
        >
          Try again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-white text-red-800 border border-red-300 px-3 py-2 rounded text-sm hover:bg-red-50 transition-colors"
        >
          Refresh page
        </button>
      </div>
    </div>
  )
}

interface FormErrorBoundaryProps {
  children: React.ReactNode
  formName?: string
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export default function FormErrorBoundary({ children, formName, onError }: FormErrorBoundaryProps) {
  return (
    <ErrorBoundary fallback={(props) => <FormErrorFallback {...props} formName={formName} />} onError={onError}>
      {children}
    </ErrorBoundary>
  )
}
