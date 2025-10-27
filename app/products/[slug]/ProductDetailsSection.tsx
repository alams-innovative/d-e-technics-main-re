"use client"

import { useEffect, useState } from "react"
import Tabs, { type TabItem } from "@/components/product/Tabs"

interface ProductDetailsSectionProps {
  tabs: TabItem[]
}

export default function ProductDetailsSection({ tabs }: ProductDetailsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || "description")

  useEffect(() => {
    // Handle initial hash on mount
    const hash = window.location.hash.slice(1)
    if (hash && tabs.some((t) => t.id === hash)) {
      setActiveTab(hash)
      // Scroll to the section after a brief delay to ensure rendering
      setTimeout(() => {
        const element = document.getElementById("product-details")
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1)
      if (newHash && tabs.some((t) => t.id === newHash)) {
        setActiveTab(newHash)
        const element = document.getElementById("product-details")
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [tabs])

  return (
    <section id="product-details" className="py-8 md:py-10 scroll-mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs tabs={tabs} initialId={activeTab} key={activeTab} />
      </div>
    </section>
  )
}
