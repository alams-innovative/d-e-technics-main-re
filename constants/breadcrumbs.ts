interface BreadcrumbItem {
  label: string
  href?: string
}

// Common breadcrumb configurations for different pages
export const COMMON_BREADCRUMBS = {
  home: [{ label: "Home", href: "/" }] as const,

  about: [{ label: "Home", href: "/" }, { label: "About Us" }] as const,

  contact: [{ label: "Home", href: "/" }, { label: "Contact Us" }] as const,

  services: [{ label: "Home", href: "/" }, { label: "Services" }] as const,

  products: [{ label: "Home", href: "/" }, { label: "Products" }] as const,

  blog: [{ label: "Home", href: "/" }, { label: "Blog" }] as const,

  waferLines: [{ label: "Home", href: "/" }, { label: "Wafer Lines" }] as const,
} as const
