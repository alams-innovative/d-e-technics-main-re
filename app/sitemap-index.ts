import type { MetadataRoute } from "next"

export default function sitemapIndex(): MetadataRoute.Sitemap {
  const baseUrl = "https://detechnics.com"

  return [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
    },
    // Future expansion for product-specific sitemaps
    // {
    //   url: `${baseUrl}/sitemap-products.xml`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${baseUrl}/sitemap-categories.xml`,
    //   lastModified: new Date(),
    // },
  ]
}
