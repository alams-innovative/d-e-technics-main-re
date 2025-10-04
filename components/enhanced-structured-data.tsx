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

  const schemas: any[] = [baseSchema]

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

export function generateOrganizationEnhancedSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "D.E. Technics (Pvt.) Ltd.",
    "alternateName": "D.E. Technics",
    "url": "https://detechnics.com",
    "logo": "https://detechnics.com/images/logo.png",
    "description": "Leading horizontal form fill seal machine and wafer lines manufacturer in Pakistan. Premium HFFS packaging equipment, biscuit packaging machines, and wafer production lines since 1984.",
    "foundingDate": "1984",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Pakistan",
      "addressLocality": "Lahore"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+92-42-35301946",
      "contactType": "sales",
      "availableLanguage": ["English", "Urdu"]
    },
    "sameAs": [
      "https://www.facebook.com/detechnics",
      "https://www.linkedin.com/company/detechnics"
    ],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Horizontal Form Fill Seal Machines",
        "category": "Packaging Equipment"
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
      "Confectionery Packaging Equipment"
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
