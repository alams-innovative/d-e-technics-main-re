import type { Metadata } from "next"

interface SEOConfig {
  title: string
  description: string
  keywords?: string
  image?: string
  path?: string
  noIndex?: boolean
  noFollow?: boolean
}

export function generateMetadata(config: SEOConfig): Metadata {
  const baseUrl = "https://detechnics.com"
  const fullUrl = config.path ? `${baseUrl}${config.path}` : baseUrl
  const imageUrl = config.image ? `${baseUrl}${config.image}` : `${baseUrl}/images/logo.png`

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    robots: {
      index: !config.noIndex,
      follow: !config.noFollow,
      googleBot: {
        index: !config.noIndex,
        follow: !config.noFollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: config.title,
      description: config.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      url: fullUrl,
      type: "website",
      siteName: "D.E. Technics",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [imageUrl],
      creator: "@detechnics",
      site: "@detechnics",
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        "en-US": fullUrl,
        "en-GB": fullUrl,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_SITE_VERIFICATION,
      other: {
        "msvalidate.01": process.env.BING_SITE_VERIFICATION || "",
      },
    },
  }
}

export const defaultSEO = {
  siteName: "D.E. Technics",
  baseUrl: "https://detechnics.com",
  defaultImage: "/images/logo.png",
  companyName: "D.E. Technics (Pvt.) Ltd.",
  phone: "+92-333-0184756",
  email: "info@detechnics.com",
  address: "Glaxo Town, 20th Km, Ferozepur Road Lahore-54760, Pakistan",
  description: "Leading packing machine manufacturer in Pakistan offering competitive prices for small packing machines, automatic packing machines, food packaging machines, powder packaging machines, blister packaging machines, sachet packaging machines, pillow packaging machines and specialized packaging solutions.",
  keywords: "packing machine, packing machine price in Pakistan, food packaging machine, powder packaging machine, blister packaging machine, sachet packaging machine, pillow packaging machine, plastic packaging machine, snack food packaging machine, bakery packaging machine, juice packaging machine, candy packaging machine, filling and packaging machine, sealing machines for packaging, machine manufacturer, flow wrapper, sachet packaging, sachet packing, seal machine, pack machine, heat seal machine, wrapper machine, heat and seal machine, GulfoodManufacturing, DubaiExhibition, ManufacturingInnovation, FoodIndustry, PackagingSolutions, SAMAEngineering, PakistanPavilion, MeetUsInDubai, GlobalExpo, PakistanEntrepreneursAward, AwardWinner, lahoreengineering, packingmachinery, packing, packingmachine, packaging, packagingmachine, wrappingmachinery, wrapping, biscuits, soap, cake, BeveragePackaging, DairyProcessing, PackagingMachinery, MetalDetectors, XRayInspection, QualityAssurance, millipack, packagingpakistan, packagingindustry, industrialprinters, foodprocessing, Strapack, PackagingStraps, SecureShipping, DurableStraps, ReliablePackaging, PrintedStraps, CustomBranding, honeypackaging, FoodGrade, SmallBusiness, honeystorage, LeakProof, Customizable, BrandingOpportunity, NewBusiness, Startups, WomenInBusiness",
  social: {
    facebook: "https://www.facebook.com/detechnicspk",
    youtube: "https://www.youtube.com/@DETechnicsPK",
    twitter: "@detechnics",
    linkedin: "https://www.linkedin.com/company/detechnics",
  },
}
