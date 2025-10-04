import Header from "@/components/header"
import Footer from "@/components/footer"
import FAQSection from "@/components/faq-section"
import Breadcrumb from "@/components/breadcrumb"
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/structured-data"
import { COMMON_BREADCRUMBS } from "@/lib/breadcrumb-utils"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Packing Machine Services & Support | D.E. Technics",
  description:
    "D.E. Technics offers advanced packing machines and automation solutions at competitive packing machine price in Pakistan for food, confectionery, and pharmaceutical industries. Expert packaging machine Lahore support including food packaging machines, powder packaging machines, blister packaging machines, sachet packaging machines.",
  keywords:
    "advanced packing machines, automation solutions, packing machine services, automatic packing machine, small packing machine price in Pakistan, buy packing machine, food packaging machine, powder packaging machine, blister packaging machine, sachet packaging machine, pillow packaging machine, plastic packaging machine, snack food packaging machine, bakery packaging machine, juice packaging machine, candy packaging machine, filling and packaging machine, sealing machines for packaging, machine manufacturer, packing machine support, packaging machine lahore",
  openGraph: {
    title: "Packing Machine Services & Support | D.E. Technics",
    description:
      "D.E. Technics offers advanced packing machines and automation solutions at competitive packing machine price in Pakistan for food, confectionery, and pharmaceutical industries.",
    images: [
      {
        url: "/images/hero1.jpg",
        width: 1200,
        height: 630,
        alt: "D.E. Technics packing machine services and automation solutions",
      },
    ],
    url: "https://detechnics.com/services",
    type: "website",
    siteName: "D.E. Technics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packing Machine Services & Support | D.E. Technics",
    description:
      "D.E. Technics offers advanced packing machines and automation solutions at competitive packing machine price in Pakistan for food, confectionery, and pharmaceutical industries.",
    images: ["/images/hero1.jpg"],
    creator: "@detechnics",
    site: "@detechnics",
  },
  alternates: {
    canonical: "https://detechnics.com/services",
  },
}

const serviceSchema = generateServiceSchema({
  name: "Packing Machine Services & Support",
  description: "Comprehensive packing machine services including installation, maintenance, and technical support for food, confectionery, and pharmaceutical industries.",
  provider: "D.E. Technics (Pvt.) Ltd.",
  areaServed: ["Pakistan", "UAE", "Saudi Arabia", "Bangladesh", "Sri Lanka"],
  serviceType: "Industrial Equipment Services",
})

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://detechnics.com" },
  { name: "Services", url: "https://detechnics.com/services" }
])

const faqSchema = generateFAQSchema([
  {
    question: "Which industries do your services cater to?",
    answer:
      "D.E. Technics designs packing machine solutions for the Food & Beverage, Confectionery Items and Pharmaceutical sectors with competitive packing machine price in Pakistan.",
  },
  {
    question: "What capabilities do you offer?",
    answer: "We provide advanced engineering, customized services and a commitment to quality and innovation.",
  },
  {
    question: "How does the service process work?",
    answer:
      "Projects begin with an in-depth analysis of client requirements, followed by advanced technology and strict quality control.",
  },
  {
    question: "Can you customize machines for unique applications?",
    answer: "Yes, we specialize in tailoring packing machines to specific products and automatic packing machine needs.",
  },
  {
    question: "What benefits do clients gain from your services?",
    answer: "High-quality machines improve efficiency and reduce waste across various industries.",
  },
])

