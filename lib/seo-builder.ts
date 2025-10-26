import type { Metadata } from "next"
import { generatePageMetadata, type PageSEOOptions } from "./seo-config"
import {
  generateArticleSchema,
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  generateWebPageSchema,
  generateHowToSchema,
  generateReviewSchema,
  type ArticleSchemaData,
  type ProductSchemaData,
  type FAQData,
  type HowToSchemaData,
  type ReviewData,
} from "./structured-data"
import { generateOrganizationEnhancedSchema } from "@/components/enhanced-structured-data"

export type SchemaType =
  | "organization"
  | "localBusiness"
  | "product"
  | "article"
  | "faq"
  | "breadcrumb"
  | "webpage"
  | "howto"
  | "review"

export interface SEOBuilderOptions extends PageSEOOptions {
  schemas?: SchemaType[]
  schemaData?: {
    article?: ArticleSchemaData
    product?: ProductSchemaData
    faqs?: FAQData[]
    breadcrumb?: Array<{ name: string; url?: string }>
    howto?: HowToSchemaData
    reviews?: ReviewData[]
  }
}

export interface SEOResult {
  metadata: Metadata
  schemas: Array<Record<string, unknown>>
}

/**
 * Main SEO builder function - generates metadata and structured data in one call
 *
 * @example
 * ```ts
 * const seo = buildPageSEO({
 *   title: "DE-210 HFFS Machine",
 *   description: "High-speed packaging machine...",
 *   path: "/products/de-210",
 *   schemas: ['product', 'faq', 'breadcrumb'],
 *   schemaData: {
 *     product: { name: "DE-210", ... },
 *     faqs: [{ question: "...", answer: "..." }],
 *     breadcrumb: [{ name: "Home", url: "/" }, { name: "Products" }]
 *   }
 * })
 * ```
 */
export function buildPageSEO(options: SEOBuilderOptions): SEOResult {
  const { schemas = [], schemaData = {}, ...metadataOptions } = options

  // Generate metadata
  const metadata = generatePageMetadata(metadataOptions)

  // Generate schemas
  const generatedSchemas: Array<Record<string, unknown>> = []

  schemas.forEach((schemaType) => {
    switch (schemaType) {
      case "organization":
        generatedSchemas.push(generateOrganizationEnhancedSchema())
        break

      case "localBusiness":
        generatedSchemas.push(generateLocalBusinessSchema())
        break

      case "product":
        if (schemaData.product) {
          generatedSchemas.push(generateProductSchema(schemaData.product))
        }
        break

      case "article":
        if (schemaData.article) {
          generatedSchemas.push(generateArticleSchema(schemaData.article))
        }
        break

      case "faq":
        if (schemaData.faqs && schemaData.faqs.length > 0) {
          generatedSchemas.push(generateFAQSchema(schemaData.faqs))
        }
        break

      case "breadcrumb":
        if (schemaData.breadcrumb && schemaData.breadcrumb.length > 0) {
          generatedSchemas.push(generateBreadcrumbSchema(schemaData.breadcrumb))
        }
        break

      case "webpage":
        generatedSchemas.push(
          generateWebPageSchema({
            name: metadataOptions.title || "D.E. Technics",
            description: metadataOptions.description || "",
            url: `https://detechnics.com${metadataOptions.path || ""}`,
            image: metadataOptions.image,
            breadcrumb: schemaData.breadcrumb,
          }),
        )
        break

      case "howto":
        if (schemaData.howto) {
          generatedSchemas.push(generateHowToSchema(schemaData.howto))
        }
        break

      case "review":
        if (schemaData.reviews && schemaData.reviews.length > 0) {
          generatedSchemas.push(...generateReviewSchema(schemaData.reviews))
        }
        break
    }
  })

  return {
    metadata,
    schemas: generatedSchemas,
  }
}

/**
 * Quick product page SEO builder
 */
export function buildProductSEO(product: {
  name: string
  description: string
  image: string
  slug: string
  category: string
  faqs?: FAQData[]
  price?: string
  availability?: string
  rating?: number
  reviews?: number
}) {
  return buildPageSEO({
    title: product.name,
    description: product.description,
    path: `/products/${product.slug}`,
    image: product.image,
    keywords: [product.name, product.category, "packaging machine"],
    type: "product",
    schemas: ["product", "breadcrumb", "faq", "organization"],
    schemaData: {
      product: {
        name: product.name,
        description: product.description,
        image: `https://detechnics.com${product.image}`,
        brand: "D.E. Technics",
        manufacturer: "D.E. Technics (Pvt.) Ltd.",
        category: product.category,
        offers: {
          availability: product.availability || "https://schema.org/InStock",
          ...(product.price && { price: product.price, priceCurrency: "PKR" }),
        },
        ...(product.rating && {
          aggregateRating: {
            ratingValue: product.rating,
            reviewCount: product.reviews || 0,
            bestRating: 5,
            worstRating: 1,
          },
        }),
      },
      breadcrumb: [
        { name: "Home", url: "https://detechnics.com" },
        { name: "Products", url: "https://detechnics.com/products" },
        { name: product.category, url: `https://detechnics.com/products#${product.category}` },
        { name: product.name },
      ],
      faqs: product.faqs,
    },
  })
}

/**
 * Quick blog article SEO builder
 */
export function buildArticleSEO(article: {
  title: string
  excerpt: string
  slug: string
  date: string
  category: string
  image: string
  tags?: string[]
  author?: string
}) {
  return buildPageSEO({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.image,
    keywords: article.tags || [],
    type: "article",
    publishedTime: article.date,
    author: article.author || "D.E. Technics Team",
    section: article.category,
    tags: article.tags,
    schemas: ["article", "breadcrumb", "organization"],
    schemaData: {
      article: {
        headline: article.title,
        description: article.excerpt,
        image: `https://detechnics.com${article.image}`,
        datePublished: article.date,
        dateModified: article.date,
        author: {
          name: article.author || "D.E. Technics Team",
          url: "https://detechnics.com/about",
        },
        publisher: {
          name: "D.E. Technics",
          logo: "https://detechnics.com/images/logo.png",
        },
        articleSection: article.category,
        keywords: article.tags,
      },
      breadcrumb: [
        { name: "Home", url: "https://detechnics.com" },
        { name: "Blog", url: "https://detechnics.com/blog" },
        { name: article.title },
      ],
    },
  })
}

/**
 * Quick category page SEO builder
 */
export function buildCategorySEO(category: {
  name: string
  description: string
  slug: string
  keywords?: string[]
}) {
  return buildPageSEO({
    title: `${category.name} - Packaging Machines`,
    description: category.description,
    path: `/products/${category.slug}`,
    keywords: category.keywords || [category.name, "packaging machines"],
    schemas: ["breadcrumb", "organization", "webpage"],
    schemaData: {
      breadcrumb: [
        { name: "Home", url: "https://detechnics.com" },
        { name: "Products", url: "https://detechnics.com/products" },
        { name: category.name },
      ],
    },
  })
}
