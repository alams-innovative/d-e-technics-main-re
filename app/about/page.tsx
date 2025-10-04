import Header from "@/components/header"
import Footer from "@/components/footer"
import FAQSection from "@/components/faq-section"
import Breadcrumb from "@/components/breadcrumb"
import { generateOrganizationSchema, generateFAQSchema, generateBreadcrumbSchema, companyData } from "@/lib/structured-data"
import { COMMON_BREADCRUMBS } from "@/lib/breadcrumb-utils"
import Image from "next/image"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About D.E. Technics - Packing Machine Manufacturer Pakistan | Best Prices",
  description:
    "Since 1984, D.E. Technics delivers high-quality packing machines at competitive prices in Pakistan. Small packing machines, automatic packing machines, shrink packaging machines, vacuum packaging machines, airtight packaging machines, food packaging machines, powder packaging machines, blister packaging machines, sachet packaging machines & specialized packaging solutions for food, confectionery, and industrial manufacturers. Trusted for packaging machine Lahore supply and service.",
  keywords:
    "packing machine, packing machine price in Pakistan, small packing machine price in Pakistan, shrink packaging machine, automatic packing machine price in Pakistan, buy packing machine, machine manufacturer, vacuum packaging machine, packaging machine manufacturer in Karachi, airtight packaging machine, food packaging machine, powder packaging machine, blister packaging machine, sachet packaging machine, pillow packaging machine, plastic packaging machine, snack food packaging machine, bakery packaging machine, juice packaging machine, candy packaging machine, filling and packaging machine, sealing machines for packaging, pouch packing machines, industrial automation, food packaging, confectionery packaging, packaging machine lahore, Muhammad Haroon, flow wrapper, sachet packaging, sachet packing, seal machine, pack machine, heat seal machine, wrapper machine, heat and seal machine, GulfoodManufacturing, DubaiExhibition, ManufacturingInnovation, FoodIndustry, PackagingSolutions, SAMAEngineering, PakistanPavilion, MeetUsInDubai, GlobalExpo, PakistanEntrepreneursAward, AwardWinner, lahoreengineering, packingmachinery, packing, packingmachine, packaging, packagingmachine, wrappingmachinery, wrapping, biscuits, soap, cake, BeveragePackaging, DairyProcessing, PackagingMachinery, MetalDetectors, XRayInspection, QualityAssurance, millipack, packagingpakistan, packagingindustry, industrialprinters, foodprocessing, Strapack, PackagingStraps, SecureShipping, DurableStraps, ReliablePackaging, PrintedStraps, CustomBranding, honeypackaging, FoodGrade, SmallBusiness, honeystorage, LeakProof, Customizable, BrandingOpportunity, NewBusiness, Startups, WomenInBusiness",
  openGraph: {
    title: "About D.E. Technics - Packing Machine Manufacturer Pakistan | Best Prices",
    description:
      "Since 1984, D.E. Technics delivers high-quality packing machines at competitive prices in Pakistan. Small packing machines, automatic packing machines, shrink packaging machines, vacuum packaging machines & airtight packaging solutions for food, confectionery, and industrial manufacturers.",
    images: [
      {
        url: "/images/about-company.jpg",
        width: 1200,
        height: 630,
        alt: "D.E. Technics manufacturing facility and packaging machine production floor",
      },
    ],
    url: "https://detechnics.com/about",
    type: "website",
    siteName: "D.E. Technics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About D.E. Technics - Packing Machine Manufacturer Pakistan | Best Prices",
    description:
      "Since 1984, D.E. Technics delivers high-quality packing machines at competitive prices in Pakistan. Small packing machines, automatic packing machines, shrink packaging machines, vacuum packaging machines & airtight packaging solutions for food, confectionery, and industrial manufacturers.",
    images: ["/images/about-company.jpg"],
    creator: "@detechnics",
    site: "@detechnics",
  },
  alternates: {
    canonical: "https://detechnics.com/about",
  },
}

const organizationSchema = generateOrganizationSchema(companyData)
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://detechnics.com" },
  { name: "About Us", url: "https://detechnics.com/about" }
])

const faqSchema = generateFAQSchema([
  {
    question: "When was D.E. Technics founded?",
    answer: "Dynamic Engineering (D.E. Technics) was established in 1984 and has over 40 years of experience.",
  },
  {
    question: "How many machines has the company installed?",
    answer:
      "We have installed more than 2,500 machines, packed over 6 billion products and have over 250 satisfied clients across 25+ countries.",
  },
  {
    question: "Which industries and products does D.E. Technics support?",
    answer:
      "We build solutions for biscuit, chocolate, candy, bakery, soap and detergent manufacturers and export to countries such as Bangladesh, Indonesia and Malaysia.",
  },
  {
    question: "What makes our machines reliable?",
    answer:
      "Our equipment incorporates industrial automation for efficiency and reliability, and we are known for quality materials and strong after-sales service.",
  },
])