export default function ServicesPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
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
            <Breadcrumb items={COMMON_BREADCRUMBS.services} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              Industries We Serve with Advanced Packaging Machines
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              We proudly cater to a diverse range of industries, providing tailored solutions to meet their unique
              needs. We also provide rapid on-site service for clients seeking packaging machine Lahore support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6 md:p-8 bg-white rounded-2xl border border-neutral-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(200, 164, 21, 0.1)'}}>
                <img
                  src="/images/food-beverage-icon.png"
                  alt="Food and Beverage"
                  width={60}
                  height={60}
                  className="w-12 h-12"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-4">Food and Beverage</h3>
              <p className="text-neutral-700 leading-relaxed">
                Food processing machinery, we empower the food and beverage industry to meet consumer demands
                efficiently & sustainably.
              </p>
            </div>

            <div className="text-center p-6 md:p-8 bg-white rounded-2xl border border-neutral-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <div className="w-20 h-20 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
                <img
                  src="/images/confectionery-icon.jpg"
                  alt="Confectionery Items"
                  width={60}
                  height={60}
                  className="w-12 h-12"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-4">Confectionery Items</h3>
              <p className="text-neutral-700 leading-relaxed">
                With cutting-edge automation & machinery, we optimize manufacturing workflows for increased efficiency &
                productivity.
              </p>
            </div>

            <div className="text-center p-6 md:p-8 bg-white rounded-2xl border border-neutral-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <img
                  src="/images/pharmaceutical-icon.webp"
                  alt="Pharmaceuticals"
                  width={60}
                  height={60}
                  className="w-12 h-12"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-4">Pharmaceuticals</h3>
              <p className="text-neutral-700 leading-relaxed">
                Design & manufacture for pharma production & medical device manufacturing, ensuring quality & compliance
                at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Our Capabilities */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Capabilities</h2>
              <p className="text-gray-600 mb-6">
                At D.E. Technics, we specialize in delivering innovative and high-quality solutions tailored to industry
                needs. Our expertise and dedication drive us to provide exceptional services that enhance efficiency and
                performance.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-gray-600">Advanced engineering & technology-driven solutions</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-gray-600">Customized services to meet industry-specific requirements</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-gray-600">Commitment to quality, innovation, and client satisfaction</span>
                </li>
              </ul>
              <p className="text-gray-600">
                With years of experience, we continue to push the boundaries of excellence, ensuring that our clients
                receive cutting-edge solutions that drive growth and success.
              </p>
            </div>
            <div>
              <img
                src="/images/our-capabilities.jpg"
                alt="D.E. Technics packing machine capabilities and manufacturing expertise"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* How We Do It */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Do It</h2>
              <p className="text-gray-600 mb-6">
                At D.E. Technics, we prioritize innovation, precision, and collaboration to create tailored solutions
                for our clients. Our process ensures efficiency, quality, and long-term success.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-gray-600">In-depth analysis of client needs for customized solutions</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-gray-600">Utilization of advanced technology and cutting-edge techniques</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-gray-600">Strict quality control to maintain the highest standards</span>
                </li>
              </ul>
              <p className="text-gray-600">
                By combining expertise with state-of-the-art manufacturing, we deliver high-quality machinery and
                equipment that meet industry demands. Our commitment to excellence ensures reliability and performance
                in every project.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="/images/how-we-do-it.jpg"
                alt="D.E. Technics engineering process and quality control methodology"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Our Comprehensive Services</h2>
            <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              From consultation to after-sales support, we provide end-to-end solutions for your packing machine needs at competitive packing machine price in Pakistan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200/60 shadow-sm">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-clipboard-check text-teal-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3">Quality Assurance</h3>
              <p className="text-neutral-700 leading-relaxed">
                Rigorous quality control processes to ensure all machines meet international standards.
              </p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200/60 shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-tools text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3">Installation & Commissioning</h3>
              <p className="text-neutral-700 leading-relaxed">
                Professional installation and commissioning services to ensure optimal machine performance.
              </p>
            </div>
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200/60 shadow-sm">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(200, 164, 21, 0.1)'}}>
                <i className="fas fa-cogs text-2xl" style={{color: '#c8a415'}}></i>
              </div>
              <h3 className="text-xl font-semibold tracking-tight mb-3">Machine Design & Manufacturing</h3>
              <p className="text-neutral-700 leading-relaxed">
                Custom packing machine design and manufacturing tailored to your specific product requirements at competitive packing machine price in Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={[
          {
            question: "Which industries do your services cater to?",
            answer: "D.E. Technics designs packing machine solutions for the Food & Beverage, Confectionery Items and Pharmaceutical sectors with competitive packing machine price in Pakistan.",
          },
          {
            question: "What capabilities do you offer?",
            answer: "We provide advanced engineering, customized services and a commitment to quality and innovation.",
          },
          {
            question: "How does the service process work?",
            answer: "Projects begin with an in-depth analysis of client requirements, followed by advanced technology and strict quality control.",
          },
          {
            question: "Can you customize machines for unique applications?",
            answer: "Yes, we specialize in tailoring packing machines to specific products and automatic packing machine needs.",
          },
          {
            question: "What benefits do clients gain from your services?",
            answer: "High-quality machines improve efficiency and reduce waste across various industries.",
          },
        ]}
      />

      {/* Call to Action with bg-banner */}
      <section className="relative py-16 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/bg-banner.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Optimize Your Packaging Operations?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our service team today to discuss how we can support your business with our comprehensive service
            solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center bg-white px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px]" style={{color: '#c8a415'}}>Contact Us Today</Link>
            <Link href="/products" className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-800 transition-colors min-h-[44px]">Explore Products</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
