"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
  className?: string
}

export default function FAQSection({ faqs, className = "" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={`py-12 md:py-16 bg-gray-50 ${className}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">FAQ</h2>
          <p className="text-base leading-relaxed text-neutral-700 max-w-2xl mx-auto">
            Frequently asked questions about D.E. Technics and our packaging solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden">
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px]"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4 leading-relaxed">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                
                {index < faqs.length - 1 && openIndex !== index && (
                  <div className="border-t border-neutral-200/60"></div>
                )}
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-neutral-200/60">
                    <p className="text-base leading-relaxed text-neutral-700">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
