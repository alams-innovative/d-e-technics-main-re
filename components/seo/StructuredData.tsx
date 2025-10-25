"use client"

interface StructuredDataProps {
  schema: any | any[]
}

/**
 * Renders JSON-LD structured data for SEO
 *
 * @example
 * ```tsx
 * <StructuredData schema={generateProductSchema({ name: "DE-210", ... })} />
 * ```
 */
export default function StructuredData({ schema }: StructuredDataProps) {
  const schemas = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {schemas.map((schemaItem, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaItem) }}
        />
      ))}
    </>
  )
}
