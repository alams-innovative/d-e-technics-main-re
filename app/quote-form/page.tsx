import type { Metadata } from 'next'
import ClientQuoteForm from './ClientQuoteForm'

export const metadata: Metadata = {
  title: 'Request a Quote - Packing Machine Price in Pakistan | D.E. Technics',
  description:
    'Request a quote for packing machine price in Pakistan from D.E. Technics. Get competitive prices for automatic packing machines, small packing machines, food packaging machines, powder packaging machines, blister packaging machines, sachet packaging machines, and buy packing machine solutions. Fast assistance available for packaging machine lahore inquiries.',
  keywords: 'packing machine price in Pakistan, small packing machine price in Pakistan, automatic packing machine price in Pakistan, buy packing machine, food packaging machine, powder packaging machine, blister packaging machine, sachet packaging machine, pillow packaging machine, plastic packaging machine, snack food packaging machine, bakery packaging machine, juice packaging machine, candy packaging machine, filling and packaging machine, sealing machines for packaging, machine manufacturer quote, packaging machine lahore',
  openGraph: {
    title: 'Request a Quote - Packing Machine Price in Pakistan | D.E. Technics',
    description: 'Get competitive packing machine price in Pakistan from D.E. Technics. Request quotes for automatic packing machines and packaging solutions.',
    images: ['/images/quote-form-hero.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request a Quote - Packing Machine Price in Pakistan | D.E. Technics',
    description: 'Get competitive packing machine price in Pakistan from D.E. Technics. Request quotes for automatic packing machines.',
    images: ['/images/quote-form-hero.jpg'],
  },
  alternates: {
    canonical: 'https://detechnics.com/quote-form',
  },
}

export default async function QuoteFormPage({ searchParams }: { searchParams: Promise<{ success?: string; error?: string }> }) {
  const sp = await searchParams
  const success = sp?.success === '1' ? '1' : undefined
  const error = sp?.error === '1' ? '1' : undefined

  return (
    <ClientQuoteForm success={success} error={error} />
  )
}
