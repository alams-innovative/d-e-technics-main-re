import Head from "next/head"

interface SEOHeadProps {
  title: string
  description: string
  canonical: string
  ogImage?: string
  noIndex?: boolean
  structuredData?: object
}

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = "/images/logo.png",
  noIndex = false,
  structuredData,
}: SEOHeadProps) {
  const fullImageUrl = ogImage.startsWith("http") ? ogImage : `https://detechnics.com${ogImage}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="D.E. Technics" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@detechnics" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      )}

      {/* Additional SEO meta tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
    </Head>
  )
}
