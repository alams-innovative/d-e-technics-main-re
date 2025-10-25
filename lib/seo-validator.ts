export interface SEOValidationResult {
  valid: boolean
  warnings: string[]
  errors: string[]
  suggestions: string[]
}

export interface SEOValidationOptions {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  schemas?: any[]
}

export function validateSEO(options: SEOValidationOptions): SEOValidationResult {
  const warnings: string[] = []
  const errors: string[] = []
  const suggestions: string[] = []

  // Title validation
  if (options.title) {
    if (options.title.length < 30) {
      warnings.push(`Title is too short (${options.title.length} chars). Recommended: 50-60 characters.`)
    }
    if (options.title.length > 60) {
      warnings.push(`Title is too long (${options.title.length} chars). It may be truncated in search results.`)
    }
    if (!options.title.includes("D.E. Technics") && !options.title.includes("Packaging")) {
      suggestions.push("Consider including brand name or main keyword in title.")
    }
  } else {
    errors.push("Title is missing. Every page should have a unique title.")
  }

  // Description validation
  if (options.description) {
    if (options.description.length < 120) {
      warnings.push(`Description is too short (${options.description.length} chars). Recommended: 150-160 characters.`)
    }
    if (options.description.length > 160) {
      warnings.push(
        `Description is too long (${options.description.length} chars). It may be truncated in search results.`,
      )
    }
  } else {
    errors.push("Description is missing. Every page should have a meta description.")
  }

  // Keywords validation
  if (!options.keywords || options.keywords.length === 0) {
    suggestions.push("Consider adding relevant keywords for better SEO targeting.")
  } else if (options.keywords.length > 10) {
    warnings.push(`Too many keywords (${options.keywords.length}). Focus on 5-10 most relevant keywords.`)
  }

  // Image validation
  if (!options.image) {
    suggestions.push("Add an Open Graph image for better social media sharing.")
  }

  // Schema validation
  if (!options.schemas || options.schemas.length === 0) {
    suggestions.push("Add structured data (JSON-LD) for better search engine understanding.")
  }

  const valid = errors.length === 0

  return {
    valid,
    warnings,
    errors,
    suggestions,
  }
}

// Development-only console logger
export function logSEOValidation(result: SEOValidationResult, pagePath: string) {
  if (process.env.NODE_ENV !== "development") return

  console.group(`[SEO Validation] ${pagePath}`)

  if (result.valid) {
    console.log("✅ SEO validation passed")
  } else {
    console.log("❌ SEO validation failed")
  }

  if (result.errors.length > 0) {
    console.group("🚨 Errors:")
    result.errors.forEach((error) => console.error(`  - ${error}`))
    console.groupEnd()
  }

  if (result.warnings.length > 0) {
    console.group("⚠️  Warnings:")
    result.warnings.forEach((warning) => console.warn(`  - ${warning}`))
    console.groupEnd()
  }

  if (result.suggestions.length > 0) {
    console.group("💡 Suggestions:")
    result.suggestions.forEach((suggestion) => console.info(`  - ${suggestion}`))
    console.groupEnd()
  }

  console.groupEnd()
}
