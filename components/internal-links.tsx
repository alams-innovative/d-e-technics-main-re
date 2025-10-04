import Link from "next/link"

interface InternalLink {
  href: string
  text: string
  keywords: string[]
}

interface InternalLinksProps {
  currentPage: string
  category?: string
}

export default function InternalLinks({ currentPage, category }: InternalLinksProps) {
  const links: InternalLink[] = [
    {
      href: "/products/de-210",
      text: "DE-210 horizontal form fill seal machine",
      keywords: ["HFFS", "horizontal form fill seal", "biscuit packaging"]
    },
    {
      href: "/products/de-2000cw",
      text: "DE-2000CW HFFS packaging machine",
      keywords: ["HFFS machine", "confectionery packaging", "high-speed wrapping"]
    },
    {
      href: "/products/de-4050",
      text: "DE-4050 biscuit packaging machine",
      keywords: ["biscuit wrapping", "on-edge packaging", "cookie packaging"]
    },
    {
      href: "/wafer-lines",
      text: "wafer lines manufacturer equipment",
      keywords: ["wafer lines", "wafer production", "wafer equipment"]
    },
    {
      href: "/products",
      text: "packaging machines Pakistan",
      keywords: ["packaging equipment", "HFFS machines", "packaging machinery"]
    },
    {
      href: "/about",
      text: "packaging machine manufacturer",
      keywords: ["manufacturer", "company", "expertise"]
    },
    {
      href: "/services",
      text: "packaging solutions and services",
      keywords: ["services", "support", "installation"]
    },
    // Blog temporarily disabled
    // {
    //   href: "/blog",
    //   text: "packaging industry insights",
    //   keywords: ["blog", "insights", "industry news"]
    // }
  ]

  // Filter out current page and select relevant links
  const relevantLinks = links
    .filter(link => link.href !== currentPage)
    .filter(link => {
      if (category) {
        return link.keywords.some(keyword => 
          keyword.toLowerCase().includes(category.toLowerCase()) ||
          category.toLowerCase().includes(keyword.toLowerCase())
        )
      }
      return true
    })
    .slice(0, 4) // Limit to 4 links to avoid over-optimization

  if (relevantLinks.length === 0) return null

  return (
    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Related Solutions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {relevantLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-blue-700 hover:text-blue-900 hover:underline text-sm font-medium transition-colors"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  )
}
