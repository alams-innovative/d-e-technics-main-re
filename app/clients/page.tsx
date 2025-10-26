import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import FAQSection from "@/components/seo/FAQSection"
import { COMMON_BREADCRUMBS } from "@/lib/breadcrumb-utils"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Our Clients | D.E. Technics - Trusted Packing Machine Manufacturer",
  description:
    "Leading companies trust D.E. Technics for packing machine solutions at competitive packing machine price in Pakistan. See our client success stories with automatic packing machines, food packaging machines, powder packaging machines, blister packaging machines. Preferred partner for packaging machine lahore projects.",
  keywords:
    "packing machine clients, packaging machine manufacturer in Karachi, automatic packing machine customers, small packing machine price in Pakistan, buy packing machine, food packaging machine, powder packaging machine, blister packaging machine, sachet packaging machine, pillow packaging machine, plastic packaging machine, snack food packaging machine, bakery packaging machine, juice packaging machine, candy packaging machine, filling and packaging machine, sealing machines for packaging, machine manufacturer clients, packaging machine lahore",
  openGraph: {
    title: "Our Clients | D.E. Technics - Trusted Packing Machine Manufacturer",
    description:
      "Leading companies trust D.E. Technics for packing machine solutions at competitive packing machine price in Pakistan. See our client success stories.",
    images: ["/images/clients-hero.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Clients | D.E. Technics - Trusted Packing Machine Manufacturer",
    description:
      "Leading companies trust D.E. Technics for packing machine solutions at competitive packing machine price in Pakistan. See our client success stories.",
    images: ["/images/clients-hero.jpg"],
  },
  alternates: {
    canonical: "https://detechnics.com/clients",
  },
}

const clientLogos = [
  { name: "Dawn Bread", logo: "/images/dawn-bread.png" },
  { name: "Kolson", logo: "/images/kolson.png" },
  { name: "Kims", logo: "/images/kims.png" },
  { name: "Peek Freans", logo: "/images/peek-freans.png" },
  { name: "LU", logo: "/images/lu.png" },
  { name: "Mitchell's", logo: "/images/mitchells.jpg" },
  { name: "Atlas Honda", logo: "/images/atlas-honda.jpg" },
  { name: "EBM", logo: "/images/ebm.jpg" },
  { name: "Candi & LU", logo: "/images/candi-lu.jpg" },
]

const testimonials = [
  {
    company: "Peek Freans",
    text: "D.E. Technics has been our trusted partner for packaging solutions. Their machines have significantly improved our production efficiency.",
    person: "Production Manager",
  },
  {
    company: "Bisconni",
    text: "The reliability and precision of D.E. Technics equipment has helped us maintain consistent quality in our biscuit packaging.",
    person: "Operations Director",
  },
  {
    company: "Tapal Tea",
    text: "Excellent after-sales support and machine performance. D.E. Technics understands our packaging requirements perfectly.",
    person: "Technical Manager",
  },
]

const clientsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Our Clients | D.E. Technics",
  description: "Leading companies that trust D.E. Technics for packaging machinery solutions",
  url: "https://detechnics.com/clients",
  mainEntity: {
    "@type": "Organization",
    name: "D.E. Technics (Pvt.) Ltd.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Packaging Machinery Solutions",
      itemListElement: clientLogos.map((client, index) => ({
        "@type": "Offer",
        position: index + 1,
        name: `Packaging Solutions for ${client.name}`,
        description: `Custom packaging machinery solutions provided to ${client.name}`,
      })),
    },
  },
}

export default function ClientsPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clientsSchema) }} />

      <Header />

      {/* Hero Section with bg-banner */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/bg-banner.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <Breadcrumb items={[...COMMON_BREADCRUMBS.home, { label: "Clients" }]} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Valued Clients</h1>
          <p className="text-xl leading-relaxed max-w-2xl mx-auto">
            Trusted by leading manufacturers across Pakistan and internationally for reliable packing machine solutions
          </p>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              Companies That Buy Packing Machine from Us
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              From multinational corporations to growing businesses, our clients choose us as their trusted machine
              manufacturer for automatic packing machine solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 items-center">
            {clientLogos.map((client, index) => (
              <div
                key={index}
                className="group bg-white p-4 md:p-6 rounded-2xl border border-neutral-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={`${client.name} logo`}
                  width={150}
                  height={100}
                  className="w-full h-16 md:h-20 object-contain grayscale group-hover:grayscale-0 transition duration-200"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Industries Served */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              Industries We Serve with Packing Machines
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              Our packing machine solutions cater to diverse industry requirements with competitive pricing across
              Pakistan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6 md:p-8 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-cookie-bite text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3">Food & Beverage</h3>
              <p className="text-neutral-700 leading-relaxed">
                Biscuits, confectionery, tea, and food products packing with automatic packing machines
              </p>
            </div>

            <div className="text-center p-6 md:p-8 bg-green-50 rounded-2xl border border-green-100">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-pills text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3">Pharmaceutical</h3>
              <p className="text-neutral-700 leading-relaxed">
                Medical and pharmaceutical product packing with vacuum packaging machines
              </p>
            </div>

            <div className="text-center p-6 md:p-8 bg-purple-50 rounded-2xl border border-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-soap text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3">Consumer Goods</h3>
              <p className="text-neutral-700 leading-relaxed">
                Soap, detergent, and household product packing with shrink packaging machines
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">What Our Clients Say</h2>
            <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              Hear from industry leaders about their experience with D.E. Technics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200/60 shadow-sm">
                <div className="mb-4">
                  <i className="fas fa-quote-left text-blue-600 text-2xl"></i>
                </div>
                <p className="text-neutral-700 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                <div className="border-t border-neutral-200 pt-4">
                  <p className="font-semibold text-blue-600">{testimonial.company}</p>
                  <p className="text-sm text-neutral-600">{testimonial.person}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (standardized) */}
      <FAQSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "What industries do your clients represent?",
            answer:
              "Clients come from food & beverage, confectionery, pharmaceuticals, cosmetics, textiles and industrial goods.",
          },
          {
            question: "How have your machines improved client operations?",
            answer:
              "Testimonials highlight improved production efficiency and reliable operation after adopting D.E. Technics' machines.",
          },
          {
            question: "Do you offer training and after-sales support?",
            answer:
              "Yes; clients praise the comprehensive training and prompt support provided with every installation.",
          },
          {
            question: "Can you design custom solutions?",
            answer:
              "The company collaborates with clients to create machines tailored to their products and industry requirements.",
          },
          {
            question: "How can prospective clients start working with you?",
            answer:
              "Prospective customers should contact D.E. Technics via phone or email to discuss their packaging challenges and explore tailored solutions.",
          },
        ]}
        className="bg-gray-50"
      />

      {/* CTA Section with bg-banner */}
      <section className="relative py-12 md:py-16 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/bg-banner.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
            Join Our Growing Packing Machine Client Family
          </h2>
          <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            Experience the reliability and innovation that has made us the preferred packing machine manufacturer with
            competitive packing machine price in Pakistan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 min-h-[44px]"
              style={{ color: "#c8a415" }}
            >
              Contact Us
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 min-h-[44px]"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
