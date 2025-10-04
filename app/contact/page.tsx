import Header from "@/components/header"
import Footer from "@/components/footer"
import FAQSection from "@/components/faq-section"
import ContactForm from "@/components/contact-form"
import Breadcrumb from "@/components/breadcrumb"
import LoadingButton from "@/components/loading-button"
import { generateLocalBusinessSchema, generateFAQSchema } from "@/lib/structured-data"
import { COMMON_BREADCRUMBS } from "@/lib/breadcrumb-utils"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact D.E. Technics - Packing Machine Price in Pakistan | Buy Packing Machine",
  description:
    "Contact D.E. Technics in Lahore for packing machine price in Pakistan. Buy small packing machines, automatic packing machines, shrink packaging machines, vacuum packaging machines, airtight packaging machines, food packaging machines, powder packaging machines, blister packaging machines, sachet packaging machines, filling and packaging machines. For fast assistance on packaging machine Lahore inquiries, call +92-333-0184756.",
  keywords:
    "packing machine price in Pakistan, buy packing machine, small packing machine price in Pakistan, automatic packing machine price in Pakistan, shrink packaging machine, vacuum packaging machine, airtight packaging machine, food packaging machine, powder packaging machine, blister packaging machine, sachet packaging machine, pillow packaging machine, plastic packaging machine, snack food packaging machine, bakery packaging machine, juice packaging machine, candy packaging machine, filling and packaging machine, sealing machines for packaging, machine manufacturer, packaging machine manufacturer in Karachi, contact D.E. Technics, packaging machinery inquiries, customer support, after-sales service, packaging machine lahore",
  openGraph: {
    title: "Contact D.E. Technics - Packaging Machine Experts | Pakistan",
    description:
      "Contact D.E. Technics in Lahore for packaging machinery inquiries, quotes, and support. Call +92-333-0184756 or email info@detechnics.com.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "D.E. Technics - Contact Us for Packaging Machine Solutions",
      },
    ],
    url: "https://detechnics.com/contact",
    type: "website",
    siteName: "D.E. Technics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact D.E. Technics - Packaging Machine Experts | Pakistan",
    description:
      "Contact D.E. Technics in Lahore for packaging machinery inquiries, quotes, and support. Call +92-333-0184756 or email info@detechnics.com.",
    images: ["/images/logo.png"],
    creator: "@detechnics",
    site: "@detechnics",
  },
  alternates: {
    canonical: "https://detechnics.com/contact",
  },
}

const localBusinessSchema = generateLocalBusinessSchema()

const faqSchema = generateFAQSchema([
  {
    question: "What is the typical lead time for machinery delivery?",
    answer:
      "The lead time for our machinery typically ranges from 4 to 12 weeks, depending on the complexity of the machine, customization requirements, and current production schedules. We always provide a specific timeline during the quotation process.",
  },
  {
    question: "Do you provide after-sales service and maintenance?",
    answer:
      "Yes, we offer comprehensive after-sales service and maintenance packages. Our technical support team provides remote assistance, and our field engineers can visit your facility for on-site maintenance and repairs. We also offer maintenance contracts with different service levels to suit your needs.",
  },
  {
    question: "Can your machines be customized for specific packaging requirements?",
    answer:
      "We specialize in customizing our machines to meet specific packaging requirements. Our engineering team works closely with clients to understand their unique needs and develop tailored solutions that address their particular packaging challenges.",
  },
  {
    question: "What training do you provide for machine operators?",
    answer:
      "We provide comprehensive training for machine operators as part of our installation service. This includes hands-on operational training, basic maintenance procedures, troubleshooting techniques, and safety protocols. Additional advanced training sessions can be arranged if needed.",
  },
  {
    question: "Do you offer spare parts for your machines?",
    answer:
      "Yes, we maintain a comprehensive inventory of spare parts for all our machines. We recommend keeping essential spare parts on hand to minimize downtime in case of part replacement needs. Our service contracts include discounts on spare parts purchases.",
  },
])

