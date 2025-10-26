import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import QuoteForm from "@/components/quote-form"
import { getProductBySlug, getRelatedProducts, productData } from "@/lib/product-data"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import InternalLinks from "@/components/internal-links"
import CTASection from "@/components/cta-section"
import ProductGallery from "@/components/product-gallery"
import ProductRating from "@/components/product-rating"
import ProductShare from "@/components/product-share"
import Tabs from "@/components/product/Tabs"
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd"
import FAQSection from "@/components/seo/FAQSection"

// Generate static params for all products
export async function generateStaticParams() {
  return productData.map((product) => ({
    slug: product.slug,
  }))
}

// Generate metadata for each product
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found | D.E. Technics",
    }
  }

  return {
    title: `${product.name} | Horizontal Form Fill Seal Machine | D.E. Technics`,
    description: `${product.name} - Premium HFFS machine and packaging equipment from leading wafer lines manufacturer. ${product.description} Available with packaging machine lahore support.`,
    keywords: `${product.name}, horizontal form fill seal machine, HFFS machine, ${product.category}, packaging machines Pakistan, wafer lines manufacturer, biscuit packaging machine, D.E. Technics, ${product.applications.join(", ")}, form fill seal equipment, packaging machine lahore`,
    openGraph: {
      title: `${product.name} | D.E. Technics`,
      description: product.description,
      images: [{ url: product.images[0] }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | D.E. Technics`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
    alternates: {
      canonical: `https://detechnics.com/products/${slug}`,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(slug)

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.name },
  ]

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "D.E. Technics",
    },
    manufacturer: {
      "@type": "Organization",
      name: "D.E. Technics (Pvt.) Ltd.",
      url: "https://detechnics.com",
    },
    image: product.images.map((img) => `https://detechnics.com${img}`),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: {
        "@type": "Organization",
        name: "D.E. Technics (Pvt.) Ltd.",
      },
    },
    additionalProperty: Object.entries(product.specifications).map(([key, value]) => ({
      "@type": "PropertyValue",
      name: key,
      value: value,
    })),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://detechnics.com/" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://detechnics.com/products" },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://detechnics.com/products/${slug}` },
    ],
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <OrganizationJsonLd
        name="D.E. Technics (Pvt.) Ltd."
        url="https://detechnics.com"
        logo="https://detechnics.com/images/logo.png"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />

      {/* Page Header Banner */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/bg-banner.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <Breadcrumb items={breadcrumbItems} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{product.name}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">{product.description}</p>
          <div className="flex justify-center items-center gap-4 text-lg">
            <i className="fas fa-cogs text-3xl"></i>
            <span>{product.category}</span>
          </div>
        </div>
      </section>

      {/* Product Hero Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="text-sm font-medium mb-2" style={{ color: "#c8a415" }}>
                {product.category}
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">{product.name}</h2>
              {typeof product.rating !== "undefined" && (
                <div className="mb-4">
                  <ProductRating rating={product.rating} reviews={product.reviews} />
                </div>
              )}
              {product.availability && (
                <div className="text-sm text-neutral-700 mb-2">
                  <strong>Availability:</strong> {product.availability}
                </div>
              )}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-lg leading-relaxed text-neutral-700 mb-6 md:mb-6">{product.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <a
                  href="#quote"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 hover:opacity-90"
                  style={{ backgroundColor: "#c8a415" }}
                >
                  Request Quote
                </a>
                <a
                  href="#specifications"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 hover:bg-neutral-50"
                >
                  View Specifications
                </a>
                {product.brochure && (
                  <a
                    href={product.brochure}
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 hover:bg-neutral-50"
                  >
                    Download Datasheet (PDF)
                  </a>
                )}
              </div>

              <ProductShare productName={product.name} />
            </div>

            <div>
              <ProductGallery images={product.images.map((src) => ({ src, alt: `${product.name} image` }))} />
            </div>
          </div>
        </div>
      </section>

      {/* Details Tabs: Description / Specifications / Applications */}
      <section className="py-8 md:py-10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            tabs={[
              {
                id: "description",
                label: "Description",
                content: (
                  <div id="description" className="prose max-w-none">
                    <p className="text-neutral-700 text-lg leading-relaxed">{product.description}</p>
                  </div>
                ),
              },
              {
                id: "specifications",
                label: "Specifications",
                content: (
                  <div id="specifications">
                    <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden">
                      <div className="text-white p-6 md:p-8" style={{ backgroundColor: "#c8a415" }}>
                        <h3 className="text-xl font-semibold">{product.name} Specifications</h3>
                      </div>
                      <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center py-3 border-b border-neutral-200"
                            >
                              <span className="font-medium text-neutral-700">{key}:</span>
                              <span className="text-neutral-900">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                id: "applications",
                label: "Applications",
                content: (
                  <div id="applications" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {product.applications.map((application, index) => (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm text-center hover:shadow-md transition-shadow duration-200"
                      >
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                          style={{ backgroundColor: "rgba(200, 164, 21, 0.1)" }}
                        >
                          <i className="fas fa-industry text-2xl" style={{ color: "#c8a415" }}></i>
                        </div>
                        <h3 className="font-semibold text-neutral-800">{application}</h3>
                      </div>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Product Features */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-8 md:mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-white text-sm"></i>
                </div>
                <p className="text-neutral-700 leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Images Gallery */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-8 md:mb-12">
            Product Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} horizontal form fill seal machine HFFS packaging equipment detailed view ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section id="specifications" className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-8 md:mb-12">
            Technical Specifications
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden">
              <div className="bg-blue-600 text-white p-6 md:p-8">
                <h3 className="text-xl font-semibold">{product.name} Specifications</h3>
              </div>
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-3 border-b border-neutral-200">
                      <span className="font-medium text-neutral-700">{key}:</span>
                      <span className="text-neutral-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-8 md:mb-12">Applications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {product.applications.map((application, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm text-center hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "rgba(200, 164, 21, 0.1)" }}
                >
                  <i className="fas fa-industry text-2xl" style={{ color: "#c8a415" }}></i>
                </div>
                <h3 className="font-semibold text-neutral-800">{application}</h3>
              </div>
            ))}
          </div>

          {/* Internal Links Section */}
          <div className="mt-12">
            <InternalLinks currentPage={`/products/${slug}`} category={product.category} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {product.faqs && product.faqs.length > 0 && (
        <FAQSection title="Frequently Asked Questions" faqs={product.faqs} className="py-12 md:py-16" />
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-8 md:mb-12">
              Related HFFS Machines & Packaging Equipment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.slug}
                  href={`/products/${relatedProduct.slug}`}
                  className="group bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <Image
                    src={relatedProduct.images[0] || "/placeholder.svg"}
                    alt={`${relatedProduct.name} HFFS machine packaging equipment from wafer lines manufacturer`}
                    width={400}
                    height={250}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <div className="text-sm font-medium mb-2" style={{ color: "#c8a415" }}>
                      {relatedProduct.category}
                    </div>
                    <h3 className="text-lg font-semibold mb-3 leading-tight">{relatedProduct.name}</h3>
                    <p className="text-neutral-700 text-sm leading-relaxed">
                      {relatedProduct.description.substring(0, 100)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote Request Form */}
      <section id="quote" className="py-12 md:py-16" style={{ backgroundColor: "rgba(200, 164, 21, 0.05)" }}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Request a Quote</h2>
              <p className="text-base leading-relaxed text-neutral-700">
                Get a customized quote for the {product.name} tailored to your specific requirements
              </p>
            </div>
            <QuoteForm
              productName={product.name}
              title={`Get Quote for ${product.name}`}
              description="Fill out the form below and our team will provide you with a detailed quotation within 24 hours."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title={`Interested in ${product.name}?`}
        description={`Get detailed specifications and pricing for our ${product.name}. Our packaging experts will help you find the perfect HFFS machine solution for your production needs.`}
        primaryButtonText="Request Quote"
        primaryButtonHref="/contact"
        secondaryButtonText="View All Products"
        secondaryButtonHref="/products"
      />

      <Footer />
    </div>
  )
}
