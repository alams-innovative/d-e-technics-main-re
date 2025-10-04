'use client'

import { useState, FormEvent, KeyboardEvent, MouseEvent, FocusEvent, ClipboardEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Footer from '@/components/footer'
import './quote-form-styles.css'
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  product?: string
  message?: string
}

interface FormData {
  name: string
  email: string
  phone: string
  product: string
  message: string
}

interface Props {
  success?: string
  error?: string
}

export default function ClientQuoteForm({ success, error }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phone, setPhone] = useState<string | undefined>('')
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    product: '',
    message: ''
  })
  const router = useRouter()

  // Prevent caret from entering the non-editable country calling code area
  const getDialBoundary = (val: string): number => {
    // Match +<1-4 digits> followed by optional space or NBSP used by some formatters
    const m = val.match(/^\+\d{1,4}(?:[\s\u00A0])?/)
    return m ? m[0].length : 0
  }

  const handlePhoneBeforeInput = (e: FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const boundary = getDialBoundary(input.value)
    const start = input.selectionStart ?? 0
    // Block any insertion/replacement starting before the boundary
    if (start <= boundary) {
      e.preventDefault()
      input.setSelectionRange(boundary, boundary)
    }
  }

  const handlePhonePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const boundary = getDialBoundary(input.value)
    const start = input.selectionStart ?? 0
    if (start <= boundary) {
      // Prevent pasting into the dial code region
      e.preventDefault()
      input.setSelectionRange(boundary, boundary)
    }
  }

  const moveCaretAfterCode = (input: HTMLInputElement) => {
    const boundary = getDialBoundary(input.value)
    const pos = input.selectionStart ?? 0
    if (pos <= boundary) input.setSelectionRange(boundary, boundary)
  }

  const handlePhoneFocus = (e: FocusEvent<HTMLInputElement>) => {
    moveCaretAfterCode(e.currentTarget)
  }

  const handlePhoneClick = (e: MouseEvent<HTMLInputElement>) => {
    moveCaretAfterCode(e.currentTarget)
  }

  const handlePhoneKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const boundary = getDialBoundary(input.value)
    const start = input.selectionStart ?? 0
    const end = input.selectionEnd ?? start
    if (e.key === 'Backspace' || e.key === 'Delete') {
      // Block deletion if caret is within or selection starts before the boundary
      if (start <= boundary) {
        e.preventDefault()
        input.setSelectionRange(boundary, boundary)
        return
      }
    }
    if (e.key === 'ArrowLeft' || e.key === 'Home') {
      if (start <= boundary + 1) {
        e.preventDefault()
        input.setSelectionRange(boundary, boundary)
      }
    }
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {}
    let isValid = true

    // Validate name
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
      isValid = false
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
      isValid = false
    }

    // Validate email
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
      isValid = false
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address'
        isValid = false
      }
    }

    // Validate phone
    if (!phone || phone.trim() === '') {
      errors.phone = 'Phone number is required'
      isValid = false
    } else if (phone.length < 8) {
      errors.phone = 'Please enter a valid phone number'
      isValid = false
    }

    // Validate product
    if (!formData.product.trim()) {
      errors.product = 'Product name is required'
      isValid = false
    }

    // Validate message
    if (!formData.message.trim()) {
      errors.message = 'Message is required'
      isValid = false
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear field error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value)
    setFormData(prev => ({ ...prev, phone: value || '' }))
    
    // Clear phone error when user starts typing
    if (formErrors.phone) {
      setFormErrors(prev => ({ ...prev, phone: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Clear previous errors
    setFormErrors({})
    
    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    const submitFormData = new FormData()
    submitFormData.set('name', formData.name)
    submitFormData.set('email', formData.email)
    submitFormData.set('phone', phone || '')
    submitFormData.set('product', formData.product)
    submitFormData.set('message', formData.message)

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        body: submitFormData,
      })

      if (response.ok) {
        router.push('/quote-form?success=1')
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to submit form' }))
        throw new Error(errorData.error || 'Failed to submit form')
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      router.push('/quote-form?error=1')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="quoteContainer">
      <div className="quoteHeader">
        <h1>Request a Quote</h1>
        <p>
          Fill out the form below to request a quote for our products or services. Our team will get back to
          you within 24 hours with a detailed proposal.
        </p>
      </div>

      {success === '1' && (
        <div className="alert alertSuccess">
          Your quote request has been submitted. We will contact you within 24 hours.
        </div>
      )}

      {error === '1' && (
        <div className="alert alertError">
          Something went wrong submitting your request. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="quoteForm">
        <div className="formGroup">
          <label className="formLabel" htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleInputChange}
            className={`formControl ${formErrors.name ? 'error' : ''}`} 
            required 
          />
          {formErrors.name && (
            <div className="fieldError" style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {formErrors.name}
            </div>
          )}
        </div>

        <div className="formGroup">
          <label className="formLabel" htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleInputChange}
            className={`formControl ${formErrors.email ? 'error' : ''}`} 
            required 
          />
          {formErrors.email && (
            <div className="fieldError" style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {formErrors.email}
            </div>
          )}
        </div>

        <div className="formGroup formGroupFullWidth">
          <label className="formLabel" htmlFor="phone">Phone:</label>
          <div className="phoneInputContainer">
            <PhoneInput
              id="phone"
              name="phone"
              international
              defaultCountry="PK"
              countryCallingCodeEditable={false}
              placeholder="Enter phone number"
              className="formControl phoneNumber"
              required
              flags={flags}
              onFocus={handlePhoneFocus}
              onClick={handlePhoneClick}
              onKeyDown={handlePhoneKeyDown}
              onBeforeInput={handlePhoneBeforeInput}
              onPaste={handlePhonePaste}
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          {formErrors.phone && (
            <div className="fieldError" style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {formErrors.phone}
            </div>
          )}
        </div>

        <div className="formGroup formGroupFullWidth">
          <label className="formLabel" htmlFor="product">Product Name:</label>
          <input 
            type="text" 
            id="product" 
            name="product" 
            value={formData.product}
            onChange={handleInputChange}
            className={`formControl ${formErrors.product ? 'error' : ''}`} 
            required 
          />
          {formErrors.product && (
            <div className="fieldError" style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {formErrors.product}
            </div>
          )}
        </div>

        <div className="formGroup formGroupFullWidth">
          <label className="formLabel" htmlFor="message">Message:</label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message}
            onChange={handleInputChange}
            className={`formControl ${formErrors.message ? 'error' : ''}`} 
            rows={5} 
            required
          ></textarea>
          {formErrors.message && (
            <div className="fieldError" style={{ color: '#e53e3e', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {formErrors.message}
            </div>
          )}
        </div>

        <div className="formGroup formGroupFullWidth">
          <button type="submit" className="submitButton" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
          </button>
          <div className="formFooter">
            <p>
              By submitting this form, you agree to our{' '}
              <Link href="/policy#privacy-policy">Privacy Policy</Link> and{' '}
              <Link href="/policy#terms-of-service">Terms of Service</Link>.
            </p>
          </div>
        </div>
      </form>

      <section className="faqSection">
        <h2>Frequently Asked Questions</h2>
        <div className="faqContainer">
          <details className="faqItem">
            <summary className="faqQuestion">
              <h3>How do I request a quote?</h3>
            </summary>
            <div className="faqAnswer">
              <p>
                Fill out the quote form with your contact details and machine requirements; product pages also feature a "Request a Quote" button.
              </p>
            </div>
          </details>

          <details className="faqItem">
            <summary className="faqQuestion">
              <h3>Can I download a datasheet?</h3>
            </summary>
            <div className="faqAnswer">
              <p>
                Yes; each product page offers a downloadable datasheet containing specifications, pack dimensions and machine details.
              </p>
            </div>
          </details>

          <details className="faqItem">
            <summary className="faqQuestion">
              <h3>What details should I include in my request?</h3>
            </summary>
            <div className="faqAnswer">
              <p>
                Provide your name, company, contact information and specifics about the product or packaging solution you need; this helps the sales team prepare a tailored proposal.
              </p>
            </div>
          </details>

          <details className="faqItem">
            <summary className="faqQuestion">
              <h3>Can I request custom features?</h3>
            </summary>
            <div className="faqAnswer">
              <p>
                Yes; D.E. Technics specialises in custom‑engineered machines, so mention any unique requirements in your quote request.
              </p>
            </div>
          </details>

          <details className="faqItem">
            <summary className="faqQuestion">
              <h3>How will my request be handled?</h3>
            </summary>
            <div className="faqAnswer">
              <p>
                The sales team reviews your requirements, contacts you to discuss details and provides a tailored quotation. For further assistance, call or email using the contact details.
              </p>
            </div>
          </details>
        </div>
      </section>

      <Footer />
    </div>
  )
}
