interface SitemapEntry {
  url: string
  lastModified?: Date
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: number
}

export function generateSitemapEntry(
  baseUrl: string,
  path: string,
  options: {
    lastModified?: Date
    changeFrequency?: SitemapEntry["changeFrequency"]
    priority?: number
  } = {},
): SitemapEntry {
  return {
    url: `${baseUrl}${path}`,
    lastModified: options.lastModified || new Date(),
    changeFrequency: options.changeFrequency || "monthly",
    priority: options.priority || 0.5,
  }
}

export function generateProductSitemap(baseUrl: string, products: string[]): SitemapEntry[] {
  return products.map((product) =>
    generateSitemapEntry(baseUrl, `/products/${product}`, {
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  )
}

export function generateCategorySitemap(baseUrl: string, categories: string[]): SitemapEntry[] {
  return categories.map((category) =>
    generateSitemapEntry(baseUrl, `/products/${category}`, {
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  )
}

export function generateIndustrySitemap(baseUrl: string, industries: string[]): SitemapEntry[] {
  return industries.map((industry) =>
    generateSitemapEntry(baseUrl, `/industries/${industry}`, {
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  )
}

// Product data for sitemap generation
export const PRODUCT_SLUGS = [
  // HFFS Machines
  "de-210",
  "de-2000cw",
  "de-4050",
  "de-2050ss",
  "de-2000",
  "de-300",
  "de-1500",
  "de-1800",
  // Wafer Lines
  "dew-31",
  "dew-45",
  "dew-63",
  "wafer-spreading-machine",
  "cream-mixer",
  "batter-holding-tank",
  "wafer-cutter",
  // Supporting Equipment
  "conveyor-systems",
  "control-panels",
  "mixers",
  "feeders",
]

export const CATEGORY_SLUGS = ["hffs-machines", "biscuit-wrapping", "wafer-equipment", "supporting-equipment"]

export const INDUSTRY_SLUGS = ["food-beverage", "confectionery", "pharmaceutical", "bakery", "soap-detergent"]

// SEO priorities for different page types
export const SEO_PRIORITIES = {
  homepage: 1.0,
  mainPages: 0.8,
  products: 0.9,
  categories: 0.7,
  individualProducts: 0.6,
  industries: 0.6,
  resources: 0.5,
  support: 0.4,
} as const

// Change frequencies for different content types
export const CHANGE_FREQUENCIES = {
  homepage: "weekly",
  products: "weekly",
  categories: "monthly",
  individualProducts: "monthly",
  company: "monthly",
  contact: "monthly",
  resources: "weekly",
  news: "daily",
} as const

export interface SitemapConfig {
  baseUrl: string
  defaultChangeFreq?: SitemapEntry["changeFrequency"]
  defaultPriority?: number
  excludePaths?: string[]
}

export function generateCompleteSitemap(config: SitemapConfig & { blogSlugs?: string[] }): SitemapEntry[] {
  const { baseUrl, defaultChangeFreq = "monthly", defaultPriority = 0.5, excludePaths = [], blogSlugs = [] } = config

  const entries: SitemapEntry[] = []

  // Homepage
  entries.push(
    generateSitemapEntry(baseUrl, "/", {
      changeFrequency: "weekly",
      priority: SEO_PRIORITIES.homepage,
    }),
  )

  // Main pages
  const mainPages = ["/about", "/products", "/services", "/contact", "/clients", "/export", "/blog"]
  mainPages.forEach((page) => {
    if (!excludePaths.includes(page)) {
      entries.push(
        generateSitemapEntry(baseUrl, page, {
          changeFrequency: CHANGE_FREQUENCIES.company as any,
          priority: SEO_PRIORITIES.mainPages,
        }),
      )
    }
  })

  // Product categories
  entries.push(...generateCategorySitemap(baseUrl, CATEGORY_SLUGS))

  // Individual products
  entries.push(...generateProductSitemap(baseUrl, PRODUCT_SLUGS))

  // Industries
  entries.push(...generateIndustrySitemap(baseUrl, INDUSTRY_SLUGS))

  // Blog posts
  if (blogSlugs.length > 0) {
    entries.push(...generateBlogSitemap(baseUrl, blogSlugs))
  }

  return entries.filter((entry) => !excludePaths.includes(new URL(entry.url).pathname))
}

export function generateBlogSitemap(baseUrl: string, blogSlugs: string[]): SitemapEntry[] {
  return blogSlugs.map((slug) =>
    generateSitemapEntry(baseUrl, `/blog/${slug}`, {
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  )
}

export interface ImageSitemapEntry {
  loc: string
  images: Array<{
    loc: string
    title?: string
    caption?: string
  }>
}

export function generateImageSitemap(
  baseUrl: string,
  pages: Array<{
    path: string
    images: Array<{ url: string; title?: string; caption?: string }>
  }>,
): ImageSitemapEntry[] {
  return pages.map((page) => ({
    loc: `${baseUrl}${page.path}`,
    images: page.images.map((img) => ({
      loc: img.url.startsWith("http") ? img.url : `${baseUrl}${img.url}`,
      ...(img.title && { title: img.title }),
      ...(img.caption && { caption: img.caption }),
    })),
  }))
}