export default function ContactPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
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
            <Breadcrumb items={COMMON_BREADCRUMBS.contact} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Get Best Packing Machine Price in Pakistan</h2>
            <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              Looking for competitive packing machine prices in Pakistan? Want to buy small packing machines, automatic packing machines, shrink packaging machines, or vacuum packaging machines? If you are searching for packaging machine Lahore support, our local team is ready to help.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm p-6 md:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-6 md:mb-8">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold tracking-tight mb-2">Our Location</h4>
                  <p className="text-neutral-700 leading-relaxed">Glaxo Town, 20th Km, Ferozepur Road Lahore-54760, Pakistan</p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-phone-alt text-green-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold tracking-tight mb-2">Phone Numbers</h4>
                  <p className="text-neutral-700 leading-relaxed mb-1">
                    <a href="tel:+923330184756" className="hover:opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-sm" style={{color: '#c8a415'}}>
                      +92-333-0184756
                    </a>
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    <a href="tel:+924235951301" className="hover:opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-sm" style={{color: '#c8a415'}}>
                      +92-42-35951301
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-envelope text-purple-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold tracking-tight mb-2">Email Address</h4>
                  <p className="text-neutral-700 leading-relaxed">
                    <a href="mailto:info@detechnics.com" className="hover:opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-sm" style={{color: '#c8a415'}}>
                      info@detechnics.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-clock text-orange-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold tracking-tight mb-2">Business Hours</h4>
                  <p className="text-neutral-700 leading-relaxed mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-neutral-700 leading-relaxed mb-1">Saturday: 9:00 AM - 2:00 PM</p>
                  <p className="text-neutral-700 leading-relaxed">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/detechnicspk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.youtube.com/@DETechnicsPK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="text-center mt-8">
              <LoadingButton
                href="https://wa.me/923330184756"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors shadow-lg"
                loadingText="Opening WhatsApp..."
              >
                <i className="fab fa-whatsapp text-xl mr-2"></i>
                Chat with Us on WhatsApp
              </LoadingButton>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Send Us a Message</h2>
            <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Location</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Visit our facility to see our operations firsthand and discuss your packaging needs in person.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d54480.503530954506!2d74.3559486!3d31.413259!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919070c6874e38f%3A0xdba95778fb5628ca!2sD.E.%20Technics%20(Pvt)%20Ltd.%20(Formerly%20Dynamic%20Engineering%20)!5e0!3m2!1sen!2s!4v1742930981065!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        faqs={[
          {
            question: "What is the typical lead time for machinery delivery?",
            answer:
              "Lead times range from 4 to 12 weeks depending on machine complexity, customization and current production schedules. We confirm an exact timeline during quotation.",
          },
          {
            question: "Do you provide after-sales service and maintenance?",
            answer:
              "Yes. We offer comprehensive after-sales service packages, remote assistance and on-site maintenance. Service contracts are available at different levels.",
          },
          {
            question: "Can your machines be customized for specific packaging requirements?",
            answer:
              "Absolutely. Our engineering team tailors machines to unique product sizes, speeds and packaging formats.",
          },
          {
            question: "What training do you provide for machine operators?",
            answer:
              "Installation includes hands-on operational, maintenance and safety training. Advanced sessions can be arranged.",
          },
          {
            question: "Do you offer spare parts for your machines?",
            answer:
              "We stock spare parts for all machines and recommend essential kits to minimize downtime. Service contracts include parts discounts.",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Buy Packing Machine at Best Price in Pakistan?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get competitive packing machine prices in Pakistan. Our machine manufacturer team is ready to help you buy the perfect small packing machines, automatic packing machines, shrink packaging machines, vacuum packaging machines & airtight packaging solutions for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LoadingButton
              href="tel:+923330184756"
              className="bg-white px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              loadingText="Calling..."
            >
              <span style={{color: '#c8a415'}}>
Call Now</span>
            </LoadingButton>
            <Link href="/quote-form" className="inline-flex items-center justify-center bg-white px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px]" style={{color: '#c8a415'}}>Request Quote</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
