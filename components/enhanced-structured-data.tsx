interface FAQItem {
  question: string
  answer: string
}

interface ProductStructuredDataProps {
  product: {
    name: string
    description: string
    category: string
    images: string[]
    specifications: Record<string, string>
    applications: string[]
    features: string[]
  }
  faqs?: FAQItem[]
}

export function generateProductStructuredData({ product, faqs }: ProductStructuredDataProps) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": "D.E. Technics"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "D.E. Technics (Pvt.) Ltd.",
      "url": "https://detechnics.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Pakistan",
        "addressLocality": "Lahore"
      }
    },
    "image": product.images.map(img => `https://detechnics.com${img}`),
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD",
      "seller": {
        "@type": "Organization",
        "name": "D.E. Technics (Pvt.) Ltd."
      }
    },
    "additionalProperty": Object.entries(product.specifications).map(([key, value]) => ({
      "@type": "PropertyValue",
      "name": key,
      "value": value
    })),
    "applicationCategory": product.applications,
    "keywords": [
      "horizontal form fill seal machine",
      "HFFS machine", 
      "packaging equipment",
      "wafer lines manufacturer",
      "biscuit packaging machine",
      ...product.applications,
      product.category
    ].join(", ")
  }

  const schemas: Record<string, unknown>[] = [baseSchema]

  // Add FAQ structured data if provided
  if (faqs && faqs.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
    schemas.push(faqSchema)
  }

  return schemas
}

/**
 * Enhanced Organization Schema with full SEO features
 * This is the primary Organization schema used site-wide
 */
export function generateOrganizationEnhancedSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "D.E. Technics (Pvt.) Ltd.",
    "alternateName": "Dynamic Engineering",
    "url": "https://detechnics.com",
    "logo": "https://detechnics.com/images/logo.png",
    "description": "Leading packing machine manufacturer in Pakistan since 1984, specializing in horizontal form fill seal machines, wafer production lines, biscuit packaging machines, and advanced packaging automation solutions",
    "foundingDate": "1984",
    "founder": {
      "@type": "Person",
      "name": "Muhammad Haroon"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Glaxo Town, 20th Km, Ferozepur Road",
      "addressLocality": "Lahore",
      "postalCode": "54760",
      "addressCountry": "Pakistan"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-333-0184756",
      "email": "info@detechnics.com",
      "contactType": "customer service",
      "availableLanguage": ["English", "Urdu"]
    },
    "sameAs": [
      "https://www.facebook.com/detechnicspk",
      "https://www.youtube.com/@DETechnicsPK",
      "https://www.linkedin.com/company/detechnics"
    ],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Packaging Machinery Solutions",
        "category": "Industrial Packaging Equipment"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Pakistan"
    },
    "knowsAbout": [
      "Horizontal Form Fill Seal Machines",
      "HFFS Packaging Equipment", 
      "Wafer Production Lines",
      "Biscuit Packaging Machines",
      "Food Packaging Machinery",
      "Confectionery Packaging Equipment",
      "Automatic Packing Machines",
      "Industrial Automation"
    ],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "ISO Certification",
      "recognizedBy": {
        "@type": "Organization",
        "name": "International Organization for Standardization"
      }
    }
  }
}