export default function AboutPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
            <Breadcrumb items={COMMON_BREADCRUMBS.about} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        </div>
      </section>

      {/* Company Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Our Company</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                D.E. Technics (Pvt.) Ltd. was established under the name of Dynamic Engineering in 1984. From the very
                beginning, the company adopted the policy of producing high-quality packing machines at competitive packing machine prices in Pakistan and providing
                exceptional small packing machines, automatic packing machines, and shrink packaging machines in Lahore.
              </p>
              <p className="text-neutral-700 leading-relaxed mb-4">
                For clients specifically searching for <strong>packaging machine Lahore</strong> solutions, our team based in
                Lahore ensures rapid support, local installation, and after-sales service.
              </p>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Our reputation as a leading packing machine manufacturer in Pakistan is built on our commitment to excellence and
                prompt after-sales service, which has helped us establish a strong and growing client base. Buy packing machines from us at the best packing machine price in Pakistan.
              </p>
              <p className="text-neutral-700 leading-relaxed mb-6 md:mb-8">
                By integrating industrial automation, we ensure that our vacuum packaging machines and airtight packaging machines operate with maximum efficiency,
                reliability, and precision. Whether it's food packing in Lahore or packaging for soaps, we use
                high-quality materials and proven electrical/electronic components to guarantee uninterrupted and
                trouble-free operations.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-600">40+</h3>
                  <p className="text-neutral-700 text-sm">Years of Experience</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-600">2500+</h3>
                  <p className="text-neutral-700 text-sm">Machines Installed</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-600">250+</h3>
                  <p className="text-neutral-700 text-sm">Satisfied Clients</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-600">6+</h3>
                  <p className="text-neutral-700 text-sm">Billion Products Packed</p>
                </div>
                <div className="text-center">
                  <h3 className="text-base md:text-lg font-bold text-blue-600 mb-2">Proud Member of</h3>
                  <p className="text-neutral-700 text-xs md:text-sm">LLCI | SECP | FBR | Punjab Revenue</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-600">25+</h3>
                  <p className="text-neutral-700 text-sm">Export Countries</p>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/images/about-company.jpg"
                alt="D.E. Technics manufacturing facility and packaging machine production floor"
                width={600}
                height={400}
                className="w-full rounded-2xl shadow-sm"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Global Reach</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                D.E. Technics packing machines cater to the needs of small, medium and large manufacturers of biscuits,
                chocolates, candies, bakery items, ice lollies, soap and detergent bars. Our automatic packing machines, vacuum packaging machines, and airtight packaging machines offer competitive packing machine prices in Pakistan.
              </p>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Our client bank comprises not only small, medium and large manufacturers within the country but also
                those in foreign countries like Bangladesh, Indonesia, Malaysia, Uganda, South Africa, Canada, Saudi
                Arabia, Sri-Lanka, Nigeria, Mozambique and U.A.E. They buy packing machines from us due to our reputation as a reliable machine manufacturer.
              </p>
              <p className="text-neutral-700 font-semibold">CEO: Muhammad Haroon</p>
            </div>
            <div>
              <Image
                src="/images/haroon.jpg"
                alt="Muhammad Haroon, Founder and CEO of D.E. Technics packaging machinery company"
                width={600}
                height={400}
                className="w-full rounded-2xl shadow-sm"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* tailwind-merge-ignore */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200/60 shadow-sm border-l-4 border-blue-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-eye text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold">Our Vision</h3>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                To be the leading provider of innovative packaging solutions in the region, recognized for our quality,
                reliability, and customer service.
              </p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200/60 shadow-sm border-l-4 border-green-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-bullseye text-green-600 text-xl"></i>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold">Our Mission</h3>
              </div>
              <p className="text-neutral-700 leading-relaxed">
                To deliver cutting-edge packaging machinery that enhances our clients' operational efficiency, product
                quality, and market competitiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={[
          {
            question: "When was D.E. Technics founded?",
            answer: "Dynamic Engineering (D.E. Technics) was established in 1984 and has over 40 years of experience.",
          },
          {
            question: "How many machines has the company installed?",
            answer:
              "We have installed more than 2,500 machines, packed over 6 billion products and have over 250 satisfied clients across 25+ countries.",
          },
          {
            question: "Which industries and products does D.E. Technics support?",
            answer:
              "We build solutions for biscuit, chocolate, candy, bakery, soap and detergent manufacturers and export to countries such as Bangladesh, Indonesia and Malaysia.",
          },
          {
            question: "What makes our machines reliable?",
            answer:
              "Our equipment incorporates industrial automation for efficiency and reliability, and we are known for quality materials and strong after-sales service.",
          },
        ]}
        className="bg-gray-50"
      />

      {/* Call to Action with bg-banner */}
      <section className="relative py-16 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/bg-banner.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Partner with Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our team to discuss how we can help you with your packaging needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 hover:bg-gray-100 min-h-[44px]" style={{color: '#c8a415'}}>Contact Us</Link>
            <Link href="/products" className="inline-flex items-center justify-center rounded-xl border-2 border-white px-6 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 hover:bg-white hover:text-gray-800 min-h-[44px]">Explore Products</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
