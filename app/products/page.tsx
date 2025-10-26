import type { Metadata } from "next"
import ProductsPageClient from "./ProductsPageClient"

export const metadata: Metadata = {
  title: "Packaging Machines Pakistan | HFFS Machine | Biscuit Wrapping Machine | Wafer Production Lines",
  description:
    "Leading packaging machines manufacturer in Pakistan. HFFS machines, horizontal form fill seal equipment, biscuit packaging machines, wafer production lines, automatic packaging solutions. ISO certified packaging machinery for food, confectionery & bakery industries across Lahore, Karachi, Faisalabad.",
  keywords:
    "packaging machines Pakistan, HFFS machine, horizontal form fill seal machine, biscuit packaging machine, wafer production line, automatic packaging machine, flow wrapper Pakistan, biscuit wrapping machine, wafer packaging equipment, food packaging machinery, confectionery packaging, bakery packaging solutions, packaging machine manufacturer Pakistan, packaging equipment Lahore, packaging machinery Karachi, industrial packaging machines, pillow pack machine, on-edge wrapper, wafer lines manufacturer, cream spreading machine, packaging automation Pakistan",
  openGraph: {
    title: "Packaging Machines Pakistan | HFFS & Biscuit Wrapping Equipment",
    description:
      "ISO certified packaging machines manufacturer. HFFS machines, biscuit wrappers, wafer production lines. Trusted by 500+ manufacturers across Pakistan & export markets.",
    images: [
      {
        url: "/images/products-hero.jpg",
        width: 1200,
        height: 630,
        alt: "D.E. Technics packaging machines - HFFS, biscuit wrapping, wafer production equipment",
      },
    ],
    url: "https://detechnics.com/products",
    type: "website",
    siteName: "D.E. Technics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packaging Machines Pakistan | HFFS & Biscuit Wrapping Equipment",
    description:
      "ISO certified packaging machines manufacturer. HFFS machines, biscuit wrappers, wafer production lines for food & confectionery industries.",
    images: ["/images/products-hero.jpg"],
    creator: "@detechnics",
    site: "@detechnics",
  },
  alternates: {
    canonical: "https://detechnics.com/products",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function ProductsPage() {
  return <ProductsPageClient />
}
