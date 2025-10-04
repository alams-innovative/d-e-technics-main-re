"use client"

import { useFormValidation } from "@/hooks/use-form-validation"
import FormErrorBoundary from "./form-error-boundary"
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import type { FocusEvent, KeyboardEvent, MouseEvent, FormEvent, ClipboardEvent } from 'react'

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

interface ContactFormProps {
  title?: string
  description?: string
  className?: string
}

export default function ContactForm({
  title = "Send us a message",
  description = "Fill out the form and our team will get back to you shortly.",
  className = "",
}: ContactFormProps) {
  // Simplified phone input handlers - let PhoneInput handle most of the logic
  const handlePhoneFocus = (e: FocusEvent<HTMLInputElement>) => {
    // Let the PhoneInput component handle focus naturally
    setTimeout(() => {
      const input = e.currentTarget
      if (input.value && input.selectionStart !== null) {
        // If there's a value, position cursor at the end for better UX
        const endPos = input.value.length
        input.setSelectionRange(endPos, endPos)
      }
    }, 0)
  }
  
  const handlePhoneClick = (e: MouseEvent<HTMLInputElement>) => {
    // Allow natural clicking behavior
  }
  
  const handlePhoneKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Allow all natural keyboard behavior - PhoneInput handles country code protection
  }
  
  const handlePhoneBeforeInput = (e: FormEvent<HTMLInputElement>) => {
    // Allow all input - PhoneInput handles validation and formatting
  }
  
  const handlePhonePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    // Allow pasting - PhoneInput will format the pasted content
  }
  const {
    getFieldProps,
    getFieldError,
    getFieldClassName,
    handleSubmit,
    isSubmitting,
    submitError,
    submitSuccess
  } = useFormValidation({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationRules: {
      name: { required: true, minLength: 2 },
      email: { required: true, email: true },
      phone: { required: false, minLength: 8 },
      message: { required: true, minLength: 10 },
    },
    onSubmit: async (values) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message")
      }
    }
  })

  return (
    <FormErrorBoundary formName="Contact Form">
      <div className={`bg-white rounded-lg shadow-lg p-8 ${className}`}>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              {...getFieldProps("name")}
              className={getFieldClassName("name", "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500")}
            />
            {getFieldError("name") && (
              <div className="text-red-600 text-sm mt-1">{getFieldError("name")}</div>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              {...getFieldProps("email")}
              className={getFieldClassName("email", "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500")}
            />
            {getFieldError("email") && (
              <div className="text-red-600 text-sm mt-1">{getFieldError("email")}</div>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone (optional)</label>
            {(() => {
              const phoneField = getFieldProps("phone") as any
              const value = phoneField?.value ?? ""
              const onChange = (val: string | undefined) => {
                phoneField.onChange({ target: { name: "phone", value: val || "" } })
              }
              return (
                <PhoneInput
                  id="phone"
                  name="phone"
                  international
                  defaultCountry="PK"
                  countryCallingCodeEditable={false}
                  placeholder="Enter phone number"
                  className={getFieldClassName("phone", "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500")}
                  required={false}
                  flags={flags}
                  onFocus={handlePhoneFocus}
                  onClick={handlePhoneClick}
                  onKeyDown={handlePhoneKeyDown}
                  onBeforeInput={handlePhoneBeforeInput}
                  onPaste={handlePhonePaste}
                  value={value}
                  onChange={onChange}
                />
              )
            })()}
            {getFieldError("phone") && (
              <div className="text-red-600 text-sm mt-1">{getFieldError("phone")}</div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="subject">Subject (optional)</label>
            <input
              id="subject"
              type="text"
              placeholder="e.g., Product Inquiry, Technical Support, General Question"
              {...getFieldProps("subject")}
              className={getFieldClassName("subject", "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500")}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={5}
              required
              {...getFieldProps("message")}
              className={getFieldClassName("message", "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500")}
            />
            {getFieldError("message") && (
              <div className="text-red-600 text-sm mt-1">{getFieldError("message")}</div>
            )}
          </div>

          {submitError && (
            <div className="md:col-span-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              <strong>Error:</strong> {submitError}
            </div>
          )}
          {submitSuccess && (
            <div className="md:col-span-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg border border-green-200">
              <i className="fas fa-check-circle mr-2"></i>
              {submitSuccess}
            </div>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </FormErrorBoundary>
  )
}
