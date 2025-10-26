"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import { generateBreadcrumbSchema, generateFAQSchema, generateOrganizationSchema } from "@/lib/structured-data"
import { COMMON_BREADCRUMBS } from "@/lib/breadcrumb-utils"
import ProductsFilterGrid from "@/components/products-filter-grid"
import ProductsItemListJsonLd from "@/components/seo/ProductsItemListJsonLd"
import FAQSection from "@/components/seo/FAQSection"

// Enhanced FAQ data with Pakistan-specific keywords
const productFAQs = [
  {
    question: "What types of packaging machines do you manufacture in Pakistan?",
    answer:
      "We manufacture HFFS machines (horizontal form fill seal), biscuit packaging machines, wafer production lines, on-edge wrappers, flow wrappers, and complete packaging automation systems for food, confectionery, bakery, and pharmaceutical industries across Pakistan.",
  },
  {
    question: "What is an HFFS machine and how does it work?",
    answer:
      "HFFS (Horizontal Form Fill Seal) machine is an automatic packaging equipment that forms packages from roll film, fills them with product, and seals them in one continuous motion. Our HFFS machines handle speeds up to 250 packs/minute for biscuits, chocolates, soap bars, and bakery items.",
  },
  {
    question: "Do you provide installation and training for packaging machines?",
    answer:
      "Yes, we provide complete installation, commissioning, operator training, and after-sales support for all packaging machines across Pakistan including Lahore, Karachi, Faisalabad, and international markets.",
  },
  {
    question: "What industries use your packaging equipment?",
    answer:
      "Our packaging machines serve food processing, biscuit manufacturing, confectionery, bakery, pharmaceutical, soap manufacturing, and FMCG industries. We have 500+ installations across Pakistan and export markets.",
  },
  {
    question: "What is the difference between HFFS and flow wrapper machines?",
    answer:
      "HFFS (Horizontal Form Fill Seal) and flow wrapper are similar technologies. Both create pillow-pack style packages horizontally. Our machines use servo controls for precise sealing and can handle various product sizes from small candies to large bakery items.",
  },
  {
    question: "Do you manufacture wafer production lines?",
    answer:
      "Yes, we manufacture complete wafer production lines including DEW-31, DEW-45, and DEW-63 models with gas-fired ovens, cream spreading machines, cooling tunnels, wafer cutters, and batter mixing equipment. Production capacity ranges from 100-200 kg/hr.",
  },
  {
    question: "What is the warranty and after-sales support?",
    answer:
      "All packaging machines come with comprehensive warranty coverage. We provide 24/7 technical support, spare parts availability, preventive maintenance services, and operator training across Pakistan.",
  },
  {
    question: "Can your machines handle different product sizes?",
    answer:
      "Yes, our packaging machines feature quick changeover systems and adjustable parameters to handle various product sizes. HFFS machines accommodate packs from 80-300mm length, while biscuit wrappers handle both round and rectangular shapes.",
  },
]

// Enhanced structured data with multiple schema types
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://detechnics.com" },
  { name: "Products", url: "https://detechnics.com/products" },
])

const faqSchema = generateFAQSchema(productFAQs)

const organizationSchema = generateOrganizationSchema()

// Enhanced product catalog schema with aggregateRating
const productCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "D.E. Technics Packaging Machines & Equipment",
  description: "Complete range of packaging machines including HFFS, biscuit wrappers, wafer production lines",
  url: "https://detechnics.com/products",
  numberOfItems: 3,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Product",
        name: "DE-2050SS HFFS Machine",
        description:
          "High-speed horizontal form fill seal machine up to 250 packs/min for biscuits, soap bars & bakery items",
        image: "https://detechnics.com/images/de-2050ss.jpg",
        brand: { "@type": "Brand", name: "D.E. Technics" },
        category: "HFFS Machines",
        manufacturer: { "@type": "Organization", name: "D.E. Technics" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "113",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Product",
        name: "DE-4050 Biscuit Packaging Machine",
        description:
          "High-speed on-edge biscuit wrapping machine with dual-magazine feeding system up to 120 packs/min",
        image: "https://detechnics.com/images/de-4050.jpg",
        brand: { "@type": "Brand", name: "D.E. Technics" },
        category: "Biscuit Wrapping Machines",
        manufacturer: { "@type": "Organization", name: "D.E. Technics" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.6",
          reviewCount: "89",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Product",
        name: "DEW Wafer Production Lines",
        description:
          "Complete wafer production systems in 31, 45, and 63-plate configurations with 100-200 kg/hr capacity",
        image: "https://detechnics.com/images/dew-wafer-lines.jpg",
        brand: { "@type": "Brand", name: "D.E. Technics" },
        category: "Wafer Production Lines",
        manufacturer: { "@type": "Organization", name: "D.E. Technics" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.6",
          reviewCount: "41",
        },
      },
    },
  ],
}

