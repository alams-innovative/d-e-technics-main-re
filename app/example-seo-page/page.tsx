import { buildPageSEO } from "@/lib/seo-builder"
import StructuredData from "@/components/seo/StructuredData"
import Breadcrumbs from "@/components/seo/Breadcrumbs"
import FAQSection from "@/components/seo/FAQSection"

// Generate metadata for this page
export async function generateMetadata() {
  const seo = buildPageSEO({
    title: "Example SEO Page - Complete Implementation Guide",
    description:
      "This is an example page showing how to implement comprehensive SEO with structured data, breadcrumbs, and FAQs.",
    path: "/example-seo-page",
    keywords: ["SEO example", "structured data", "Next.js SEO"],
    schemas: ["organization", "breadcrumb", "faq", "webpage"],
    schemaData: {
      breadcrumb: [{ name: "Home", url: "https://detechnics.com" }, { name: "Example SEO Page" }],
      faqs: [
        {
          question: "How do I add SEO to a new page?",
          answer:
            "Use the buildPageSEO function from lib/seo-builder.ts to generate metadata and schemas, then add the StructuredData component to your page.",
        },
        {
          question: "What schemas should I include?",
          answer:
            "Include organization and breadcrumb on all pages. Add product schema for product pages, article schema for blog posts, and FAQ schema when you have FAQs.",
        },
        {
          question: "How do I validate my SEO?",
          answer:
            "Use the validateSEO function from lib/seo-validator.ts in development to check for common SEO issues.",
        },
      ],
    },
  })

  return seo.metadata
}

export default function ExampleSEOPage() {
  // Build SEO data for the page
  const seo = buildPageSEO({
    title: "Example SEO Page",
    path: "/example-seo-page",
    schemas: ["organization", "breadcrumb", "faq", "webpage"],
    schemaData: {
      breadcrumb: [{ name: "Home", url: "/" }, { name: "Example SEO Page" }],
      faqs: [
        {
          question: "How do I add SEO to a new page?",
          answer:
            "Use the buildPageSEO function from lib/seo-builder.ts to generate metadata and schemas, then add the StructuredData component to your page.",
        },
        {
          question: "What schemas should I include?",
          answer:
            "Include organization and breadcrumb on all pages. Add product schema for product pages, article schema for blog posts, and FAQ schema when you have FAQs.",
        },
        {
          question: "How do I validate my SEO?",
          answer:
            "Use the validateSEO function from lib/seo-validator.ts in development to check for common SEO issues.",
        },
      ],
    },
  })

  return (
    <>
      {/* Add structured data schemas */}
      <StructuredData schema={seo.schemas} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs with schema */}
        <Breadcrumbs
          items={[{ name: "Home", url: "/" }, { name: "Example SEO Page" }]}
          includeSchema={false} // Already included in buildPageSEO
          className="mb-6"
        />

        {/* Page content */}
        <article className="space-y-8">
          <header>
            <h1 className="text-4xl font-bold mb-4">Example SEO Page</h1>
            <p className="text-xl text-muted-foreground">
              This page demonstrates how to implement comprehensive SEO with structured data, breadcrumbs, and FAQs.
            </p>
          </header>

          <section className="prose prose-lg max-w-none">
            <h2>How This Page Works</h2>
            <p>
              This example page shows you exactly how to implement SEO in your D.E. Technics application. The SEO system
              is designed to be extremely easy to use while providing comprehensive search engine optimization.
            </p>

            <h3>What's Included</h3>
            <ul>
              <li>
                <strong>Metadata Generation:</strong> Title, description, Open Graph tags, Twitter cards, and canonical
                URLs
              </li>
              <li>
                <strong>Structured Data:</strong> JSON-LD schemas for Organization, Breadcrumbs, FAQs, and WebPage
              </li>
              <li>
                <strong>Visual Components:</strong> Breadcrumbs and FAQ sections with automatic schema generation
              </li>
              <li>
                <strong>Validation:</strong> Development-time SEO validation to catch issues early
              </li>
            </ul>

            <h3>Quick Implementation</h3>
            <p>To add SEO to any page, you only need to:</p>
            <ol>
              <li>Import the buildPageSEO function</li>
              <li>Call it with your page details</li>
              <li>Export the metadata</li>
              <li>Add the StructuredData component</li>
            </ol>
          </section>

          {/* FAQ section with schema */}
          <FAQSection
            faqs={[
              {
                question: "How do I add SEO to a new page?",
                answer:
                  "Use the buildPageSEO function from lib/seo-builder.ts to generate metadata and schemas, then add the StructuredData component to your page.",
              },
              {
                question: "What schemas should I include?",
                answer:
                  "Include organization and breadcrumb on all pages. Add product schema for product pages, article schema for blog posts, and FAQ schema when you have FAQs.",
              },
              {
                question: "How do I validate my SEO?",
                answer:
                  "Use the validateSEO function from lib/seo-validator.ts in development to check for common SEO issues.",
              },
              {
                question: "Can I customize the SEO for specific pages?",
                answer:
                  "Yes! The buildPageSEO function accepts many options including custom titles, descriptions, keywords, images, and schema data. You can also use the specialized builders like buildProductSEO and buildArticleSEO.",
              },
            ]}
            includeSchema={false} // Already included in buildPageSEO
          />

          <section className="bg-muted p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Next Steps</h3>
            <ul className="space-y-2">
              <li>✅ Review the SEO_USAGE_GUIDE.md in the docs folder</li>
              <li>✅ Check existing pages for implementation examples</li>
              <li>✅ Use TypeScript autocomplete to explore available options</li>
              <li>✅ Test your SEO with Google's Rich Results Test</li>
            </ul>
          </section>
        </article>
      </div>
    </>
  )
}
