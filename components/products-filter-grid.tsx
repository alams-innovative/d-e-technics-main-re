"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { productData } from "@/lib/product-data"

const categories = ["All", ...Array.from(new Set(productData.map(p => p.category)))]

export default function ProductsFilterGrid() {
  const [active, setActive] = useState("All")

  const items = useMemo(() => {
    return active === "All" ? productData : productData.filter(p => p.category === active)
  }, [active])

  return (
    <div className="products-filter-grid">
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full border text-sm ${active === cat ? "bg-blue-600 text-white border-blue-600" : "border-neutral-300 hover:bg-neutral-50"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(prod => (
          <Link key={prod.slug} href={`/products/${prod.slug}`} className="group bg-white rounded-lg border border-neutral-200/60 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="relative w-full aspect-[4/3] bg-neutral-100">
              <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
            </div>
            <div className="p-5">
              <div className="text-xs text-blue-600 font-medium mb-1">{prod.category}</div>
              <h3 className="font-semibold leading-tight mb-2">{prod.name}</h3>
              <div className="text-sm text-neutral-600 line-clamp-2">{prod.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
