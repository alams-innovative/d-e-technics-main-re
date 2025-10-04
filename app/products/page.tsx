import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import Breadcrumb from "@/components/breadcrumb"
import { generateProductSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/structured-data"
import { COMMON_BREADCRUMBS } from "@/lib/breadcrumb-utils"
import ProductsFilterGrid from "@/components/products-filter-grid"
import ProductsItemListJsonLd from "@/components/seo/ProductsItemListJsonLd"

export const metadata: Metadata = {
  title: "Packing Machine Price in Pakistan | Buy Packing Machine | D.E. Technics Products",
  description:
    "Best packing machine price in Pakistan. Buy small packing machines, automatic packing machines, shrink packaging machines, vacuum packaging machines, airtight packaging machines, food packaging machines, powder packaging machines, blister packaging machines, sachet packaging machines, pillow packaging machines & filling and packaging machines from leading machine manufacturer. Trusted packaging machine Lahore partner.",
  keywords:
    "packing machine, packing machine price in Pakistan, small packing machine price in Pakistan, shrink packaging machine, automatic packing machine price in Pakistan, buy packing machine, machine manufacturer, vacuum packaging machine, packaging machine manufacturer in Karachi, airtight packaging machine, horizontal form fill seal machine, HFFS machine, wafer lines manufacturer, packaging machines Pakistan, biscuit packaging machine, packaging machine lahore, chips packing machine in pakistan, food packaging machine, powder packaging machine, blister packaging machine, sachet packaging machine, pillow packaging machine, plastic packaging machine, snack food packaging machine, bakery packaging machine, juice packaging machine, filling and packaging machine, sealing machines for packaging, candy packaging machine, dairy packaging machine, D.E. Technics products, flow wrapper, sachet packaging, sachet packing, seal machine, pack machine, heat seal machine, wrapper machine, heat and seal machine, GulfoodManufacturing, DubaiExhibition, ManufacturingInnovation, FoodIndustry, PackagingSolutions, SAMAEngineering, PakistanPavilion, MeetUsInDubai, GlobalExpo, PakistanEntrepreneursAward, AwardWinner, lahoreengineering, packingmachinery, packing, packingmachine, packaging, packagingmachine, wrappingmachinery, wrapping, biscuits, soap, cake, BeveragePackaging, DairyProcessing, PackagingMachinery, MetalDetectors, XRayInspection, QualityAssurance, millipack, packagingpakistan, packagingindustry, industrialprinters, foodprocessing, Strapack, PackagingStraps, SecureShipping, DurableStraps, ReliablePackaging, PrintedStraps, CustomBranding, honeypackaging, FoodGrade, SmallBusiness, honeystorage, LeakProof, Customizable, BrandingOpportunity, NewBusiness, Startups, WomenInBusiness",
  openGraph: {
    title: "Packing Machine Price in Pakistan | Buy Packing Machine | D.E. Technics Products",
    description:
      "Best packing machine price in Pakistan. Buy small packing machines, automatic packing machines, shrink packaging machines, vacuum packaging machines & airtight packaging machines from leading machine manufacturer.",
    images: [
      {
        url: "/images/products-hero.jpg",
        width: 1200,
        height: 630,
        alt: "D.E. Technics packaging machines and equipment showcase",
      },
    ],
    url: "https://detechnics.com/products",
    type: "website",
    siteName: "D.E. Technics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packing Machine Price in Pakistan | Buy Packing Machine | D.E. Technics Products",
    description:
      "Best packing machine price in Pakistan. Buy small packing machines, automatic packing machines, shrink packaging machines, vacuum packaging machines & airtight packaging machines from leading machine manufacturer.",
    images: ["/images/products-hero.jpg"],
    creator: "@detechnics",
    site: "@detechnics",
  },
  alternates: {
    canonical: "https://detechnics.com/products",
  },
}

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://detechnics.com" },
  { name: "Products", url: "https://detechnics.com/products" }
])

const faqSchema = generateFAQSchema([
  {
    question: "What types of packing machines do you manufacture?",
    answer: "We manufacture HFFS machines, biscuit packaging machines, wafer production lines, and supporting equipment for food, confectionery, and pharmaceutical industries."
  },
  {
    question: "What is the packing machine price in Pakistan?",
    answer: "Packing machine prices vary based on specifications and capacity. Contact us for competitive pricing on small packing machines, automatic packing machines, and industrial packaging solutions."
  },
  {
    question: "Do you offer vacuum packaging machines?",
    answer: "Yes, we provide vacuum packaging machines and airtight packaging machines suitable for various food preservation and industrial applications."
  },
  {
    question: "Can I buy packing machines with installation support?",
    answer: "Yes, we provide complete installation, training, and after-sales support for all our packaging machines across Pakistan and international markets."
  }
])

const productCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "D.E. Technics Packaging Machines",
  description: "Complete range of packaging machines and equipment",
  itemListElement: [
    {
      "@type": "Product",
      name: "DE-2050SS HFFS Machine",
      description: "High-speed wrapping up to 250 packs/min for biscuits, soap bars & bakery items",
      image: "https://detechnics.com/images/de-2050ss.jpg",
      brand: { "@type": "Brand", name: "D.E. Technics" },
      category: "HFFS Machines",
    },
    {
      "@type": "Product",
      name: "DE-4050 Biscuit Wrapper",
      description: "High-speed on-edge biscuit wrapping with dual-magazine feeding system",
      image: "https://detechnics.com/images/de-4050.jpg",
      brand: { "@type": "Brand", name: "D.E. Technics" },
      category: "Biscuit Wrapping Machines",
    },
    {
      "@type": "Product",
      name: "DEW Wafer Production Lines",
      description: "Complete wafer production systems available in 31, 45, and 63-plate configurations",
      image: "https://detechnics.com/images/dew-wafer-lines.jpg",
      brand: { "@type": "Brand", name: "D.E. Technics" },
      category: "Wafer Production Lines",
    },
  ],
}

export default function ProductsPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productCatalogSchema) }} />
      <ProductsItemListJsonLd />

      <Header />

      {/* Page Header with bg-banner */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/bg-banner.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Breadcrumb items={COMMON_BREADCRUMBS.products} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Packing Machine Price in Pakistan | Buy Best Packing Machines</h1>
          <div className="text-lg">
            <Link href="/" className="hover:text-yellow-300">Home</Link>{" "}
            / <span>Products</span>
          </div>
        </div>
      </section>

      {/* All Products Overview */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Best Packing Machine Prices in Pakistan</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Leading packing machine manufacturer offering competitive packing machine prices in Pakistan. If you are searching for packaging machine lahore solutions, we supply and support across Lahore and nationwide. Buy small packing machines, automatic packing machines, shrink packaging machines, vacuum packaging machines & airtight packaging machines designed for efficiency, reliability, and precision across Pakistan and export markets.
            </p>
          </div>

          {/* Filterable Products Grid (legacy parity) */}
          <div className="mt-8">
            <ProductsFilterGrid />
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* HFFS Machines */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <Image
                src="/images/product-1.jpg"
                alt="Horizontal form fill seal machine HFFS packaging equipment for biscuit and confectionery wrapping"
                width={300}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Horizontal Form Fill Seal Machines</h3>
                <p className="text-gray-600 mb-4">
                  Premium HFFS machines and horizontal form fill seal equipment for biscuit packaging, chocolate wrapping, confectionery applications, and bakery product packaging.
                </p>
                <Link href="/products/hffs-machines" className="font-medium hover:opacity-80" style={{color: '#c8a415'}}>View HFFS Machines →</Link>
              </div>
            </div>

            {/* Biscuit Wrapping */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <Image
                src="/images/product-2.jpg"
                alt="Biscuit packaging machine on-edge wrapping equipment for cookie and bakery products"
                width={300}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Biscuit Packaging Machines</h3>
                <p className="text-gray-600 mb-4">
                  Professional biscuit packaging machines and specialized on-edge wrapping equipment with high-speed capabilities for precise biscuit wrapping and cookie packaging applications.
                </p>
                <Link href="/products/biscuit-wrapping" className="font-medium hover:opacity-80" style={{color: '#c8a415'}}>View Biscuit Wrappers →</Link>
              </div>
            </div>

            {/* Wafer Lines */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <Image
                src="/images/product-3.jpg"
                alt="Wafer lines manufacturer production equipment for industrial wafer manufacturing systems"
                width={300}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Wafer Lines Manufacturer</h3>
                <p className="text-gray-600 mb-4">
                  Complete wafer production lines from leading wafer lines manufacturer. Wafer equipment including spreading machines, cutters, and supporting equipment for industrial wafer manufacturing.
                </p>
                <Link href="/products/wafer-lines" className="font-medium hover:opacity-80" style={{color: '#c8a415'}}>View Wafer Lines →</Link>
              </div>
            </div>

            {/* Supporting Equipment */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <Image
                src="/images/product-4.jpg"
                alt="Packaging machinery supporting equipment mixers control panels for complete production lines"
                width={300}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Supporting Equipment</h3>
                <p className="text-gray-600 mb-4">
                  Auxiliary equipment including mixers, control panels, and processing equipment to complete your
                  production line.
                </p>
                <Link href="/products/supporting-equipment" className="font-medium hover:opacity-80" style={{color: '#c8a415'}}>View Equipment →</Link>
              </div>
            </div>
          </div>
          
          {/* Call to Action Section */}
          <div className="mt-12 text-center">
            <div className="rounded-lg p-8" style={{backgroundColor: 'rgba(200, 164, 21, 0.1)'}}>
              <h3 className="text-2xl font-semibold mb-4">Need Help Choosing the Right Packing Machine?</h3>
              <p className="text-gray-600 mb-6">Our experts can help you find the perfect packaging solution for your business needs.</p>
              <Link href="/contact" className="inline-block text-white px-8 py-3 rounded-lg hover:opacity-90 transition-colors" style={{backgroundColor: '#c8a415'}}>
                Get Expert Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular and versatile packaging machines trusted by manufacturers worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* DE-2050SS */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/product-1.jpg"
                alt="DE-2050SS horizontal form fill seal machine HFFS packaging equipment for high-speed biscuit wrapping"
                width={300}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">DE-2050SS HFFS Machine</h3>
                <p className="text-gray-600 text-sm mb-3">
                  High-speed wrapping up to 250 packs/min for biscuits, soap bars & bakery items with advanced servo
                  control.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{color: '#c8a415'}}>Up to 250 packs/min</span>
                  <Link href="/products/de-2050ss" className="font-medium hover:opacity-80" style={{color: '#c8a415'}}>Learn More →</Link>
                </div>
              </div>
            </div>

            {/* DE-4050 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/product-2.jpg"
                alt="DE-4050 biscuit packaging machine on-edge wrapping equipment with dual-magazine feeding system"
                width={300}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">DE-4050 Biscuit Wrapper</h3>
                <p className="text-gray-600 text-sm mb-3">
                  High-speed on-edge biscuit wrapping with dual-magazine feeding system and synchronized pushers for
                  optimal efficiency.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{color: '#c8a415'}}>Up to 120 packs/min</span>
                  <Link href="/products/de-4050" className="font-medium hover:opacity-80" style={{color: '#c8a415'}}>Learn More →</Link>
                </div>
              </div>
            </div>

            {/* DEW Wafer Lines */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/product-3.jpg"
                alt="DEW wafer lines manufacturer production systems 31 45 63 plate configurations industrial wafer equipment"
                width={300}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">DEW-31/45/63 Wafer Lines</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Complete wafer production systems available in 31, 45, and 63-plate configurations with integrated
                  automation.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{color: '#c8a415'}}>100-200 kg/hr</span>
                  <Link href="/products/wafer-lines" className="font-medium hover:opacity-80" style={{color: '#c8a415'}}>Learn More →</Link>
                </div>
              </div>
            </div>

            {/* DE-2000 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/product-4.jpg"
                alt="DE-2000 Horizontal Form Fill Seal Machine"
                width={300}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">DE-2000 HFFS Machine</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Versatile wrapper with quick changeover capabilities, ideal for biscuits, chocolate bars, and various
                  confectionery items.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{color: '#c8a415'}}>Up to 200 packs/min</span>
                  <Link href="/products/de-2000" className="font-medium hover:opacity-80" style={{color: '#c8a415'}}>Learn More →</Link>
                </div>
              </div>
            </div>

            {/* DE-300 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/product-1.jpg"
                alt="DE-300 On-Edge Biscuit Wrapping Machine"
                width={300}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">DE-300 Biscuit Wrapper</h3>
                <p className="text-gray-600 text-sm mb-3">
                  On-edge wrapper with L-Type conveyor system, suitable for various biscuit shapes and sizes with
                  reliable performance.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{color: '#c8a415'}}>Up to 80 packs/min</span>
                  <Link href="/products/de-300" className="font-medium hover:opacity-80" style={{color: '#c8a415'}}>Learn More →</Link>
                </div>
              </div>
            </div>

            {/* Wafer Spreading Machine */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/product-2.jpg"
                alt="Wafer Spreading Machine"
                width={300}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Wafer Spreading Machine</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Precision cream application system with stainless steel rollers for uniform wafer sandwich production.
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium" style={{color: '#c8a415'}}>Precision Control</span>
                  <Link href="/products/wafer-spreading-machine" className="font-medium hover:opacity-80" style={{color: '#c8a415'}}>Learn More →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Machines</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our packaging machines are designed with advanced technology and built to deliver exceptional performance
              and reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(200, 164, 21, 0.1)'}}>
                <i className="fas fa-cogs text-2xl" style={{color: '#c8a415'}}></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Technology</h3>
              <p className="text-gray-600">
                State-of-the-art servo controls and automation systems for precise and efficient operation.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-shield-alt text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Materials</h3>
              <p className="text-gray-600">
                High-grade stainless steel construction and proven electrical components for durability.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="fas fa-tachometer-alt text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">High Performance</h3>
              <p className="text-gray-600">
                Optimized for high-speed production with minimal downtime and maximum efficiency.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <i className="fas fa-wrench text-2xl text-orange-600"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Maintenance</h3>
              <p className="text-gray-600">
                User-friendly design with accessible components and comprehensive after-sales support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action with bg-banner */}
      <section className="relative py-16 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/bg-banner.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find the Perfect Machine for Your Needs</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our experts are ready to help you choose the right packaging solution for your specific requirements and
            production goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center bg-white px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px]" style={{color: '#c8a415'}}>Get Quote</Link>
            <Link href="/services" className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-800 transition-colors min-h-[44px]">Our Services</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
