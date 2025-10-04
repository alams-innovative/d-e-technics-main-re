interface OrganizationData {
  name: string
  alternateName?: string
  url: string
  logo: string
  description: string
  foundingDate: string
  founder?: {
    name: string
  }
  address: {
    streetAddress: string
    addressLocality: string
    postalCode: string
    addressCountry: string
  }
  contactPoint: {
    telephone: string
    email: string
  }
  sameAs?: string[]
}

interface ProductData {
  name: string
  description: string
  image: string
  brand: string
  manufacturer: string
  category: string
  offers?: {
    availability: string
    priceCurrency?: string
  }
}

interface FAQData {
  question: string
  answer: string
}

interface ServiceData {
  name: string
  description: string
  provider: string
  serviceType: string
  areaServed: string[]
}

interface ReviewData {
  author: string
  reviewBody: string
  reviewRating: number
  datePublished?: string
  itemReviewed: string
}

export function generateOrganizationSchema(data: OrganizationData) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    ...(data.alternateName && { alternateName: data.alternateName }),
    url: data.url,
    logo: data.logo,
    description: data.description,
    foundingDate: data.foundingDate,
    ...(data.founder && { founder: { "@type": "Person", name: data.founder.name } }),
    address: {
      "@type": "PostalAddress",
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: data.contactPoint.telephone,
      contactType: "customer service",
      email: data.contactPoint.email,
    },
    ...(data.sameAs && { sameAs: data.sameAs }),
  }
}

export function generateProductSchema(data: ProductData) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    image: data.image,
    brand: {
      "@type": "Brand",
      name: "D.E. Technics",
    },
    manufacturer: {
      "@type": "Organization",
      name: "D.E. Technics (Pvt.) Ltd.",
      url: "https://detechnics.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "Pakistan",
        addressLocality: "Lahore"
      }
    },
    category: data.category,
    ...(data.offers && {
      offers: {
        "@type": "Offer",
        seller: {
          "@type": "Organization",
          name: "D.E. Technics (Pvt.) Ltd."
        },
        ...data.offers,
        availability: data.offers.availability || "https://schema.org/InStock",
      },
    }),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Industry",
        value: "Food & Beverage, Confectionery, Pharmaceuticals"
      },
      {
        "@type": "PropertyValue", 
        name: "Origin",
        value: "Pakistan"
      }
    ]
  }
}

export function generateFAQSchema(faqs: FAQData[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateServiceSchema(data: ServiceData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    provider: {
      "@type": "Organization",
      name: data.provider,
    },
    serviceType: data.serviceType,
    areaServed: data.areaServed.map((area) => ({
      "@type": "Country",
      name: area,
    })),
  }
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "D.E. Technics (Pvt.) Ltd.",
    image: "https://detechnics.com/images/logo.png",
    "@id": "https://detechnics.com",
    url: "https://detechnics.com",
    telephone: "+92-333-0184756",
    email: "info@detechnics.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Glaxo Town, 20th Km, Ferozepur Road",
      addressLocality: "Lahore",
      postalCode: "54760",
      addressCountry: "Pakistan",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.413259,
      longitude: 74.3559486,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: ["https://www.facebook.com/detechnicspk", "https://www.youtube.com/@DETechnicsPK"],
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && { 
        item: {
          "@type": "WebPage",
          "@id": item.url,
          name: item.name
        }
      }),
    })),
  }
}

export function generateReviewSchema(reviews: ReviewData[]) {
  return reviews.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author
    },
    reviewBody: review.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.reviewRating,
      bestRating: 5,
      worstRating: 1
    },
    itemReviewed: {
      "@type": "Organization",
      name: review.itemReviewed
    },
    ...(review.datePublished && { datePublished: review.datePublished })
  }))
}

// Default company data
export const companyData: OrganizationData = {
  name: "D.E. Technics (Pvt.) Ltd.",
  alternateName: "Dynamic Engineering",
  url: "https://detechnics.com",
  logo: "https://detechnics.com/images/logo.png",
  description: "Leading packing machine manufacturer in Pakistan since 1984, specializing in small packing machines, automatic packing machines, food packaging machines, powder packaging machines, blister packaging machines, sachet packaging machines, pillow packaging machines and advanced packaging automation solutions",
  foundingDate: "1984",
  founder: {
    name: "Muhammad Haroon",
  },
  address: {
    streetAddress: "Glaxo Town, 20th Km, Ferozepur Road",
    addressLocality: "Lahore",
    postalCode: "54760",
    addressCountry: "Pakistan",
  },
  contactPoint: {
    telephone: "+92-333-0184756",
    email: "info@detechnics.com",
  },
  sameAs: ["https://www.facebook.com/detechnicspk", "https://www.youtube.com/@DETechnicsPK"],
}
