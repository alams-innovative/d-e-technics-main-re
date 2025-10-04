import React from "react"
import { productData } from "@/lib/product-data"

interface Props {
  baseUrl?: string
  nonce?: string
}

export default function ProductsItemListJsonLd({ baseUrl = "https://detechnics.com", nonce }: Props) {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: productData.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${baseUrl}/products/${p.slug}`,
      name: p.name,
    })),
  }

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  )
}
