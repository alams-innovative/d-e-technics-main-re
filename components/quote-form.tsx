"use client"

import { useState, useMemo, type FocusEvent, type KeyboardEvent, type MouseEvent, type FormEvent, type ClipboardEvent } from "react"
import FormErrorBoundary from "./form-error-boundary"
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

export interface QuoteFormData {
  name: string
  email: string
  phone: string
  company: string
  product: string
  quantity: string
  requirements: string
}

interface QuoteFormProps {
  title?: string
  description?: string
  className?: string
  productName?: string
}

export default function QuoteForm({
  title = "Request a Quote",
  description = "Get a customized quote for your packaging machinery needs.",
  className = "",
  productName = "",
}: QuoteFormProps) {
  const [form, setForm] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: productName,
    quantity: "",
    requirements: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<QuoteFormData>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof QuoteFormData]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

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

  const validateForm = () => {
    const errors: Partial<QuoteFormData> = {}
    let isValid = true
    
    // Validate each field individually
    if (!form.name.trim()) {
      errors.name = "Name is required"
      isValid = false
    } else if (form.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
      isValid = false
    }
    
    if (!form.email.trim()) {
      errors.email = "Email is required"
      isValid = false
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(form.email)) {
        errors.email = "Please enter a valid email address"
        isValid = false
      }
    }
    
    if (!form.phone.trim()) {
      errors.phone = "Phone number is required"
      isValid = false
    } else if (form.phone.length < 8) {
      errors.phone = "Please enter a valid phone number"
      isValid = false
    }
    
    if (!form.company.trim()) {
      errors.company = "Company name is required"
      isValid = false
    }
    
    if (!form.product.trim()) {
      errors.product = "Product selection is required"
      isValid = false
    }
    
    if (!form.quantity.trim()) {
      errors.quantity = "Quantity is required"
      isValid = false
    }
    
    if (!form.requirements.trim()) {
      errors.requirements = "Requirements description is required"
      isValid = false
    } else if (form.requirements.trim().length < 10) {
      errors.requirements = "Requirements must be at least 10 characters"
      isValid = false
    }
    
    setFieldErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSuccess(null)
    setError(null)
    setFieldErrors({})

    // Client-side validation
    if (!validateForm()) {
      setSubmitting(false)
      return
    }

    try {
      // Map form fields to API expected fields  
      const apiPayload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        quantity: form.quantity,
        product: form.product,
        message: form.requirements // Only actual requirements in message
      }
      
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit quote request")
      }
      setSuccess("Your quote request has been submitted. We will contact you within 24 hours.")
      setForm({ 
        name: "", 
        email: "", 
        phone: "", 
        company: "", 
        product: productName, 
        quantity: "", 
        requirements: "" 
      })
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again later.")
    } finally {
      setSubmitting(false)
    }
  }

  const productOptions = [
    "DE-210 HFFS Machine",
    "DE-2000CW HFFS Machine", 
    "DE-4050 Biscuit Wrapper",
    "DE-2050SS HFFS Machine",
    "DE-2000 HFFS Machine",
    "DE-300 Biscuit Wrapper",
    "DEW-31 Wafer Line",
    "DEW-45 Wafer Line",
    "DEW-63 Wafer Line",
    "Wafer Spreading Machine",
    "Cream Mixer",
    "Batter Holding Tank",
    "Wafer Cutter",
    "Custom Solution"
  ]

  // Ensure the product from the current product page appears and is preselected
  const selectOptions = useMemo(() => {
    const set = new Set(productOptions)
    if (productName && !set.has(productName)) {
      return [productName, ...productOptions]
    }
    return productOptions
  }, [productName])

  return (
    <FormErrorBoundary formName="Quote Request Form">
      <div className={`bg-white rounded-lg shadow-lg p-8 ${className}`}>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1" htmlFor="quote-name">Name *</label>
            <input
              id="quote-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {fieldErrors.name && (
              <div className="text-red-600 text-sm mt-1">{fieldErrors.name}</div>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1" htmlFor="quote-email">Email *</label>
            <input
              id="quote-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {fieldErrors.email && (
              <div className="text-red-600 text-sm mt-1">{fieldErrors.email}</div>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1" htmlFor="quote-phone">Phone *</label>
            <PhoneInput
              id="quote-phone"
              name="phone"
              international
              defaultCountry="PK"
              countryCallingCodeEditable={false}
              placeholder="Enter phone number"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              required
              flags={flags}
              onFocus={handlePhoneFocus}
              onClick={handlePhoneClick}
              onKeyDown={handlePhoneKeyDown}
              onBeforeInput={handlePhoneBeforeInput}
              onPaste={handlePhonePaste}
              value={form.phone}
              onChange={(val) => {
                setForm((prev) => ({ ...prev, phone: val || '' }))
                // Clear phone error when user starts typing
                if (fieldErrors.phone) {
                  setFieldErrors(prev => ({ ...prev, phone: undefined }))
                }
              }}
            />
            {fieldErrors.phone && (
              <div className="text-red-600 text-sm mt-1">{fieldErrors.phone}</div>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium mb-1" htmlFor="quote-company">Company *</label>
            <input
              id="quote-company"
              name="company"
              type="text"
              required
              value={form.company}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.company ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {fieldErrors.company && (
              <div className="text-red-600 text-sm mt-1">{fieldErrors.company}</div>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="quote-product">Product/Machine *</label>
            <select
              id="quote-product"
              name="product"
              required
              value={form.product}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.product ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select a product...</option>
              {selectOptions.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
            {fieldErrors.product && (
              <div className="text-red-600 text-sm mt-1">{fieldErrors.product}</div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="quote-quantity">Quantity *</label>
            <input
              id="quote-quantity"
              name="quantity"
              type="text"
              placeholder="e.g. 1 unit, 2-3 machines"
              required
              value={form.quantity}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.quantity ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {fieldErrors.quantity && (
              <div className="text-red-600 text-sm mt-1">{fieldErrors.quantity}</div>
            )}
          </div>

          {/* Country field removed. Dial code is captured via phone input; backend derives country_code from phone. */}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="quote-requirements">
              Specific Requirements *
            </label>
            <textarea
              id="quote-requirements"
              name="requirements"
              rows={4}
              placeholder="Please describe your packaging requirements, production capacity needs, product specifications, etc."
              required
              value={form.requirements}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                fieldErrors.requirements ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {fieldErrors.requirements && (
              <div className="text-red-600 text-sm mt-1">{fieldErrors.requirements}</div>
            )}
          </div>

          {error && (
            <div className="md:col-span-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              <strong>Submission Error:</strong> {error}
            </div>
          )}
          {success && (
            <div className="md:col-span-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg">
              {success}
            </div>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 font-semibold"
            >
              {submitting ? "Submitting..." : "Request Quote"}
            </button>
          </div>
        </form>
      </div>
    </FormErrorBoundary>
  )
}
