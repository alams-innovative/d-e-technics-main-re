import React from "react"

interface Props {
  name: string
  url: string
  logo?: string
  sameAs?: string[]
  nonce?: string
}

export default function OrganizationJsonLd({ name, url, logo, sameAs = [], nonce }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    ...(logo ? { logo } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  }

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
