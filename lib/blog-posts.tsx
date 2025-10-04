import React from "react"

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  description?: string
  date: string
  category: string
  image: string
  tags?: string[]
  content: React.ReactNode
}

export const blogPosts: BlogPost[] = [
  {
    slug: "biscuit-packaging-machine-the-ultimate-guide-for-optimal-production",
    title: "Biscuit Packaging Machines: The Ultimate Guide for Optimal Production",
    excerpt:
      "Efficient biscuit packaging machines improve quality, consistency, and throughput. Explore types, key features, and how to choose the right system.",
    description:
      "Guide to biscuit packaging machines: types, features, and how D.E. Technics can help optimize production and quality.",
    date: "2025-03-15",
    category: "Packaging Guides",
    image: "/images/blog/biscuit-packaging-machine.jpg",
    tags: [
      "Horizontal Form Fill Seal",
      "HFFS",
      "Packaging",
      "Industrial Automation",
      "Manufacturing",
    ],
    content: (
      <>
        <div className="post-featured-image mb-8">
          <img
            src="/images/blog/featured-post.png"
            alt="Biscuit Packaging Machines"
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="post-content prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            In the competitive biscuit industry, efficient and attractive packaging is
            crucial for preserving product quality, extending shelf life, and capturing
            consumer attention. Biscuit packaging machines automate and standardize the
            process to maximize throughput and consistency.
          </p>

          <p>
            This guide explores common biscuit packaging machinery, key selection
            criteria, and how D.E. Technics can help you choose the right solution.
          </p>

          <h2>Why Invest in a Biscuit Packaging Machine?</h2>
          <ul>
            <li>
              <strong>Efficiency and Productivity:</strong> High-speed automation boosts
              output compared to manual packaging.
            </li>
            <li>
              <strong>Quality and Safety:</strong> Consistent seals and hygienic design
              reduce contamination risks.
            </li>
            <li>
              <strong>Brand Appeal:</strong> Consistent packs improve shelf presence.
            </li>
            <li>
              <strong>Lower Waste:</strong> Optimized film usage reduces material costs.
            </li>
            <li>
              <strong>Flexibility:</strong> Handle multiple formats and sizes.
            </li>
          </ul>

          <h2>Types of Biscuit Packaging Machines</h2>
          <ul>
            <li>
              <strong>Horizontal Flow Wrappers:</strong> For individual or multipack
              biscuits.
            </li>
            <li>
              <strong>Vertical Form Fill Seal (VFFS):</strong> Pillow/gusseted/stand-up
              pouches.
            </li>
            <li>
              <strong>Tray Sealers:</strong> Pre-formed trays with lidding film.
            </li>
            <li>
              <strong>Rotary Wrappers:</strong> High-speed single biscuit wraps.
            </li>
          </ul>

          <h2>Key Features to Consider</h2>
          <ul>
            <li>
              <strong>Speed/Capacity</strong>
            </li>
            <li>
              <strong>Packaging Format</strong>
            </li>
            <li>
              <strong>Material Compatibility</strong>
            </li>
            <li>
              <strong>Automation Level</strong>
            </li>
            <li>
              <strong>Hygiene and Safety</strong>
            </li>
          </ul>

          <h2>D.E. Technics Solutions</h2>
          <p>
            We deliver durable, efficient, and customizable biscuit packaging lines
            designed for your throughput and product mix, with comprehensive after-sales
            support.
          </p>
        </div>
      </>
    ),
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
    image: "/images/blog/candy-packaging-machines.jpg",
    tags: [
      "Horizontal Form Fill Seal",
      "HFFS",
      "Packaging",
      "Industrial Automation",
      "Manufacturing",
    ],
    content: (
      <>
        <div className="post-featured-image mb-8">
          <img
            src="/images/blog/featured-post.png"
            alt="Candy Packaging Machines"
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="post-content prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            Eye-catching and functional packaging drives confectionery sales while
            protecting quality. Automation ensures efficiency, accuracy, and
            consistency.
          </p>

          <h2>Types of Candy Packaging Machines</h2>
          <ul>
            <li>
              <strong>Twist Wrappers</strong>
            </li>
            <li>
              <strong>Flow Wrappers</strong>
            </li>
            <li>
              <strong>VFFS Pouching</strong>
            </li>
            <li>
              <strong>Cartoners</strong>
            </li>
            <li>
              <strong>Counting/Weighing</strong>
            </li>
          </ul>

          <h2>Key Features</h2>
          <ul>
            <li>Gentle handling and tailored infeed systems</li>
            <li>Reliable sealing: heat/ultrasonic/impulse</li>
            <li>Accurate print registration</li>
            <li>Fast changeover between formats</li>
          </ul>

          <h2>D.E. Technics Solutions</h2>
          <p>
            Robust machines with advanced controls and user-friendly interfaces,
            plus customization to match product and packaging needs.
          </p>
        </div>
      </>
    ),
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
    image: "/images/blog/chocolate-packaging-machine.jpg",
    tags: [
      "Horizontal Form Fill Seal",
      "HFFS",
      "Packaging",
      "Industrial Automation",
      "Manufacturing",
    ],
    content: (
      <>
        <div className="post-featured-image mb-8">
          <img
            src="/images/blog/featured-post.png"
            alt="Chocolate Packaging Machines"
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="post-content prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            Chocolate requires tight control of moisture and temperature. Packaging
            systems must protect product integrity and showcase brand value.
          </p>

          <h2>Core Capabilities</h2>
          <ul>
            <li>Precise sealing to preserve freshness</li>
            <li>Format flexibility for bars, pralines, and assortments</li>
            <li>Premium finishes and print alignment</li>
          </ul>

          <h2>D.E. Technics Solutions</h2>
          <p>
            We provide configurable systems for chocolate producers, enabling
            consistent quality and premium presentation at scale.
          </p>
        </div>
      </>
    ),
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
    image: "/images/blog/hffs-machine-guide.jpg",
    tags: [
      "Horizontal Form Fill Seal",
      "HFFS",
      "Packaging",
      "Industrial Automation",
      "Manufacturing",
    ],
    content: (
      <>
        <div className="post-featured-image mb-8">
          <img
            src="/images/blog/featured-post.png"
            alt="HFFS Machine Guide"
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="post-content prose prose-lg max-w-none">
          <h2>How HFFS Machines Work</h2>
          <ul>
            <li>Film unwinding and forming</li>
            <li>Longitudinal sealing</li>
            <li>Filling</li>
            <li>Cross sealing and cutting</li>
          </ul>

          <h2>Key Features and Benefits</h2>
          <ul>
            <li>Versatile package styles</li>
            <li>Accurate filling systems</li>
            <li>Efficient sealing mechanisms</li>
            <li>High throughput</li>
            <li>Material flexibility</li>
          </ul>

          <h2>Applications</h2>
          <ul>
            <li>Food and beverage</li>
            <li>Pharma and nutraceuticals</li>
            <li>Consumer goods</li>
          </ul>
        </div>
      </>
    ),
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
    image: "/images/blog/horizontal-form-fill-seal.jpg",
    tags: [
      "Horizontal Form Fill Seal",
      "HFFS",
      "Packaging",
      "Industrial Automation",
      "Manufacturing",
    ],
    content: (
      <>
        <div className="post-featured-image mb-8">
          <img
            src="/images/blog/featured-post.png"
            alt="Horizontal Form Fill Seal"
            className="w-full h-auto rounded-md"
          />
        </div>
        <div className="post-content prose prose-lg max-w-none">
          <h2>Understanding the HFFS Process</h2>
          <ul>
            <li>Film unwinding and forming</li>
            <li>Longitudinal sealing</li>
            <li>Filling</li>
            <li>Cross sealing and cutting</li>
          </ul>

          <h3>Key Benefits</h3>
          <ul>
            <li>Versatility</li>
            <li>Efficiency</li>
            <li>Product protection</li>
            <li>Brand appeal</li>
            <li>Material flexibility</li>
          </ul>

          <h2>Applications Across Industries</h2>
          <ul>
            <li>Food</li>
            <li>Pharmaceutical</li>
            <li>Consumer goods</li>
            <li>Industrial</li>
          </ul>
        </div>
      </>
    ),
  },
]

export function getAllBlogSlugs() {
  return blogPosts.map((p) => p.slug)
}

export function getBlogBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug) || null
}
