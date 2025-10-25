import type { Metadata } from "next"

export interface SEOConfig {
  siteName: string
  baseUrl: string
  defaultTitle: string
  titleTemplate: string
  defaultDescription: string
  defaultImage: string
  defaultKeywords: string[]
  companyInfo: {
    name: string
    legalName: string
    foundingDate: string
    founder: string
    phone: string
    email: string
    address: {
      street: string
      city: string
      postalCode: string
      country: string
    }
    geo: {
      latitude: number
      longitude: number
    }
  }
  social: {
    facebook?: string
    twitter?: string
    linkedin?: string
    youtube?: string
    instagram?: string
  }
  verification: {
    google?: string
    bing?: string
    yandex?: string
    yahoo?: string
  }
  openingHours: {
    dayOfWeek: string[]
    opens: string
    closes: string
  }
}

export const seoConfig: SEOConfig = {
  siteName: "D.E. Technics",
  baseUrl: "https://detechnics.com",
  defaultTitle: "D.E. Technics - Leading Packaging Machine Manufacturer in Pakistan",
  titleTemplate: "%s | D.E. Technics",
  defaultDescription:
    "Leading packing machine manufacturer in Pakistan offering competitive prices for small packing machines, automatic packing machines, food packaging machines, powder packaging machines, blister packaging machines, sachet packaging machines, pillow packaging machines and specialized packaging solutions.",
  defaultImage: "/images/logo.png",
  defaultKeywords: [
    "packing machine",
    "packing machine price in Pakistan",
    "food packaging machine",
    "powder packaging machine",
    "blister packaging machine",
    "sachet packaging machine",
    "pillow packaging machine",
    "HFFS machine",
    "horizontal form fill seal",
    "wafer lines manufacturer",
    "biscuit packaging machine",
    "packaging equipment",
    "D.E. Technics",
  ],
  companyInfo: {
    name: "D.E. Technics",
    legalName: "D.E. Technics (Pvt.) Ltd.",
    foundingDate: "1984",
    founder: "Muhammad Haroon",
    phone: "+92-333-0184756",
    email: "info@detechnics.com",
    address: {
      street: "Glaxo Town, 20th Km, Ferozepur Road",
      city: "Lahore",
      postalCode: "54760",
      country: "Pakistan",
    },
    geo: {
      latitude: 31.413259,
      longitude: 74.3559486,
    },
  },
  social: {
    facebook: "https://www.facebook.com/detechnicspk",
    youtube: "https://www.youtube.com/@DETechnicsPK",
    twitter: "@detechnics",
    linkedin: "https://www.linkedin.com/company/detechnics",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    bing: process.env.BING_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_SITE_VERIFICATION,
  },
  openingHours: {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
}

export interface PageSEOOptions {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  path?: string
  noIndex?: boolean
  noFollow?: boolean
  type?: "website" | "article" | "product"
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function generatePageMetadata(options: PageSEOOptions): Metadata {
  const {
    title,
    description = seoConfig.defaultDescription,
    keywords = [],
    image,
    path = "",
    noIndex = false,
    noFollow = false,
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = [],
  } = options

  const fullUrl = `${seoConfig.baseUrl}${path}`
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${seoConfig.baseUrl}${image}`
    : `${seoConfig.baseUrl}${seoConfig.defaultImage}`

  const pageTitle = title
    ? title.includes(seoConfig.siteName)
      ? title
      : `${title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle

  const allKeywords = [...seoConfig.defaultKeywords, ...keywords].join(", ")

  const ogType = type === "product" ? "website" : type

  const metadata: Metadata = {
    title: pageTitle,
    description,
    keywords: allKeywords,
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || seoConfig.defaultTitle,
        },
      ],
      url: fullUrl,
      type: ogType,
      siteName: seoConfig.siteName,
      locale: "en_US",
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && ogType === "article" && { authors: [author] }),
      ...(section && ogType === "article" && { section }),
      ...(tags.length > 0 && ogType === "article" && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
      creator: seoConfig.social.twitter,
      site: seoConfig.social.twitter,
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        "en-US": fullUrl,
        "en-GB": fullUrl,
      },
    },
    verification: {
      google: seoConfig.verification.google,
      yandex: seoConfig.verification.yandex,
      yahoo: seoConfig.verification.yahoo,
      other: {
        "msvalidate.01": seoConfig.verification.bing || "",
      },
    },
  }

  return metadata
}
