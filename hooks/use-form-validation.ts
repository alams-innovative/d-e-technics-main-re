"use client"

import { useState, useCallback } from "react"

interface ValidationRule {
  required?: boolean
  email?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

interface FormField {
  value: string
  error: string | null
  touched: boolean
}

interface FormState {
  [key: string]: FormField
}

interface UseFormValidationProps {
  initialValues: Record<string, string>
  validationRules: Record<string, ValidationRule>
  onSubmit?: (values: Record<string, string>) => void | Promise<void>
}

export function useFormValidation({
  initialValues,
  validationRules,
  onSubmit
}: UseFormValidationProps) {
  const [formState, setFormState] = useState<FormState>(() => {
    const state: FormState = {}
    Object.keys(initialValues).forEach(key => {
      state[key] = {
        value: initialValues[key],
        error: null,
        touched: false
      }
    })
    return state
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

  const validateField = useCallback((name: string, value: string): string | null => {
    const rules = validationRules[name]
    if (!rules) return null

    // Required validation with specific field names
    if (rules.required && !value.trim()) {
      // Provide more specific error messages based on field name
      switch (name.toLowerCase()) {
        case 'name':
          return "Name is required"
        case 'email':
          return "Email address is required"
        case 'phone':
          return "Phone number is required"
        case 'message':
          return "Message is required"
        case 'subject':
          return "Subject is required"
        case 'company':
          return "Company name is required"
        case 'product':
          return "Product selection is required"
        case 'quantity':
          return "Quantity is required"
        case 'requirements':
          return "Requirements description is required"
        default:
          return "This field is required"
      }
    }

    // Skip other validations if field is empty and not required
    if (!value.trim() && !rules.required) {
      return null
    }

    // Email validation
    if (rules.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(value)) {
        return "Please enter a valid email address (e.g., john@example.com)"
      }
    }

    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      switch (name.toLowerCase()) {
        case 'name':
          return `Name must be at least ${rules.minLength} characters`
        case 'message':
          return `Message must be at least ${rules.minLength} characters`
        case 'phone':
          return "Please enter a valid phone number"
        default:
          return `Must be at least ${rules.minLength} characters`
      }
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      switch (name.toLowerCase()) {
        case 'phone':
          return "Please enter a valid phone number"
        case 'email':
          return "Please enter a valid email address"
        default:
          return "Invalid format"
      }
    }

    // Custom validation
    if (rules.custom) {
      return rules.custom(value)
    }

    return null
  }, [validationRules])

  const setValue = useCallback((name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        error: validateField(name, value),
        touched: true
      }
    }))
    
    // Clear submit messages when user starts typing
    if (submitError) setSubmitError(null)
    if (submitSuccess) setSubmitSuccess(null)
  }, [validateField, submitError, submitSuccess])

  const setFieldTouched = useCallback((name: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
        error: validateField(name, prev[name].value)
      }
    }))
  }, [validateField])

  const validateAllFields = useCallback(() => {
    const newState: FormState = {}
    let isValid = true

    Object.keys(formState).forEach(name => {
      const error = validateField(name, formState[name].value)
      newState[name] = {
        ...formState[name],
        error,
        touched: true
      }
      if (error) isValid = false
    })

    setFormState(newState)
    return isValid
  }, [formState, validateField])

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    setSubmitError(null)
    setSubmitSuccess(null)

    if (!validateAllFields()) {
      return
    }

    if (!onSubmit) return

    setIsSubmitting(true)

    try {
      const values: Record<string, string> = {}
      Object.keys(formState).forEach(key => {
        values[key] = formState[key].value
      })

      await onSubmit(values)
      setSubmitSuccess("Your message has been sent successfully! We'll get back to you soon.")
      
      // Reset form
      setFormState(prev => {
        const newState: FormState = {}
        Object.keys(prev).forEach(key => {
          newState[key] = {
            value: initialValues[key] || "",
            error: null,
            touched: false
          }
        })
        return newState
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      setSubmitError(`Failed to submit form: ${errorMessage}. Please check your information and try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }, [formState, validateAllFields, onSubmit, initialValues])

  const reset = useCallback(() => {
    setFormState(prev => {
      const newState: FormState = {}
      Object.keys(prev).forEach(key => {
        newState[key] = {
          value: initialValues[key] || "",
          error: null,
          touched: false
        }
      })
      return newState
    })
    setSubmitError(null)
    setSubmitSuccess(null)
  }, [initialValues])

  const getFieldProps = useCallback((name: string) => ({
    value: formState[name]?.value || "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
      setValue(name, e.target.value),
    onBlur: () => setFieldTouched(name),
    className: formState[name]?.error && formState[name]?.touched ? "border-red-500 bg-red-50" : ""
  }), [formState, setValue, setFieldTouched])

  const getFieldError = useCallback((name: string) => {
    const field = formState[name]
    return field?.touched && field?.error ? field.error : null
  }, [formState])

  const getFieldClassName = useCallback((name: string, baseClassName: string = "") => {
    const field = formState[name]
    const hasError = field?.touched && field?.error
    return `${baseClassName} ${hasError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`
  }, [formState])

  const isValid = Object.values(formState).every(field => !field.error)
  const hasErrors = Object.values(formState).some(field => field.error && field.touched)

  return {
    formState,
    setValue,
    setFieldTouched,
    handleSubmit,
    reset,
    getFieldProps,
    getFieldError,
    getFieldClassName,
    isValid,
    hasErrors,
    isSubmitting,
    submitError,
    submitSuccess
  }
}
