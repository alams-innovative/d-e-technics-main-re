"use client"

import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { generateBreadcrumbSchema } from "@/lib/structured-data"
import StructuredData from "./StructuredData"

interface BreadcrumbItem {
  name: string
  url?: string
}

interface Props {
  items: BreadcrumbItem[]
  className?: string
  includeSchema?: boolean
}

/**
 * Visual breadcrumbs component with automatic schema generation
 *
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { name: "Home", url: "/" },
 *     { name: "Products", url: "/products" },
 *     { name: "DE-210" }
 *   ]}
 *   includeSchema
 * />
 * ```
 */
export default function Breadcrumbs({ items, className = "", includeSchema = true }: Props) {
  return (
    <>
      {includeSchema && <StructuredData schema={generateBreadcrumbSchema(items)} />}

      <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-sm ${className}`}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            {item.url ? (
              <Link href={item.url} className="text-muted-foreground hover:text-foreground transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.name}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  )
}
