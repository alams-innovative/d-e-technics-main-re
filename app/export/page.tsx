import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import { COMMON_BREADCRUMBS } from "@/lib/breadcrumb-utils"
import FlagImg from "./flag-img"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Global Presence & Export Markets - D.E. Technics",
  description: "D.E. Technics exports packaging machines to 25+ countries worldwide, including HFFS, wafer lines, industrial mixers, with reliable after-sales support.",
  keywords: "export machinery, global export, packaging machines export, HFFS export, wafer lines export, industrial mixers export, after-sales support, D.E. Technics",
  openGraph: {
    title: "Export – D.E. Technics | Global Machinery Exports",
    description: "D.E. Technics exports packaging machines to 25+ countries worldwide, including HFFS, wafer lines, industrial mixers, with reliable after-sales support.",
    images: ["/images/favicon.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Export – D.E. Technics | Global Machinery Exports",
    description: "D.E. Technics exports packaging machines to 25+ countries worldwide, including HFFS, wafer lines, industrial mixers, with reliable after-sales support.",
    images: ["/images/favicon.png"],
  },
  alternates: {
    canonical: "https://detechnics.com/export",
  },
}


// Exact countries from legacy export page
const flagCountries = [
  { name: "Afghanistan", phoneCode: "+93" },
  { name: "Ghana", phoneCode: "+233" },
  { name: "Malaysia", phoneCode: "+60" },
  { name: "Russia", phoneCode: "+7" },
  { name: "Tanzania", phoneCode: "+255" },
  { name: "United Kingdom", phoneCode: "+44" },
  { name: "Bahrain", phoneCode: "+973" },
  { name: "Haiti", phoneCode: "+509" },
  { name: "Mozambique", phoneCode: "+258" },
  { name: "Saudi Arabia", phoneCode: "+966" },
  { name: "Turkmenistan", phoneCode: "+993" },
  { name: "United States", phoneCode: "+1" },
  { name: "Bangladesh", phoneCode: "+880" },
  { name: "Indonesia", phoneCode: "+62" },
  { name: "Oman", phoneCode: "+968" },
  { name: "South Africa", phoneCode: "+27" },
  { name: "United Arab Emirates", phoneCode: "+971" },
  { name: "Zambia", phoneCode: "+260" },
  { name: "Canada", phoneCode: "+1" },
  { name: "Kenya", phoneCode: "+254" },
  { name: "Qatar", phoneCode: "+974" },
  { name: "Sri Lanka", phoneCode: "+94" },
  { name: "Uganda", phoneCode: "+256" }
]

// Regional breakdown from legacy
const regions = [
  {
    title: "Middle East",
    countries: [
      { name: "Saudi Arabia", phoneCode: "+966" },
      { name: "United Arab Emirates", phoneCode: "+971" },
      { name: "Qatar", phoneCode: "+974" },
      { name: "Oman", phoneCode: "+968" },
      { name: "Bahrain", phoneCode: "+973" }
    ]
  },
  {
    title: "South Asia",
    countries: [
      { name: "India", phoneCode: "+91" },
      { name: "Bangladesh", phoneCode: "+880" },
      { name: "Sri Lanka", phoneCode: "+94" },
      { name: "Pakistan", phoneCode: "+92" }
    ]
  },
  {
    title: "Africa",
    countries: [
      { name: "South Africa", phoneCode: "+27" },
      { name: "Kenya", phoneCode: "+254" },
      { name: "Tanzania", phoneCode: "+255" },
      { name: "Ghana", phoneCode: "+233" },
      { name: "Uganda", phoneCode: "+256" },
      { name: "Zambia", phoneCode: "+260" }
    ]
  },
  {
    title: "Southeast Asia",
    countries: [
      { name: "Malaysia", phoneCode: "+60" },
      { name: "Indonesia", phoneCode: "+62" },
      { name: "Thailand", phoneCode: "+66" }
    ]
  },
  {
    title: "North America",
    countries: [
      { name: "United States", phoneCode: "+1" },
      { name: "Canada", phoneCode: "+1" }
    ]
  },
  {
    title: "Europe & Central Asia",
    countries: [
      { name: "United Kingdom", phoneCode: "+44" },
      { name: "Russia", phoneCode: "+7" },
      { name: "Turkmenistan", phoneCode: "+993" }
    ]
  }
]

// Export products exactly from legacy
const exportProducts = [
  {
    title: "Horizontal Form Fill Seal Machines",
    image: "/images/product/DE-210.jpg",
    description: "Our HFFS machines are exported to multiple countries for packaging biscuits, chocolates, and confectionery products.",
    countries: ["Saudi Arabia", "UAE", "UK", "Malaysia"]
  },
  {
    title: "Wafer Production Lines",
    image: "/images/product/Waffer-Lines.jpg",
    description: "Complete wafer production lines for manufacturing cream-filled wafers, exported to confectionery manufacturers globally.",
    countries: ["Bangladesh", "Kenya", "Indonesia", "Zambia"]
  },
  {
    title: "Biscuit Wrapping Machines",
    image: "/images/product/DE-300.jpg",
    description: "High-speed biscuit wrapping machines for sandwich biscuits and cream biscuits, exported to food processing companies.",
    countries: ["Sri Lanka", "Tanzania", "Qatar", "USA"]
  },
  {
    title: "Industrial Mixers",
    image: "/images/product/Turbo-Mixer.jpg",
    description: "Turbo mixers and cream mixers for food processing applications, exported to bakery and confectionery industries.",
    countries: ["Oman", "Uganda", "Russia", "Canada"]
  }
]

