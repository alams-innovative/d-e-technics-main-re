# SEO System Usage Guide

This guide shows you how to easily add and manage SEO in your D.E. Technics application.

## Quick Start

### 1. Product Page SEO (Easiest)

\`\`\`tsx
import { buildProductSEO } from "@/lib/seo-builder"
import StructuredData from "@/components/seo/StructuredData"

export async function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug)
  const seo = buildProductSEO(product)
  return seo.metadata
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug)
  const seo = buildProductSEO(product)
  
  return (
    <>
      <StructuredData schema={seo.schemas} />
      {/* Your page content */}
    </>
  )
}
\`\`\`

### 2. Blog Article SEO

\`\`\`tsx
import { buildArticleSEO } from "@/lib/seo-builder"
import StructuredData from "@/components/seo/StructuredData"

export async function generateMetadata({ params }) {
  const article = getBlogMetaBySlug(params.slug)
  const seo = buildArticleSEO(article)
  return seo.metadata
}

export default function BlogPost({ params }) {
  const article = getBlogMetaBySlug(params.slug)
  const seo = buildArticleSEO(article)
  
  return (
    <>
      <StructuredData schema={seo.schemas} />
      {/* Your article content */}
    </>
  )
}
\`\`\`

### 3. Custom Page SEO

\`\`\`tsx
import { buildPageSEO } from "@/lib/seo-builder"
import StructuredData from "@/components/seo/StructuredData"

export async function generateMetadata() {
  const seo = buildPageSEO({
    title: "About Us - Leading Packaging Machine Manufacturer",
    description: "Learn about D.E. Technics, Pakistan's premier packaging machinery manufacturer since 1984.",
    path: "/about",
    keywords: ["packaging machines", "manufacturing", "Pakistan"],
    schemas: ["organization", "breadcrumb"],
    schemaData: {
      breadcrumb: [
        { name: "Home", url: "https://detechnics.com" },
        { name: "About Us" }
      ]
    }
  })
  
  return seo.metadata
}

export default function AboutPage() {
  const seo = buildPageSEO({
    title: "About Us",
    path: "/about",
    schemas: ["organization", "breadcrumb"],
    schemaData: {
      breadcrumb: [
        { name: "Home", url: "https://detechnics.com" },
        { name: "About Us" }
      ]
    }
  })
  
  return (
    <>
      <StructuredData schema={seo.schemas} />
      {/* Your page content */}
    </>
  )
}
\`\`\`

## Available Schema Types

You can use these schema types in the `schemas` array:

- `"organization"` - Company information
- `"localBusiness"` - Local business with location
- `"product"` - Product details with pricing
- `"article"` - Blog articles
- `"faq"` - FAQ sections
- `"breadcrumb"` - Navigation breadcrumbs
- `"webpage"` - General webpage
- `"howto"` - Step-by-step guides
- `"review"` - Customer reviews

## Using SEO Components

### Breadcrumbs with Schema

\`\`\`tsx
import Breadcrumbs from "@/components/seo/Breadcrumbs"

<Breadcrumbs
  items={[
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "DE-210" }
  ]}
  includeSchema
/>
\`\`\`

### FAQ Section with Schema

\`\`\`tsx
import FAQSection from "@/components/seo/FAQSection"

<FAQSection
  faqs={[
    { 
      question: "What is the DE-210 used for?", 
      answer: "The DE-210 is designed for wrapping large bakery items..." 
    }
  ]}
  title="Frequently Asked Questions"
  includeSchema
/>
\`\`\`

## SEO Validation (Development Only)

\`\`\`tsx
import { validateSEO, logSEOValidation } from "@/lib/seo-validator"

const result = validateSEO({
  title: "My Page Title",
  description: "My page description",
  keywords: ["keyword1", "keyword2"],
  image: "/images/og-image.jpg",
  schemas: [organizationSchema]
})

logSEOValidation(result, "/my-page")
// Logs warnings, errors, and suggestions in development
\`\`\`

## Configuration

Edit `lib/seo-config.ts` to update site-wide SEO settings:

\`\`\`typescript
export const seoConfig = {
  siteName: "D.E. Technics",
  baseUrl: "https://detechnics.com",
  defaultTitle: "D.E. Technics - Leading Packaging Machine Manufacturer",
  defaultDescription: "...",
  // ... more settings
}
\`\`\`

## Best Practices

1. **Always use metadata generation** - Use `generateMetadata()` for dynamic pages
2. **Include breadcrumbs** - Helps users and search engines understand page hierarchy
3. **Add FAQs where relevant** - Great for featured snippets in search results
4. **Use specific keywords** - Include product names, categories, and location
5. **Validate in development** - Check console for SEO warnings and suggestions
6. **Keep descriptions 150-160 chars** - Optimal for search result snippets
7. **Include ratings for products** - Enhances search result appearance

## Examples by Page Type

### Homepage
\`\`\`tsx
schemas: ["organization", "localBusiness"]
\`\`\`

### Product Page
\`\`\`tsx
schemas: ["product", "breadcrumb", "faq", "organization"]
\`\`\`

### Blog Post
\`\`\`tsx
schemas: ["article", "breadcrumb", "organization"]
\`\`\`

### Category Page
\`\`\`tsx
schemas: ["breadcrumb", "organization", "webpage"]
\`\`\`

### Contact Page
\`\`\`tsx
schemas: ["organization", "localBusiness", "breadcrumb"]
\`\`\`

## Need Help?

- Check existing pages for examples
- Review `lib/seo-builder.ts` for all available options
- Use TypeScript autocomplete for schema data structures
