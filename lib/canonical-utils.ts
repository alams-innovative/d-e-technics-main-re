export function generateCanonicalUrl(baseUrl: string, path: string): string {
  // Remove trailing slash and ensure proper formatting
  const cleanPath = path === "/" ? "" : path.replace(/\/$/, "")
  return `${baseUrl}${cleanPath}`
}

export function getCanonicalUrl(pathname: string): string {
  const baseUrl = "https://detechnics.com"
  return generateCanonicalUrl(baseUrl, pathname)
}

// Common canonical URL patterns for the site
export const CANONICAL_PATTERNS = {
  home: "https://detechnics.com",
  about: "https://detechnics.com/about",
  products: "https://detechnics.com/products",
  services: "https://detechnics.com/services",
  waferLines: "https://detechnics.com/wafer-lines",
  contact: "https://detechnics.com/contact",
} as const

// Function to handle product canonical URLs
export function getProductCanonicalUrl(productSlug: string): string {
  return `https://detechnics.com/products/${productSlug}`
}

// Function to handle category canonical URLs
export function getCategoryCanonicalUrl(categorySlug: string): string {
  return `https://detechnics.com/products/${categorySlug}`
}

// Function to handle industry canonical URLs
export function getIndustryCanonicalUrl(industrySlug: string): string {
  return `https://detechnics.com/industries/${industrySlug}`
}

// Utility to prevent duplicate content issues
export function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    // Remove trailing slash
    urlObj.pathname = urlObj.pathname.replace(/\/$/, "") || "/"
    // Remove common tracking parameters
    const paramsToRemove = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"]
    paramsToRemove.forEach((param) => urlObj.searchParams.delete(param))
    return urlObj.toString()
  } catch {
    return url
  }
}
