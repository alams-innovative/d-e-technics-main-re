import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { headers } from "next/headers"
import { generateOrganizationEnhancedSchema } from "@/components/enhanced-structured-data"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/sonner"
import ErrorBoundary from "@/components/error-boundary"
import FabBackToTop from "@/components/FabBackToTop"
import FabWhatsApp from "@/components/FabWhatsApp"
import PublicOnly from "@/components/common/public-only"
import "./globals.css"
import 'react-phone-number-input/style.css'

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
  preload: true,
  adjustFontFallback: true,
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  preload: false, // Non-critical font
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://detechnics.com"),
  title: "Horizontal Form Fill Seal Machine | HFFS Packaging Machines Pakistan | D.E. Technics",
  description:
    "Leading horizontal form fill seal machine manufacturer in Pakistan. HFFS machines, wafer lines manufacturer, biscuit packaging machines with 40+ years expertise. Premium packaging solutions in Pakistan.",
  keywords:
    "horizontal form fill seal machine, HFFS machine, wafer lines manufacturer, packaging machines Pakistan, biscuit packaging machine, form fill seal machine, packaging machinery supplier, automatic packaging machine, food packaging equipment, confectionery packaging machines, pharmaceutical packaging, D.E. Technics, packaging equipment manufacturer, packaging lines, vacuum packaging machine, flow wrapper machine, flow wrapper, sachet packaging, sachet packing, seal machine, pack machine, heat seal machine, wrapper machine, heat and seal machine, GulfoodManufacturing, DubaiExhibition, ManufacturingInnovation, FoodIndustry, PackagingSolutions, SAMAEngineering, PakistanPavilion, MeetUsInDubai, GlobalExpo, PakistanEntrepreneursAward, AwardWinner, lahoreengineering, packingmachinery, packing, packingmachine, packaging, packagingmachine, wrappingmachinery, wrapping, biscuits, soap, cake, BeveragePackaging, DairyProcessing, PackagingMachinery, MetalDetectors, XRayInspection, QualityAssurance, millipack, packagingpakistan, packagingindustry, industrialprinters, foodprocessing, Strapack, PackagingStraps, SecureShipping, DurableStraps, ReliablePackaging, PrintedStraps, CustomBranding, honeypackaging, FoodGrade, SmallBusiness, honeystorage, LeakProof, Customizable, BrandingOpportunity, NewBusiness, Startups, WomenInBusiness",
  generator: "v0.app",
  openGraph: {
    type: "website",
    url: "https://detechnics.com/",
    title: "Horizontal Form Fill Seal Machine | HFFS Packaging Machines Pakistan | D.E. Technics",
    description:
      "Leading horizontal form fill seal machine manufacturer in Pakistan. HFFS machines, wafer lines manufacturer, biscuit packaging machines with 40+ years expertise.",
    images: [
      {
        url: "https://detechnics.com/images/hero1.jpg",
        width: 1200,
        height: 630,
        alt: "D.E. Technics Packaging Machines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizontal Form Fill Seal Machine | HFFS Packaging Machines Pakistan | D.E. Technics",
    description:
      "Leading horizontal form fill seal machine manufacturer in Pakistan. HFFS machines, wafer lines manufacturer, biscuit packaging machines with 40+ years expertise.",
    images: ["https://detechnics.com/images/hero1.jpg"],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Read CSP nonce set in middleware for strict CSP option
  const nonce = (await headers()).get('x-csp-nonce') || undefined
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        {/* Optimized resource hints for Core Web Vitals */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        
        {/* Optimized font loading for Core Web Vitals */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
        />
        
        {/* Defer non-critical Font Awesome */}
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        
        {/* Preload critical hero image for LCP optimization */}
        <link
          rel="preload"
          as="image"
          href="/images/hero1.jpg"
          fetchPriority="high"
        />
      </head>
      <body className="font-sans">
        <script 
          nonce={nonce}
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationEnhancedSchema()) }} 
        />
        <ErrorBoundary>
          {/* TopBar removed as per request */}
          <Suspense fallback={null}>{children}</Suspense>
          <PublicOnly>
            <FabBackToTop />
            <FabWhatsApp />
          </PublicOnly>
        </ErrorBoundary>
        {/* Global toast provider */}
        <Toaster richColors closeButton />
        <Analytics />
      </body>
    </html>
  )
}
