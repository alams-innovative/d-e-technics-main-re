import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSlider from "@/components/hero-slider"
import ProductCard from "@/components/product-card"
import TestimonialCard from "@/components/testimonial-card"
import IndustryCard from "@/components/industry-card"
import FAQSection from "@/components/seo/FAQSection"
import SectionErrorBoundary from "@/components/section-error-boundary"
import ServiceCard from "@/components/service-card"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  metadataBase: new URL("https://detechnics.com"),
  title: "Packing Machine Manufacturer Pakistan | Best Packing Machines | D.E. Technics",
  description:
    "Leading packing machine manufacturer in Pakistan offering premium packaging solutions. Small packing machines, automatic packing machines, shrink packaging machines, vacuum packaging machines, airtight packaging machines, food packaging machines, blister packaging machines, powder packaging machines & specialized packaging solutions since 1984. packaging machine lahore supplier.",
  keywords:
    "packing machine, packing machine price in Pakistan, small packing machine price in Pakistan, shrink packaging machine, automatic packing machine price in Pakistan, buy packing machine, machine manufacturer, vacuum packaging machine, packaging machine manufacturer in Karachi, airtight packaging machine, horizontal form fill seal machine, HFFS machine, wafer lines manufacturer, packaging machines Pakistan, biscuit packaging machine, packaging machine lahore, chips packing machine in pakistan, food packaging machine, powder packaging machine, blister packaging machine, sachet packaging machine, pillow packaging machine, plastic packaging machine, snack food packaging machine, bakery packaging machine, juice packaging machine, dairy packaging machine, filling and packaging machine, sealing machines for packaging, D.E. Technics, flow wrapper, sachet packaging, sachet packing, seal machine, pack machine, heat seal machine, wrapper machine, heat and seal machine, GulfoodManufacturing, DubaiExhibition, ManufacturingInnovation, FoodIndustry, PackagingSolutions, SAMAEngineering, PakistanPavilion, MeetUsInDubai, GlobalExpo, PakistanEntrepreneursAward, AwardWinner, lahoreengineering, packingmachinery, packing, packingmachine, packaging, packagingmachine, wrappingmachinery, wrapping, biscuits, soap, cake, BeveragePackaging, DairyProcessing, PackagingMachinery, MetalDetectors, XRayInspection, QualityAssurance, millipack, packagingpakistan, packagingindustry, industrialprinters, foodprocessing, Strapack, PackagingStraps, SecureShipping, DurableStraps, ReliablePackaging, PrintedStraps, CustomBranding, honeypackaging, FoodGrade, SmallBusiness, honeystorage, LeakProof, Customizable, BrandingOpportunity, NewBusiness, Startups, WomenInBusiness",
  openGraph: {
    locale: "en_PK",
    title: "Packing Machine Manufacturer Pakistan | Best Packing Machines | D.E. Technics",
    description:
      "Leading packing machine manufacturer in Pakistan offering premium packaging solutions. Small packing machines, automatic packing machines, shrink packaging machines, vacuum packaging machines, airtight packaging machines, food packaging machines, powder packaging machines & specialized packaging solutions since 1984.",
    images: ["/images/hero1.jpg"],
    type: "website",
    siteName: "D.E. Technics",
  },
  twitter: {
    site: "@detechnicspk",
    creator: "@detechnicspk",
    card: "summary_large_image",
    title: "Packing Machine Manufacturer Pakistan | Best Packing Machines | D.E. Technics",
    description:
      "Leading packing machine manufacturer in Pakistan offering premium packaging solutions. Small packing machines, automatic packing machines, shrink packaging machines, vacuum packaging machines, airtight packaging machines, food packaging machines, powder packaging machines & specialized packaging solutions since 1984.",
    images: ["/images/hero1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
  alternates: {
    canonical: "https://detechnics.com",
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "D.E. Technics (Pvt.) Ltd.",
      alternateName: "Dynamic Engineering",
      url: "https://detechnics.com",
      logo: "https://detechnics.com/images/logo.png",
      description:
        "Leading packing machine manufacturer in Pakistan offering premium packaging solutions, small packing machines, automatic packing machines, shrink packaging machines, vacuum packaging machines & airtight packaging solutions since 1984",
      foundingDate: "1984-01-01",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+92-333-0184756",
        contactType: "customer service",
        email: "info@detechnics.com",
      },
      sameAs: [
        "https://www.facebook.com/detechnicspk",
        "https://twitter.com/detechnicspk",
        "https://www.youtube.com/@DETechnicsPK",
      ],
    },
    {
      "@type": "WebPage",
      name: "D.E. Technics - Advanced Packaging Machines & Solutions Since 1984",
      url: "https://detechnics.com",
      inLanguage: "en",
      description:
        "Leading manufacturer of HFFS machines, biscuit wrappers, wafer production lines & packaging automation.",
      datePublished: "2025-09-03",
      dateModified: "2025-09-03",
      image: {
        "@type": "ImageObject",
        url: "https://detechnics.com/images/hero1.jpg",
        width: 1920,
        height: 1080,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What industries does D.E. Technics serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The company provides packaging solutions for Food & Beverage, Confectionery Items and Pharmaceuticals.",
          },
        },
        {
          "@type": "Question",
          name: "Which products are highlighted on the home page?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Featured products include horizontal form‑fill‑seal machines (such as the DE‑210 and DE‑2000CW), biscuit‑wrapping machines and wafer equipment.",
          },
        },
        {
          "@type": "Question",
          name: "How does D.E. Technics ensure precision and quality?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "They follow a client‑centric development process and use precision engineering to deliver reliable, high‑quality machines.",
          },
        },
        {
          "@type": "Question",
          name: "What do clients say about D.E. Technics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Testimonials mention improved production efficiency, reliable machines and attentive after‑sales support.",
          },
        },
        {
          "@type": "Question",
          name: "How can I contact D.E. Technics?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Reach them by landline (+92 42 35272601‑02) or mobile (+92‑333‑0184756) or visit the facility at Glaxo Town, 20th Km, Ferozepur Road, Lahore 54760.",
          },
        },
      ],
    },
  ],
} as const /*
  "@graph": [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "D.E. Technics (Pvt.) Ltd.",
  alternateName: "Dynamic Engineering",
  url: "https://detechnics.com",
  logo: "https://detechnics.com/images/logo.png",
  description: "Leading manufacturer of packaging machines and automation solutions since 1984",
  foundingDate: "1984",
  founder: {
    "@type": "Person",
    name: "Muhammad Haroon",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Glaxo Town, 20th Km, Ferozepur Road",
    addressLocality: "Lahore",
    postalCode: "54760",
    addressCountry: "Pakistan",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+92-333-0184756",
    contactType: "customer service",
    email: "info@detechnics.com",
  },
  sameAs: ["https://www.facebook.com/detechnicspk", "https://www.youtube.com/@DETechnicsPK"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Packaging Machines",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "HFFS Machines",
          description: "Horizontal Form Fill Seal packaging machines",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Biscuit Wrapping Machines",
          description: "On-edge biscuit packaging equipment",
        },
      },
      {
      },
      sameAs: ["https://www.facebook.com/detechnicspk", "https://www.youtube.com/@DETechnicsPK"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Packaging Machines",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "HFFS Machines",
              description: "Horizontal Form Fill Seal packaging machines",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Biscuit Wrapping Machines",
              description: "On-edge biscuit packaging equipment",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Wafer Production Lines",
              description: "Complete wafer manufacturing systems",
            },
          },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "D.E. Technics - Advanced Packaging Machines & Solutions Since 1984",
      "url": "https://detechnics.com",
      "inLanguage": "en",
      "description": "Leading manufacturer of HFFS machines, biscuit wrappers, wafer production lines & packaging automation.",
      "datePublished": "2025-09-03",
      "dateModified": "2025-09-03",
      "image": {
        "@type": "ImageObject",
        "url": "https://detechnics.com/images/hero1.jpg",
        "width": 1920,
        "height": 1080
      }
    }
  ]
}

*/

