export type BlogMeta = {
  slug: string
  title: string
  excerpt: string
  description?: string
  date: string
  category: string
  image: string
  tags?: string[]
}

export const blogMetaList: BlogMeta[] = [
  {
    slug: "biscuit-packaging-machine-the-ultimate-guide-for-optimal-production",
    title: "Biscuit Packaging Machines: The Ultimate Guide for Optimal Production",
    excerpt:
      "Efficient biscuit packaging machines improve quality, consistency, and throughput. Explore types, key features, and how to choose the right system.",
    description:
      "Guide to biscuit packaging machines: types, features, and how D.E. Technics can help optimize production and quality.",
    date: "2025-03-15",
    category: "Packaging Guides",
    image: "/images/blog/featured-post.png",
    tags: ["Horizontal Form Fill Seal", "HFFS", "Packaging", "Industrial Automation", "Manufacturing"],
  },
  {
    slug: "candy-packaging-machines-the-ultimate-guide-to-confectionery-packaging",
    title: "Candy Packaging Machines: The Ultimate Guide to Confectionery Packaging",
    excerpt:
      "Automate candy packaging to improve freshness, efficiency, and shelf appeal. Learn about twist wrap, flow wrap, VFFS, and more.",
    description:
      "Overview of candy packaging systems, key features, and D.E. Technics solutions for confectionery operations.",
    date: "2025-02-12",
    category: "Industry Insights",
    image: "/images/blog/featured-post.png",
    tags: ["Horizontal Form Fill Seal", "HFFS", "Packaging", "Industrial Automation", "Manufacturing"],
  },
  {
    slug: "chocolate-packaging-machine-ensuring-quality-and-enhancing-appeal",
    title: "Chocolate Packaging Machines: Ensuring Quality and Enhancing Appeal",
    excerpt:
      "Protect temperature-sensitive chocolate while elevating presentation with specialized packaging equipment.",
    description:
      "Chocolate packaging: protect quality, extend shelf life, and create premium shelf appeal with the right machinery.",
    date: "2025-02-25",
    category: "Product Focus",
    image: "/images/blog/featured-post.png",
    tags: ["Horizontal Form Fill Seal", "HFFS", "Packaging", "Industrial Automation", "Manufacturing"],
  },
  {
    slug: "hffs-machine-the-ultimate-guide-to-flexible-packaging",
    title: "HFFS Machine: The Ultimate Guide to Flexible Packaging",
    excerpt:
      "Comprehensive guide to HFFS machines: process, features, benefits, and applications across industries.",
    description:
      "Deep dive into Horizontal Form Fill Seal machines and how they optimize packaging operations.",
    date: "2025-01-21",
    category: "Technical Guides",
    image: "/images/blog/featured-post.png",
    tags: ["Horizontal Form Fill Seal", "HFFS", "Packaging", "Industrial Automation", "Manufacturing"],
  },
  {
    slug: "horizontal-form-fill-seal-versatile-packaging-solution",
    title: "Horizontal Form Fill Seal: Versatile Packaging Solution",
    excerpt:
      "Understand the versatility and benefits of HFFS technology across food, pharma, and consumer goods.",
    description:
      "Overview of HFFS technology, key benefits, and real-world applications.",
    date: "2025-01-15",
    category: "Technology",
    image: "/images/blog/featured-post.png",
    tags: ["Horizontal Form Fill Seal", "HFFS", "Packaging", "Industrial Automation", "Manufacturing"],
  },
]

export function getAllBlogSlugs() {
  return blogMetaList.map((p) => p.slug)
}

export function getBlogMetaBySlug(slug: string) {
  return blogMetaList.find((p) => p.slug === slug) || null
}
