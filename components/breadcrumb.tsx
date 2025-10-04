import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: readonly BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `https://detechnics.com${item.href}` }),
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className={`flex items-center text-sm ${className}`} aria-label="Breadcrumb">
        <ol className="flex items-center">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="mx-2 h-4 w-4 opacity-60"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-current hover:opacity-90 underline-offset-4 hover:underline transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="opacity-80" aria-current="page">{item.label}</span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
