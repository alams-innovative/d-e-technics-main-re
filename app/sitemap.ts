import type { MetadataRoute } from "next"
import { productData } from "@/lib/product-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://detechnics.com"
  const currentDate = new Date()

  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/wafer-lines`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  // Product pages sourced from productData to avoid drift
  const productPages = productData.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Only include category pages that currently exist in the app
  const categoryPages = ["hffs-machines", "biscuit-wrapping", "supporting-equipment"].map(
    (category) => ({
      url: `${baseUrl}/products/${category}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  )

  return [...staticPages, ...productPages, ...categoryPages]
}
