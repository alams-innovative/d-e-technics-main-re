interface BreadcrumbItem {
  label: string
  href?: string
}

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }]

  let currentPath = ""

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1

    // Generate human-readable labels
    const label = generateBreadcrumbLabel(segment, currentPath)

    breadcrumbs.push({
      label,
      href: isLast ? undefined : currentPath,
    })
  })

  return breadcrumbs
}

function generateBreadcrumbLabel(segment: string, fullPath: string): string {
  // Handle specific routes
  const routeLabels: Record<string, string> = {
    about: "About Us",
    products: "Products",
    services: "Services",
    "wafer-lines": "Wafer Lines",
    contact: "Contact",
    industries: "Industries",
    resources: "Resources",
    support: "Support",
    news: "News",
    "case-studies": "Case Studies",
    downloads: "Downloads",
  }

  // Handle product categories
  const categoryLabels: Record<string, string> = {
    "hffs-machines": "HFFS Machines",
    "biscuit-wrapping": "Biscuit Wrapping",
    "wafer-equipment": "Wafer Equipment",
    "supporting-equipment": "Supporting Equipment",
  }

  // Handle industry pages
  const industryLabels: Record<string, string> = {
    "food-beverage": "Food & Beverage",
    confectionery: "Confectionery",
    pharmaceutical: "Pharmaceutical",
    bakery: "Bakery",
    "soap-detergent": "Soap & Detergent",
  }

  // Handle product names
  const productLabels: Record<string, string> = {
    "de-210": "DE-210 HFFS Machine",
    "de-2000cw": "DE-2000CW HFFS Machine",
    "de-4050": "DE-4050 Biscuit Wrapper",
    "de-2050ss": "DE-2050SS HFFS Machine",
    "de-2000": "DE-2000 HFFS Machine",
    "de-300": "DE-300 Biscuit Wrapper",
    "dew-31": "DEW-31 Wafer Line",
    "dew-45": "DEW-45 Wafer Line",
    "dew-63": "DEW-63 Wafer Line",
    "wafer-spreading-machine": "Wafer Spreading Machine",
    "cream-mixer": "Cream Mixer",
    "batter-holding-tank": "Batter Holding Tank",
    "wafer-cutter": "Wafer Cutter",
  }

  // Check all label mappings
  if (routeLabels[segment]) return routeLabels[segment]
  if (categoryLabels[segment]) return categoryLabels[segment]
  if (industryLabels[segment]) return industryLabels[segment]
  if (productLabels[segment]) return productLabels[segment]

  // Fallback: convert kebab-case to title case
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Predefined breadcrumbs for common pages
export const COMMON_BREADCRUMBS = {
  home: [{ label: "Home" }],
  about: [{ label: "Home", href: "/" }, { label: "About Us" }],
  products: [{ label: "Home", href: "/" }, { label: "Products" }],
  services: [{ label: "Home", href: "/" }, { label: "Services" }],
  waferLines: [{ label: "Home", href: "/" }, { label: "Wafer Lines" }],
  contact: [{ label: "Home", href: "/" }, { label: "Contact" }],
  blog: [{ label: "Home", href: "/" }, { label: "Blog" }],
} as const

export function getProductBreadcrumbs(productSlug: string): BreadcrumbItem[] {
  const productName = generateBreadcrumbLabel(productSlug, `/products/${productSlug}`)
  return [{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: productName }]
}

export function getCategoryBreadcrumbs(categorySlug: string): BreadcrumbItem[] {
  const categoryName = generateBreadcrumbLabel(categorySlug, `/products/${categorySlug}`)
  return [{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: categoryName }]
}

export function getIndustryBreadcrumbs(industrySlug: string): BreadcrumbItem[] {
  const industryName = generateBreadcrumbLabel(industrySlug, `/industries/${industrySlug}`)
  return [{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: industryName }]
}
