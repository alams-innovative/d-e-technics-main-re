// app/(dash)/dashboard/quotes/[id]/edit/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface Quote {
  id: number
  name: string
  email: string
  phone?: string
  country_code?: string
  product?: string
  message?: string
  status: 'pending' | 'in_review' | 'sent' | 'won' | 'lost' | 'archived'
  owner_id?: number
  estimated_value: number
  created_at: string
  updated_at: string
  owner?: { username: string }
  country?: { country_name: string; flag_emoji?: string }
}

interface Country {
  country_code: string
  country_name: string
  flag_emoji?: string
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_review', label: 'In Review' },
  { value: 'sent', label: 'Sent' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
  { value: 'archived', label: 'Archived' },
]

export default function EditQuotePage() {
  const router = useRouter()
  const params = useParams()
  const quoteId = params.id as string

  const [quote, setQuote] = useState<Quote | null>(null)
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [csrfToken, setCsrfToken] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country_code: '',
    product: '',
    message: '',
    status: 'pending' as Quote['status'],
    estimated_value: 0,
  })

  useEffect(() => {
    fetchQuote()
    fetchCountries()
    fetchCsrfToken()
  }, [quoteId])

  const fetchQuote = async () => {
    try {
      const response = await fetch(`/api/quotes/${quoteId}`)
      if (!response.ok) {
        let errorMessage = 'Failed to fetch quote'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error?.message || `Server error: ${response.status} ${response.statusText}`
          console.error('Fetch quote error:', errorData)
        } catch (parseError) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`
          console.error('Failed to parse error response:', parseError)
        }
        
        if (response.status === 404) {
          toast.error('Quote not found')
          router.push('/dashboard/quotes')
          return
        }
        throw new Error(errorMessage)
      }
      
      const data = await response.json()
      setQuote(data.quote)
      setFormData({
        name: data.quote.name || '',
        email: data.quote.email || '',
        phone: data.quote.phone || '',
        country_code: data.quote.country_code || '',
        product: data.quote.product || '',
        message: data.quote.message || '',
        status: data.quote.status || 'pending',
        estimated_value: data.quote.estimated_value || 0,
      })
    } catch (error) {
      console.error('Error fetching quote:', error)
      toast.error('Failed to load quote')
      router.push('/dashboard/quotes')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCountries = async () => {
    try {
      const response = await fetch('/api/countries')
      if (response.ok) {
        const data = await response.json()
        setCountries(data.countries || [])
      }
    } catch (error) {
      console.error('Error fetching countries:', error)
    }
  }

  const fetchCsrfToken = async () => {
    try {
      const response = await fetch('/api/auth/session')
      if (response.ok) {
        const data = await response.json()
        setCsrfToken(data.csrfToken || '')
        console.log('CSRF token fetched successfully')
      } else {
        console.error('Failed to fetch CSRF token:', response.status, response.statusText)
        toast.error('Failed to load session data')
      }
    } catch (error) {
      console.error('Error fetching CSRF token:', error)
      toast.error('Failed to load session data')
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Build minimal PATCH payload with only changed fields
      const changes: Record<string, any> = {}
      const trim = (v: string) => (v ?? '').trim()

      if (quote) {
        if (trim(formData.name) !== trim(quote.name || '')) {
          changes.name = trim(formData.name)
        }
        if (trim(formData.email) !== trim(quote.email || '')) {
          changes.email = trim(formData.email)
        }
        if (trim(formData.phone) !== trim(quote.phone || '')) {
          const p = trim(formData.phone)
          if (p.length > 0) changes.phone = p
        }
        // Country code: only include if changed and non-empty
        const currentCC = trim(quote.country_code || '')
        const nextCC = trim(formData.country_code || '')
        if (nextCC !== currentCC) {
          if (nextCC.length > 0) changes.country_code = nextCC.toUpperCase()
        }
        if (trim(formData.product) !== trim(quote.product || '')) {
          const p = trim(formData.product)
          if (p.length > 0) changes.product = p
        }
        if (trim(formData.message) !== trim(quote.message || '')) {
          const m = trim(formData.message)
          if (m.length > 0) changes.message = m
        }
        if (formData.status !== quote.status) {
          changes.status = formData.status
        }
        if (Number(formData.estimated_value) !== Number(quote.estimated_value || 0)) {
          changes.estimated_value = Number(formData.estimated_value)
        }
      }

      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify(changes),
      })

      if (!response.ok) {
        let errorMessage = 'Failed to update quote'
        try {
          const errorData = await response.json()
          const details = errorData?.error?.details
          if (Array.isArray(details) && details.length > 0) {
            const first = details[0]
            const path = Array.isArray(first.path) ? first.path.join('.') : ''
            errorMessage = `Invalid input${path ? ` (${path})` : ''}: ${first.message}`
          } else {
            errorMessage = errorData.error?.message || `Server error: ${response.status} ${response.statusText}`
          }
          console.error('Quote update error:', errorData)
        } catch (parseError) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`
          console.error('Failed to parse error response:', parseError)
        }
        throw new Error(errorMessage)
      }

      toast.success('Quote updated successfully')
      router.push(`/dashboard/quotes/${quoteId}`)
    } catch (error) {
      console.error('Error updating quote:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to update quote')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit Quote</h1>
            <p className="text-muted-foreground">
              Quote ID: {quoteId}
            </p>
          </div>
        </div>
      </div>
      <Separator className="my-4" />

      {/* Edit Form */}
      <form onSubmit={handleSubmit}>
        <Card className="motion-safe:animate-in motion-safe:fade-in-50">
          <CardHeader>
            <CardTitle>Quote Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country_code || 'NONE'}
                  onValueChange={(value) => handleInputChange('country_code', value === 'NONE' ? '' : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">No country selected</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country.country_code} value={country.country_code}>
                        {country.flag_emoji ? `${country.flag_emoji} ` : ''}{country.country_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Product */}
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Input
                  id="product"
                  value={formData.product}
                  onChange={(e) => handleInputChange('product', e.target.value)}
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Estimated Value */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="estimated_value">Estimated Value (USD)</Label>
                <Input
                  id="estimated_value"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.estimated_value}
                  onChange={(e) => handleInputChange('estimated_value', parseFloat(e.target.value) || 0)}
                />
              </div>

              {/* Message */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Additional details or requirements..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
