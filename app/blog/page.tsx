// BLOG TEMPORARILY DISABLED - Uncomment below to re-enable
import { redirect } from 'next/navigation'

// Original blog page code (commented out for future use):
/*
import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import { COMMON_BREADCRUMBS } from "@/lib/breadcrumb-utils"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { blogMetaList as blogPosts } from "@/lib/blog-data"

export const metadata: Metadata = {
  title: "Blog - Packaging Industry Insights | D.E. Technics",
  description:
    "Stay updated with the latest packaging industry trends, machine guides, and expert insights from D.E. Technics. Learn about HFFS machines, confectionery packaging, and more.",
  keywords:
    "packaging blog, HFFS machine guide, confectionery packaging, chocolate packaging, biscuit packaging, horizontal form fill seal, packaging industry news, D.E. Technics insights",
  openGraph: {
    title: "Blog - Packaging Industry Insights | D.E. Technics",
    description:
      "Stay updated with the latest packaging industry trends, machine guides, and expert insights from D.E. Technics.",
    images: [
      {
        url: "/images/blog-hero.jpg",
        width: 1200,
        height: 630,
        alt: "D.E. Technics packaging industry blog and insights",
      },
    ],
    url: "https://detechnics.com/blog",
    type: "website",
    siteName: "D.E. Technics",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Packaging Industry Insights | D.E. Technics",
    description:
      "Stay updated with the latest packaging industry trends, machine guides, and expert insights from D.E. Technics.",
    images: [{ url: "/images/blog-hero.jpg" }],
    creator: "@detechnics",
    site: "@detechnics",
  },
  alternates: {
    canonical: "https://detechnics.com/blog",
  },
}

// Sourced from lib/blog-posts to keep a single source of truth
*/

export default function BlogPage() {
  // Redirect to home page while blog is disabled
  redirect('/')
  
  /* Original blog page component (commented out for future use):
  return (
    <div>
      <Header />
      
      <Breadcrumb items={COMMON_BREADCRUMBS.blog} />

      {/* Blog Hero Section *//*
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
            Packaging Industry Insights
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Stay updated with the latest trends, guides, and expert insights from the world of packaging machinery and automation.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid *//*
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-2xl border border-neutral-200/60 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="relative h-48 md:h-52">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-sm text-neutral-600 mb-3">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  
                  <h2 className="text-xl font-semibold tracking-tight mb-3 line-clamp-2">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-neutral-700 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
                  >
                    Read More
                    <i className="fas fa-arrow-right ml-2 text-sm"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
  */
}
