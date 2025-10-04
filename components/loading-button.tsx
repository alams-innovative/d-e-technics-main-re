"use client"

import type React from "react"

import { useState } from "react"
import LoadingSpinner from "./loading-spinner"

interface LoadingButtonProps {
  children: React.ReactNode
  onClick?: () => void | Promise<void>
  href?: string
  target?: string
  rel?: string
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  loadingText?: string
}

export default function LoadingButton({
  children,
  onClick,
  href,
  target,
  rel,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  loadingText = "Loading...",
}: LoadingButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500",
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-lg",
  }

  const handleClick = async () => {
    if (onClick && !isLoading && !disabled) {
      setIsLoading(true)
      try {
        await onClick()
      } finally {
        setIsLoading(false)
      }
    }
  }

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={buttonClasses} onClick={handleClick}>
        {isLoading && <LoadingSpinner size="sm" color="white" className="mr-2" />}
        {isLoading ? loadingText : children}
      </a>
    )
  }

  return (
    <button type={type} onClick={handleClick} disabled={disabled || isLoading} className={buttonClasses}>
      {isLoading && <LoadingSpinner size="sm" color="white" className="mr-2" />}
      {isLoading ? loadingText : children}
    </button>
  )
}
