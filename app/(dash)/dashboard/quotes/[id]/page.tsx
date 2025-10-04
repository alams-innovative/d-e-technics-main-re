// app/(dash)/dashboard/quotes/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, Edit, Download, Mail, Phone, MapPin, Calendar, DollarSign } from 'lucide-react'
import { format } from 'date-fns'

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
  owner?: {
    username: string
  }
  country?: {
    country_name: string
    flag_emoji?: string
  }
}

interface Event {
  id: number
  event_type: string
  changes: any
  created_at: string
  actor?: {
    username: string
  }
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  in_review: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  sent: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  won: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  lost: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
}

export default function QuoteDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [quote, setQuote] = useState<Quote | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('summary')

  useEffect(() => {
    if (params.id) {
      fetchQuote()
      fetchEvents()
    }
  }, [params.id])

  const fetchQuote = async () => {
    try {
      const response = await fetch(`/api/quotes/${params.id}`)
      if (!response.ok) {
        if (response.status === 404) {
          router.push('/dashboard/quotes')
          return
        }
        throw new Error('Failed to fetch quote')
      }
      const data = await response.json()
      setQuote(data.quote)
    } catch (error) {
      console.error('Error fetching quote:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchEvents = async () => {
    try {
      const response = await fetch(`/api/quotes/${params.id}/events`)
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const handleExport = async () => {
    try {
      const response = await fetch(`/api/quotes/${params.id}/export`, {
        method: 'POST'
      })
      
      if (!response.ok) throw new Error('Export failed')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `quote-${params.id}-${format(new Date(), 'yyyy-MM-dd')}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    )
  }

  if (!quote) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Quote not found</h2>
          <p className="text-muted-foreground mt-2">
            The quote you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button className="mt-4" onClick={() => router.push('/dashboard/quotes')}>
            Back to Quotes
          </Button>
        </div>
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
            <h1 className="text-3xl font-bold tracking-tight">
              Quote #{quote.id}
            </h1>
            <p className="text-muted-foreground">
              {quote.name} • {format(new Date(quote.created_at), 'MMM dd, yyyy')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button onClick={() => router.push(`/dashboard/quotes/${quote.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>
      <Separator className="my-4" />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/30">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Quote Details */}
            <Card className="motion-safe:animate-in motion-safe:fade-in-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Quote Details
                  <Badge 
                    variant="secondary" 
                    className={`${statusColors[quote.status]} whitespace-nowrap`}
                  >
                    {quote.status.replace('_', ' ')}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{quote.name}</p>
                      <p className="text-sm text-muted-foreground">{quote.email}</p>
                    </div>
                  </div>
                  
                  {quote.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{quote.phone}</p>
                    </div>
                  )}
                  
                  {quote.country && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div className="flex items-center gap-2">
                        <span>{quote.country.flag_emoji}</span>
                        <span className="text-sm">{quote.country.country_name}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">
                      Created {format(new Date(quote.created_at), 'PPP')}
                    </p>
                  </div>
                  
                  {quote.estimated_value > 0 && (
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">
                        ${quote.estimated_value.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Product & Message */}
            <Card className="motion-safe:animate-in motion-safe:fade-in-50">
              <CardHeader>
                <CardTitle>Product & Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quote.product && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Product</h4>
                    <p className="text-sm text-muted-foreground">{quote.product}</p>
                  </div>
                )}
                
                {quote.message && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Message</h4>
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {quote.message}
                    </div>
                  </div>
                )}
                
                {quote.owner && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Assigned To</h4>
                    <p className="text-sm text-muted-foreground">{quote.owner.username}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notes">
          <Card className="motion-safe:animate-in motion-safe:fade-in-50">
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>
                Internal notes and comments for this quote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground rounded-md border bg-muted/10">
                <p>Notes functionality coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="motion-safe:animate-in motion-safe:fade-in-50">
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>
                Timeline of changes and activities for this quote
              </CardDescription>
            </CardHeader>
            <CardContent>
              {events.length > 0 ? (
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        {index < events.length - 1 && (
                          <div className="w-px h-8 bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {event.event_type.replace('_', ' ')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(event.created_at), 'MMM dd, yyyy HH:mm')}
                          </p>
                        </div>
                        {event.actor && (
                          <p className="text-xs text-muted-foreground">
                            by {event.actor.username}
                          </p>
                        )}
                        {event.changes && (
                          <div className="text-xs text-muted-foreground mt-1">
                            <pre className="whitespace-pre-wrap">
                              {JSON.stringify(event.changes, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground rounded-md border bg-muted/10">
                  <p>No activity history available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