// Added WebPage schema for better indexing
const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Packaging Machines Pakistan | HFFS Machine | Biscuit Wrapping Equipment",
  description:
    "Leading packaging machines manufacturer in Pakistan. HFFS machines, biscuit packaging machines, wafer production lines.",
  url: "https://detechnics.com/products",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "D.E. Technics",
    url: "https://detechnics.com",
  },
  breadcrumb: breadcrumbSchema,
  mainEntity: productCatalogSchema,
}

export default function ProductsPageClient() {
  return (
    <div>
      {/* Multiple schema types for comprehensive SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ProductsItemListJsonLd />

      <Header />

      {/* Semantic HTML with proper heading hierarchy */}
      <article>
        {/* Hero Section */}
        <header className="relative py-12 md:py-16 text-white overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/images/bg-banner.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-3" aria-label="Breadcrumb">
              <Breadcrumb items={COMMON_BREADCRUMBS.products} className="text-white" />
            </nav>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-balance">
              Packaging Machines Pakistan | HFFS Machine | Biscuit Wrapping Equipment
            </h1>
            <p className="text-base md:text-lg max-w-3xl text-pretty">
              Leading manufacturer of HFFS machines, biscuit packaging machines, wafer production lines & automatic
              packaging solutions
            </p>
          </div>
        </header>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-balance">
                Packaging Machines Manufacturer in Pakistan
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto text-pretty">
                ISO certified packaging machines manufacturer offering HFFS machines, horizontal form fill seal
                equipment, biscuit packaging machines, wafer production lines, and complete packaging automation
                systems. Trusted by 500+ manufacturers across Pakistan including Lahore, Karachi, Faisalabad and
                international markets.
              </p>
            </div>

            {/* Optimized for mobile with proper spacing */}
            <div className="mt-6 md:mt-8">
              <ProductsFilterGrid />
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="sr-only">Product Categories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* HFFS Machines */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <Image
                  src="/images/product-1.jpg"
                  alt="HFFS machine horizontal form fill seal packaging equipment for biscuit confectionery wrapping"
                  width={300}
                  height={192}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">HFFS Machines</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                    Premium HFFS machines (horizontal form fill seal) for biscuit packaging, chocolate wrapping,
                    confectionery applications, and bakery product packaging.
                  </p>
                  <Link
                    href="/products/hffs-machines"
                    className="text-sm md:text-base font-medium hover:opacity-80"
                    style={{ color: "#c8a415" }}
                  >
                    View HFFS Machines →
                  </Link>
                </div>
              </article>

              {/* Biscuit Wrapping */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <Image
                  src="/images/product-2.jpg"
                  alt="Biscuit packaging machine on-edge wrapping equipment for cookie bakery products"
                  width={300}
                  height={192}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Biscuit Packaging Machines</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                    Professional biscuit packaging machines and on-edge wrapping equipment with high-speed capabilities
                    for precise biscuit wrapping and cookie packaging.
                  </p>
                  <Link
                    href="/products/biscuit-wrapping"
                    className="text-sm md:text-base font-medium hover:opacity-80"
                    style={{ color: "#c8a415" }}
                  >
                    View Biscuit Wrappers →
                  </Link>
                </div>
              </article>

              {/* Wafer Lines */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <Image
                  src="/images/product-3.jpg"
                  alt="Wafer production line manufacturer equipment industrial wafer manufacturing systems"
                  width={300}
                  height={192}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Wafer Production Lines</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                    Complete wafer production lines from leading wafer lines manufacturer. Equipment including spreading
                    machines, cutters, and supporting equipment for industrial wafer manufacturing.
                  </p>
                  <Link
                    href="/products/wafer-lines"
                    className="text-sm md:text-base font-medium hover:opacity-80"
                    style={{ color: "#c8a415" }}
                  >
                    View Wafer Lines →
                  </Link>
                </div>
              </article>

              {/* Supporting Equipment */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <Image
                  src="/images/product-4.jpg"
                  alt="Packaging machinery supporting equipment mixers control panels production lines"
                  width={300}
                  height={192}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Supporting Equipment</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                    Auxiliary equipment including mixers, control panels, and processing equipment to complete your
                    production line.
                  </p>
                  <Link
                    href="/products/supporting-equipment"
                    className="text-sm md:text-base font-medium hover:opacity-80"
                    style={{ color: "#c8a415" }}
                  >
                    View Equipment →
                  </Link>
                </div>
              </article>
            </div>

            {/* Removed "buy" language, using consultation CTA */}
            <div className="mt-10 md:mt-12 text-center">
              <div className="rounded-lg p-6 md:p-8" style={{ backgroundColor: "rgba(200, 164, 21, 0.1)" }}>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
                  Need Help Choosing the Right Packaging Machine?
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                  Our packaging experts can help you find the perfect solution for your production requirements.
                </p>
                <Link
                  href="/contact"
                  className="inline-block text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg hover:opacity-90 transition-colors text-sm md:text-base"
                  style={{ backgroundColor: "#c8a415" }}
                >
                  Get Expert Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 md:py-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Featured Packaging Machines</h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Our most popular and versatile packaging machines trusted by manufacturers worldwide.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* DE-2050SS */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image
                  src="/images/product-1.jpg"
                  alt="DE-2050SS HFFS machine high-speed packaging equipment 250 packs per minute"
                  width={300}
                  height={192}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold mb-2">DE-2050SS HFFS Machine</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-3">
                    High-speed wrapping up to 250 packs/min for biscuits, soap bars & bakery items with advanced servo
                    control.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base font-medium" style={{ color: "#c8a415" }}>
                      Up to 250 packs/min
                    </span>
                    <Link
                      href="/products/de-2050ss"
                      className="text-sm md:text-base font-medium hover:opacity-80"
                      style={{ color: "#c8a415" }}
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </article>

              {/* DE-4050 */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image
                  src="/images/product-2.jpg"
                  alt="DE-4050 biscuit packaging machine on-edge wrapper dual-magazine feeding"
                  width={300}
                  height={192}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold mb-2">DE-4050 Biscuit Wrapper</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-3">
                    High-speed on-edge biscuit wrapping with dual-magazine feeding system and synchronized pushers.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base font-medium" style={{ color: "#c8a415" }}>
                      Up to 120 packs/min
                    </span>
                    <Link
                      href="/products/de-4050"
                      className="text-sm md:text-base font-medium hover:opacity-80"
                      style={{ color: "#c8a415" }}
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </article>

              {/* DEW Wafer Lines */}
              <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image
                  src="/images/product-3.jpg"
                  alt="DEW wafer production line 31 45 63 plate configurations industrial equipment"
                  width={300}
                  height={192}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold mb-2">DEW-31/45/63 Wafer Lines</h3>
                  <p className="text-sm md:text-base text-gray-600 mb-3">
                    Complete wafer production systems available in 31, 45, and 63-plate configurations with integrated
                    automation.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base font-medium" style={{ color: "#c8a415" }}>
                      100-200 kg/hr
                    </span>
                    <Link
                      href="/products/wafer-lines"
                      className="text-sm md:text-base font-medium hover:opacity-80"
                      style={{ color: "#c8a415" }}
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-12 md:py-16 bg-gray-50" aria-labelledby="features-heading">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              <h2 id="features-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                Why Choose Our Packaging Machines
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Our packaging machines are designed with advanced technology and built to deliver exceptional
                performance and reliability.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center p-5 md:p-6">
                <div
                  className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(200, 164, 21, 0.1)" }}
                >
                  <svg
                    className="w-7 h-7 md:w-8 md:h-8"
                    style={{ color: "#c8a415" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Advanced Technology</h3>
                <p className="text-sm md:text-base text-gray-600">
                  State-of-the-art servo controls and automation systems for precise and efficient operation.
                </p>
              </div>

              <div className="text-center p-5 md:p-6">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-7 h-7 md:w-8 md:h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Quality Materials</h3>
                <p className="text-sm md:text-base text-gray-600">
                  High-grade stainless steel construction and proven electrical components for durability.
                </p>
              </div>

              <div className="text-center p-5 md:p-6">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-7 h-7 md:w-8 md:h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">High Performance</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Optimized for high-speed production with minimal downtime and maximum efficiency.
                </p>
              </div>

              <div className="text-center p-5 md:p-6">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-7 h-7 md:w-8 md:h-8 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Easy Maintenance</h3>
                <p className="text-sm md:text-base text-gray-600">
                  User-friendly design with accessible components and comprehensive after-sales support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section with proper schema */}
        <FAQSection
          faqs={productFAQs}
          title="Frequently Asked Questions About Packaging Machines"
          description="Common questions about our HFFS machines, biscuit packaging equipment, and wafer production lines"
        />

        {/* Google Maps embed for local SEO */}
        <section className="py-12 md:py-16 bg-gray-50" aria-labelledby="location-heading">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-10">
              <h2 id="location-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                Visit Our Manufacturing Facility
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Located in Lahore, Pakistan. Serving manufacturers across Pakistan and international markets.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg" style={{ height: "400px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5947!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="D.E. Technics Location - Packaging Machines Manufacturer Lahore Pakistan"
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-12 md:py-16 text-white overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/images/bg-banner.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Find the Perfect Packaging Machine for Your Production
            </h2>
            <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
              Our packaging experts are ready to help you choose the right solution for your specific requirements and
              production goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] text-sm md:text-base"
                style={{ color: "#c8a415" }}
              >
                Get Quote
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center border-2 border-white text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg hover:bg-white transition-colors min-h-[44px] text-sm md:text-base"
                style={{ "--hover-color": "#1f2937" } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1f2937")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              >
                Our Services
              </Link>
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </div>
  )
}