// FAQ items for export page
const faqItems: { question: string; answer: string }[] = [
  {
    question: "How many countries do you export to?",
    answer: "D.E. Technics exports machines to more than 25 countries across five continents.",
  },
  {
    question: "Which countries are in your export network?",
    answer: "Countries include Saudi Arabia, UAE, Qatar, Oman, Bahrain, India, Bangladesh, Sri Lanka, South Africa, Kenya, Tanzania, Malaysia, Indonesia, Thailand, the USA, Canada, the UK, Russia, Turkmenistan and others.",
  },
  {
    question: "What types of machines are exported?",
    answer: "Exports include HFFS machines for biscuits and chocolates, wafer production lines, biscuit wrapping machines for sandwich biscuits and industrial mixers.",
  },
  {
    question: "Do you support international customers?",
    answer: "Yes; the company offers consultation, installation and after‑sales support worldwide.",
  },
  {
    question: "How can overseas businesses purchase your machines?",
    answer: "Contact D.E. Technics through the website or request a quote; the export team will assist with pricing, shipping and support.",
  },
]

const exportSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Export Services | D.E. Technics",
  "description": "Global packaging machinery export services and international partnerships",
  "url": "https://detechnics.com/export",
  "mainEntity": {
    "@type": "Organization",
    "name": "D.E. Technics (Pvt.) Ltd.",
    "areaServed": flagCountries.map(country => ({
      "@type": "Country",
      "name": country.name
    }))
  }
}

export default function ExportPage() {
  return (
    <div>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(exportSchema) }} 
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
      
      <Header />

      {/* Page Header */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/bg-banner.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <Breadcrumb items={[...COMMON_BREADCRUMBS.home, { label: "Export" }]} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Export</h1>
        </div>
      </section>

      {/* Global Map Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Global Presence</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              D.E. Technics has established a strong global presence, exporting high-quality machinery and equipment to over 25 countries across 5 continents.
            </p>
          </div>
          
          <div className="relative border-4 border-yellow-600 mx-auto max-w-5xl shadow-lg bg-white">
            <div className="bg-white p-4 text-center border-b-2 border-yellow-600">
              <h3 className="text-2xl font-bold text-blue-800">GLOBAL PRESENCE</h3>
            </div>
            
            <div className="relative w-full pb-[50%] overflow-hidden">
              <Image 
                src="/images/map.jpg" 
                alt="D.E. Technics Global Presence Map" 
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 p-5 bg-blue-800">
              {flagCountries.map((country, index) => (
                <div key={index} className="flex flex-col items-center w-24 mb-4 cursor-pointer transform transition-transform hover:-translate-y-1">
                  <FlagImg name={country.name} className="w-10 h-6 mb-1 border border-gray-300" width={40} height={26} />
                  <span className="text-xs text-center text-white font-medium leading-tight">
                    {country.name === "United Kingdom" ? "UK" : 
                     country.name === "United States" ? "USA" :
                     country.name === "United Arab Emirates" ? "UAE" :
                     country.name.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Export Markets Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Export Markets</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We have successfully delivered and installed our machinery and equipment in diverse markets across the globe, ensuring reliable after-sales service and support to all our international clients.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center p-5">
              <div className="text-4xl font-bold text-yellow-600 mb-2">25+</div>
              <div className="text-lg text-gray-700">Countries</div>
            </div>
            <div className="text-center p-5">
              <div className="text-4xl font-bold text-yellow-600 mb-2">5</div>
              <div className="text-lg text-gray-700">Continents</div>
            </div>
            <div className="text-center p-5">
              <div className="text-4xl font-bold text-yellow-600 mb-2">2500+</div>
              <div className="text-lg text-gray-700">Installations</div>
            </div>
            <div className="text-center p-5">
              <div className="text-4xl font-bold text-yellow-600 mb-2">40+</div>
              <div className="text-lg text-gray-700">Years Experience</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2">
                <div className="bg-blue-800 text-white p-4 text-center">
                  <h3 className="text-xl font-semibold">{region.title}</h3>
                </div>
                <div className="p-5">
                  <ul className="space-y-2">
                    {region.countries.map((country, countryIndex) => (
                      <li key={countryIndex} className="flex items-center py-2 border-b border-gray-200 last:border-b-0">
                        <FlagImg name={country.name} className="w-6 h-4 mr-3 border border-gray-300" width={24} height={16} />
                        <span className="text-gray-800">{country.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              href="https://wa.me/923330184756" 
              target="_blank"
              className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-green-600 transition-colors"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Chat with Us on WhatsApp
            </Link>
          </div>
        </div>
      </section>

      {/* Export Products Section */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Export Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our range of high-quality machinery and equipment is exported to customers worldwide, meeting international standards and specifications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {exportProducts.map((product, index) => (
              <div key={index} className="border border-gray-300 rounded-lg overflow-hidden transform transition-all hover:shadow-lg hover:-translate-y-1">
                <Image 
                  src={product.image} 
                  alt={product.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{product.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {product.countries.map((country, countryIndex) => (
                      <span key={countryIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Common questions about our export services and international machinery delivery.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqItems.map((faq, index) => (
                <details key={index} className="group bg-white rounded-lg border border-gray-200 shadow-sm">
                  <summary className="flex justify-between items-center cursor-pointer p-6 text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                    {faq.question}
                    <span className="ml-6 flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
