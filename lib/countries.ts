import { query } from './db';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

// Country interface based on cleaned database schema (dial codes only)
export interface Country {
  id: number;
  country_code: string; // Dial codes like "+92", "+1", "+44"
  country_name: string; // Full names like "Pakistan", "United States"
  flag_emoji: string;   // Emojis like "🇵🇰", "🇺🇸"
  created_at?: string;
}

// Cache for database countries to avoid repeated queries
let countriesCache: Country[] | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let lastCacheTime = 0;

// Fetch countries from database
export async function getCountriesFromDB(): Promise<Country[]> {
  const now = Date.now();
  
  // Return cached data if still valid
  if (countriesCache && (now - lastCacheTime) < CACHE_DURATION) {
    return countriesCache;
  }

  try {
    const result = await query(`
      SELECT id, country_code, country_name, flag_emoji, created_at
      FROM countries 
      ORDER BY country_name ASC
    `);
    
    countriesCache = result.rows;
    lastCacheTime = now;
    return countriesCache;
  } catch (error) {
    console.error('Failed to fetch countries from database:', error);
    throw error; // Don't use fallback - ask user what to do
  }
}

// Get country by dial code (e.g., "+92" -> Pakistan info)
export async function getCountryByDialCode(dialCode: string): Promise<Country | null> {
  if (!dialCode) return null;
  
  try {
    // Direct lookup since DB now uses dial codes
    const result = await query(`
      SELECT id, country_code, country_name, flag_emoji, created_at
      FROM countries 
      WHERE country_code = $1
    `, [dialCode]);
    
    return result.rows[0] || null;
  } catch (error) {
    console.error('Failed to get country by dial code:', error);
    return null;
  }
}

// Extract country info from phone number
export async function getCountryFromPhone(phoneNumber: string): Promise<Country | null> {
  if (!phoneNumber) return null;
  
  try {
    const parsed = parsePhoneNumberFromString(phoneNumber);
    if (!parsed) return null;
    
    const dialCode = `+${parsed.countryCallingCode}`;
    return await getCountryByDialCode(dialCode);
  } catch (error) {
    console.error('Failed to extract country from phone:', error);
    return null;
  }
}

// Format country display with flag and name  
export async function getCountryName(countryCode: string): Promise<string> {
  if (!countryCode) return 'Not provided';
  
  try {
    // All country codes are now dial codes like "+92"
    const result = await query(`
      SELECT country_name, flag_emoji 
      FROM countries 
      WHERE country_code = $1
    `, [countryCode]);
    
    const country = result.rows[0];
    return country ? `${country.flag_emoji} ${country.country_name}` : countryCode;
  } catch (error) {
    console.error('Failed to get country name:', error);
    return countryCode;
  }
}

// Get country name only (without flag)
export async function getCountryNameOnly(countryCode: string): Promise<string> {
  if (!countryCode) return 'Not provided';
  
  try {
    // All country codes are now dial codes like "+92"
    const result = await query(`
      SELECT country_name 
      FROM countries 
      WHERE country_code = $1
    `, [countryCode]);
    
    return result.rows[0]?.country_name || countryCode;
  } catch (error) {
    console.error('Failed to get country name only:', error);
    return countryCode;
  }
}

// Validate phone number against supported countries
export async function validatePhoneWithCountry(phoneNumber: string): Promise<{ 
  isValid: boolean; 
  country?: Country; 
  formattedNumber?: string; 
  dialCode?: string;
}> {
  try {
    const parsed = parsePhoneNumberFromString(phoneNumber);
    if (!parsed?.isValid()) {
      return { isValid: false };
    }
    
    const dialCode = `+${parsed.countryCallingCode}`;
    const country = await getCountryByDialCode(dialCode);
    
    return {
      isValid: true,
      country: country || undefined,
      formattedNumber: parsed.format('E.164'),
      dialCode
    };
  } catch (error) {
    console.error('Phone validation error:', error);
    return { isValid: false };
  }
}

// Clear cache (useful for testing)
export function clearCountriesCache(): void {
  countriesCache = null;
  lastCacheTime = 0;
}
