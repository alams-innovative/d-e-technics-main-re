"use client"

import type React from "react"
import StructuredData from "./StructuredData"

interface SEOHeadProps {
  schemas?: any[]
  children?: React.ReactNode
}

/**
 * Wrapper component for rendering multiple structured data schemas
 *
 * @example
 * ```tsx
 * <SEOHead schemas={[organizationSchema, productSchema, faqSchema]}>
 *   <meta name="custom" content="value" />
 * </SEOHead>
 * ```
 */
export default function SEOHead({ schemas = [], children }: SEOHeadProps) {
  return (
    <>
      {schemas.length > 0 && <StructuredData schema={schemas} />}
      {children}
    </>
  )
}
