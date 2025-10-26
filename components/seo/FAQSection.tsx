"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { generateFAQSchema, type FAQData } from "@/lib/structured-data"
import StructuredData from "./StructuredData"

interface Props {
  faqs: FAQData[]
  title?: string
  description?: string
  className?: string
  includeSchema?: boolean
}

/**
 * FAQ section component with automatic schema generation
 *
 * @example
 * ```tsx
 * <FAQSection
 *   faqs={[
 *     { question: "What is HFFS?", answer: "Horizontal Form Fill Seal..." }
 *   ]}
 *   title="Frequently Asked Questions"
 *   includeSchema
 * />
 * ```
 */
export function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  description,
  className = "",
  includeSchema = true,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      {includeSchema && <StructuredData schema={generateFAQSchema(faqs)} />}

      <section className={`py-12 md:py-16 ${className}`} aria-labelledby="faq-heading">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            {title && (
              <h2 id="faq-heading" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                {title}
              </h2>
            )}
            {description && <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>}
          </div>

          <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium pr-4 text-sm md:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                    style={{ color: "#c8a415" }}
                  />
                </button>

                {openIndex === index && (
                  <div className="p-4 md:p-5 pt-0 text-gray-600 text-sm md:text-base">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQSection
