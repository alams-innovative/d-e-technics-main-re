"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { generateFAQSchema, type FAQData } from "@/lib/structured-data"
import StructuredData from "./StructuredData"

interface Props {
  faqs: FAQData[]
  title?: string
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
export default function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  className = "",
  includeSchema = true,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      {includeSchema && <StructuredData schema={generateFAQSchema(faqs)} />}

      <section className={`py-12 ${className}`}>
        {title && <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>}

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>

              {openIndex === index && <div className="p-4 pt-0 text-muted-foreground">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
