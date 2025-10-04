"use client"

import type React from "react"
import { useState } from "react"
import FormErrorBoundary from "./form-error-boundary"

interface NewsletterSignupProps {
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
  className?: string
}

function NewsletterForm({
  title = "Stay Updated",
  description = "Subscribe to our newsletter for the latest updates and offers.",
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    if (!email.trim()) {
      setMessage("Please enter your email address")
      setIsSubmitting(false)
      return
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to subscribe")
      }
      
      setMessage("Thank you for subscribing! You'll receive our latest updates.")
      setEmail("")
    } catch (err: any) {
      setMessage(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-gray-50 p-6 rounded-lg ${className}`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Subscribing..." : buttonText}
        </button>
      </form>

      {message && <p className="mt-2 text-green-600 text-sm">{message}</p>}
    </div>
  )
}

export default function NewsletterSignup(props: NewsletterSignupProps) {
  return (
    <FormErrorBoundary formName="Newsletter Signup">
      <NewsletterForm {...props} />
    </FormErrorBoundary>
  )
}