export default function HomePage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Header />

      {/* Hero Section */}
      <div className="mt-0">
        <HeroSlider />
      </div>

      {/* Industries Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Industries We Serve with Advanced Packaging Machines
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              We proudly cater to a diverse range of industries in Pakistan and the region, including Lahore. If you are
              searching for packaging machine Lahore solutions, we provide tailored systems to meet your unique needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <IndustryCard
              icon="/images/food-beverage-icon.png"
              title="Food and Beverage Packing Machines"
              description="We provide advanced packaging solutions for the food and beverage industry, including bakery products, snacks, juices, and dairy items. Our machines ensure hygienic, efficient packaging that maintains product freshness and meets food safety standards."
              bgColor="bg-yellow-50"
            />
            <IndustryCard
              icon="/images/confectionery-icon.jpg"
              title="Confectionery Items Packing Machines"
              description="Our specialized wrapping machines deliver precise, high-speed packaging for chocolates, candies, and sweets. We offer customized solutions that protect product quality while maintaining attractive presentation and extended shelf life."
              bgColor="bg-pink-100"
            />
            <IndustryCard
              icon="/images/pharmaceutical-icon.webp"
              title="Pharmaceuticals Packing Machines"
              description="We design and manufacture high-precision packaging equipment for pharmaceutical products, including blister packaging and sterile sealing systems. Our machines ensure compliance with regulatory standards while maintaining product integrity and safety."
              bgColor="bg-green-100"
            />
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Featured Packing Machines | Best Quality in Pakistan
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              Discover our most popular small packing machines, automatic packing machines, shrink packaging machines,
              vacuum packaging machines, airtight packaging machines, food packaging machines, powder packaging
              machines, sachet packaging machines, blister packaging machines, pillow packaging machines & plastic
              packaging machines with superior quality.
            </p>
            <div className="text-center mt-8 md:mt-10">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-700 min-h-[44px]"
              >
                View All Products
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ProductCard
              image="/images/product-1.jpg"
              title="DE-2050SS HFFS Machine | High-Speed Packing Machine"
              description="Premium horizontal form fill seal machine with servo control. Up to 250 packs/min for biscuits, soap bars & bakery items. Superior automatic packing machine quality in Pakistan."
              link="/products/de-2050ss"
              linkText="View Details →"
              priority={true}
            />
            <ProductCard
              image="/images/product-2.jpg"
              title="DE-4050 Biscuit Wrapper | On-Edge Packing Machine"
              description="Advanced on-edge biscuit wrapping with dual-magazine feeding. High-speed small packing machine with synchronized pushers. Best packing machine quality in Pakistan."
              link="/products/de-4050"
              linkText="View Details →"
              priority={true}
            />
            <ProductCard
              image="/images/product-3.jpg"
              title="DEW Wafer Lines | Complete Production Systems"
              description="Complete wafer production lines from leading wafer lines manufacturer. Available in 31, 45, and 63-plate configurations with integrated automation systems."
              link="/wafer-lines"
              linkText="View Details →"
              priority={true}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <SectionErrorBoundary title="Services Section Error" description="The services section couldn't load.">
        <section className="py-12 md:py-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">How We Work</h2>
              <p className="text-base leading-relaxed text-neutral-700 max-w-2xl mx-auto">
                We offer comprehensive services to ensure your packaging operations run smoothly and efficiently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <ServiceCard
                icon="fas fa-user"
                title="Client-Centric Approach"
                description="Tailoring solutions to your needs, ensuring satisfaction and success."
                iconColor="text-yellow-600"
                bgColor="bg-yellow-50"
              />
              <ServiceCard
                icon="fas fa-tools"
                title="Development"
                description="Pioneering cutting-edge designs, pushing the boundaries of possibility."
                iconColor="text-green-600"
                bgColor="bg-green-100"
              />
              <ServiceCard
                icon="fas fa-graduation-cap"
                title="Precision Engineering"
                description="High-performance solutions with unwavering attention to detail."
                iconColor="text-purple-600"
                bgColor="bg-purple-100"
              />
            </div>
          </div>
        </section>
      </SectionErrorBoundary>

      {/* Testimonials */}
      <SectionErrorBoundary title="Testimonials Section Error" description="The testimonials section couldn't load.">
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">What Our Clients Say</h2>
              <p className="text-base leading-relaxed text-neutral-700 max-w-2xl mx-auto">
                Hear from businesses that have transformed their packaging operations with our solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <TestimonialCard
                rating={5}
                content="The packaging machines from D.E. Technics have significantly improved our production efficiency. Their after-sales service is exceptional."
                clientName="Ahmed Khan"
                clientTitle="Operations Manager, Food Co."
                clientImage="/images/client-1.jpg"
              />
              <TestimonialCard
                rating={5}
                content="We've been using D.E. Technics machines for over 5 years now. Their reliability and the technical support provided are unmatched in the industry."
                clientName="Soban Ahmed"
                clientTitle="Production Director, Pharma Plus"
                clientImage="/images/client-2.jpg"
              />
              <TestimonialCard
                rating={4.5}
                content="The customized packaging solution provided by D.E. Technics perfectly addressed our unique requirements. Their team's expertise is impressive."
                clientName="Usman Ali"
                clientTitle="CEO, Sweet Delights"
                clientImage="/images/client-3.jpg"
              />
            </div>
          </div>
        </section>
      </SectionErrorBoundary>

      {/* FAQ Section */}
      <FAQSection
        title="Frequently Asked Questions"
        faqs={[
          {
            question: "What industries does D.E. Technics serve?",
            answer:
              "The company provides packaging solutions for Food & Beverage, Confectionery Items and Pharmaceuticals.",
          },
          {
            question: "Which products are highlighted on the home page?",
            answer:
              "Featured products include horizontal form‑fill‑seal machines (such as the DE‑210 and DE‑2000CW), biscuit‑wrapping machines and wafer equipment.",
          },
          {
            question: "How does D.E. Technics ensure precision and quality?",
            answer:
              "They follow a client‑centric development process and use precision engineering to deliver reliable, high‑quality machines.",
          },
          {
            question: "What do clients say about D.E. Technics?",
            answer:
              "Testimonials mention improved production efficiency, reliable machines and attentive after‑sales support.",
          },
          {
            question: "How can I contact D.E. Technics?",
            answer:
              "Reach them by landline (+92 42 35272601‑02) or mobile (+92‑333‑0184756) or visit the facility at Glaxo Town, 20th Km, Ferozepur Road, Lahore 54760.",
          },
        ]}
      />

      {/* Call to Action */}
      <section className="relative py-16 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/bg-banner.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Buy Best Quality Packing Machine in Pakistan?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to get premium packing machine solutions in Pakistan. Our small packing machines, automatic
            packing machines, shrink packaging machines, vacuum packaging machines, airtight packaging machines, food
            packaging machines, powder packaging machines, blister packaging machines, filling and packaging machines &
            sealing machines for packaging can improve your efficiency and product quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] font-semibold"
              style={{ color: "#c8a415" }}
            >
              Contact Us
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-800 transition-colors min-h-[44px] font-semibold"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-0">
        <Footer />
      </div>
    </div>
  )
}
