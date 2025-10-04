// BLOG POSTS TEMPORARILY DISABLED - Uncomment below to re-enable
import { redirect } from 'next/navigation'

// Original blog post page code (commented out for future use):
/*
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import { COMMON_BREADCRUMBS } from "@/lib/breadcrumb-utils"
import type { Metadata } from "next"
import { getAllBlogSlugs, getBlogMetaBySlug } from "@/lib/blog-data"

// Using BlogPost type from lib/blog-posts

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogMetaBySlug(slug)
  
  if (!post) {
    return {
      title: "Blog Post Not Found | D.E. Technics"
    }
  }

  return {
    title: `${post.title} | D.E. Technics Blog`,
    description: post.description || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt,
      images: [{ url: post.image }],
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || post.excerpt,
      images: [{ url: post.image }],
    },
    alternates: {
      canonical: `https://detechnics.com/blog/${slug}`,
    },
  }
}
*/

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Redirect to home page while blog is disabled
  redirect('/')
  
  /* Original blog post component (commented out for future use):
  const { slug } = await params
  // Dynamically import JSX content to avoid evaluating it in the metadata worker
  const { getBlogBySlug } = await import("@/lib/blog-posts")
  const post = getBlogBySlug(slug)

  if (!post) {
    notFound()
  }

  const breadcrumbItems = [
    ...COMMON_BREADCRUMBS.blog,
    { label: post.title, href: `/blog/${slug}` }
  ]

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description || post.excerpt,
    "image": `https://detechnics.com${post.image}`,
    "author": {
      "@type": "Organization",
      "name": "D.E. Technics"
    },
    "publisher": {
      "@type": "Organization",
      "name": "D.E. Technics",
      "logo": {
        "@type": "ImageObject",
        "url": "https://detechnics.com/images/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://detechnics.com/blog/${slug}`
    }
  }

  return (
    <div>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }} 
      />
      
      <Header />
      
      <Breadcrumb items={breadcrumbItems} />

      {/* Blog Post Content *//*
      <article className="py-16">
        <div className="container max-w-4xl">
          <header className="mb-8">
            <div className="text-sm text-gray-500 mb-2">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-gray-600">{post.description || post.excerpt}</p>
          </header>

          {/* Render structured JSX content *//*
          <div className="prose prose-lg max-w-none">
            {post.content}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
  */
}
