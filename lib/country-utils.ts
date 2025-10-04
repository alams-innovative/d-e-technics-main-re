// lib/country-utils.ts
export interface Country {
  code: string // 3-letter ISO code (PAK, USA, etc.)
  name: string
  flag: string
}

export const COUNTRIES: Country[] = [
  { code: 'PAK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'USA', name: 'United States', flag: '🇺🇸' },
  { code: 'GBR', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'IND', name: 'India', flag: '🇮🇳' },
  { code: 'CHN', name: 'China', flag: '🇨🇳' },
  { code: 'DEU', name: 'Germany', flag: '🇩🇪' },
  { code: 'FRA', name: 'France', flag: '🇫🇷' },
  { code: 'JPN', name: 'Japan', flag: '🇯🇵' },
  { code: 'KOR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'AUS', name: 'Australia', flag: '🇦🇺' },
  { code: 'CAN', name: 'Canada', flag: '🇨🇦' },
  { code: 'BRA', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MEX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'ITA', name: 'Italy', flag: '🇮🇹' },
  { code: 'ESP', name: 'Spain', flag: '🇪🇸' },
  { code: 'NLD', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SGP', name: 'Singapore', flag: '🇸🇬' },
  { code: 'ARE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SAU', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'TUR', name: 'Turkey', flag: '🇹🇷' },
]

// Create lookup maps
const nameToCodeMap = new Map<string, string>()
const codeToCountryMap = new Map<string, Country>()

COUNTRIES.forEach(country => {
  nameToCodeMap.set(country.name.toLowerCase(), country.code)
  codeToCountryMap.set(country.code, country)
})

/**
 * Convert country name or code to ISO 3-letter code
 */
export function getCountryCode(input: string): string | null {
  if (!input) return null
  
  const normalized = input.trim().toLowerCase()
  
  // Check if it's already a valid ISO code
  const upperInput = input.trim().toUpperCase()
  if (codeToCountryMap.has(upperInput)) {
    return upperInput
  }
  
  // Try to find by name
  return nameToCodeMap.get(normalized) || null
}

/**
 * Get country information by code
 */
export function getCountryByCode(code: string): Country | null {
  return codeToCountryMap.get(code.toUpperCase()) || null
}

/**
 * Validate and normalize country code input
 */
export function validateCountryCode(input: string): { isValid: boolean; code: string | null; error?: string } {
  if (!input || !input.trim()) {
    return { isValid: false, code: null, error: 'Country is required' }
  }
  
  const code = getCountryCode(input)
  if (!code) {
    return { 
      isValid: false, 
      code: null, 
      error: `Invalid country: "${input}". Please select from the available options.` 
    }
  }
  
  return { isValid: true, code }
}
