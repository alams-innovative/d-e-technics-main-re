"use client"

import { type ComponentType } from 'react'

// Import SVG flags for your database countries
import AU from 'country-flag-icons/react/3x2/AU' // Australia
import CN from 'country-flag-icons/react/3x2/CN' // China  
import FR from 'country-flag-icons/react/3x2/FR' // France
import DE from 'country-flag-icons/react/3x2/DE' // Germany
import IN from 'country-flag-icons/react/3x2/IN' // India
import JP from 'country-flag-icons/react/3x2/JP' // Japan
import PK from 'country-flag-icons/react/3x2/PK' // Pakistan
import SA from 'country-flag-icons/react/3x2/SA' // Saudi Arabia
import KR from 'country-flag-icons/react/3x2/KR' // South Korea
import AE from 'country-flag-icons/react/3x2/AE' // UAE
import GB from 'country-flag-icons/react/3x2/GB' // United Kingdom
import US from 'country-flag-icons/react/3x2/US' // United States
import QA from 'country-flag-icons/react/3x2/QA' // Qatar
import OM from 'country-flag-icons/react/3x2/OM' // Oman
import BH from 'country-flag-icons/react/3x2/BH' // Bahrain
import BD from 'country-flag-icons/react/3x2/BD' // Bangladesh
import LK from 'country-flag-icons/react/3x2/LK' // Sri Lanka
import AF from 'country-flag-icons/react/3x2/AF' // Afghanistan
import TM from 'country-flag-icons/react/3x2/TM' // Turkmenistan
import RU from 'country-flag-icons/react/3x2/RU' // Russia
import ZA from 'country-flag-icons/react/3x2/ZA' // South Africa
import KE from 'country-flag-icons/react/3x2/KE' // Kenya
import TZ from 'country-flag-icons/react/3x2/TZ' // Tanzania
import GH from 'country-flag-icons/react/3x2/GH' // Ghana
import MY from 'country-flag-icons/react/3x2/MY' // Malaysia
import HT from 'country-flag-icons/react/3x2/HT' // Haiti
import MZ from 'country-flag-icons/react/3x2/MZ' // Mozambique
import ID from 'country-flag-icons/react/3x2/ID' // Indonesia
import ZM from 'country-flag-icons/react/3x2/ZM' // Zambia
import CA from 'country-flag-icons/react/3x2/CA' // Canada
import UG from 'country-flag-icons/react/3x2/UG' // Uganda
import TH from 'country-flag-icons/react/3x2/TH' // Thailand

// Mapping from your database phone codes to ISO country codes
const phoneCodeToISO: Record<string, string> = {
  '+61': 'AU',   // Australia
  '+86': 'CN',   // China
  '+33': 'FR',   // France
  '+49': 'DE',   // Germany
  '+91': 'IN',   // India
  '+81': 'JP',   // Japan
  '+92': 'PK',   // Pakistan
  '+966': 'SA',  // Saudi Arabia
  '+82': 'KR',   // South Korea
  '+971': 'AE',  // UAE
  '+44': 'GB',   // United Kingdom
  '+1': 'US',    // United States (default for +1)
  '+974': 'QA',  // Qatar
  '+968': 'OM',  // Oman
  '+973': 'BH',  // Bahrain
  '+880': 'BD',  // Bangladesh
  '+94': 'LK',   // Sri Lanka
  '+93': 'AF',   // Afghanistan
  '+993': 'TM',  // Turkmenistan
  '+7': 'RU',    // Russia
  '+27': 'ZA',   // South Africa
  '+254': 'KE',  // Kenya
  '+255': 'TZ',  // Tanzania
  '+233': 'GH',  // Ghana
  '+60': 'MY',   // Malaysia
  '+509': 'HT',  // Haiti
  '+258': 'MZ',  // Mozambique
  '+62': 'ID',   // Indonesia
  '+260': 'ZM',  // Zambia
  '+256': 'UG',  // Uganda
  '+66': 'TH'    // Thailand
}

// SVG flag components mapped by ISO code
const svgFlagComponents: Record<string, ComponentType<{ className?: string; title?: string }>> = {
  AU: AU,
  CN: CN, 
  FR: FR, 
  DE: DE, 
  IN: IN, 
  JP: JP, 
  PK: PK, 
  SA: SA, 
  KR: KR, 
  AE: AE, 
  GB: GB, 
  US: US,
  QA: QA,
  OM: OM,
  BH: BH,
  BD: BD,
  LK: LK,
  AF: AF,
  TM: TM,
  RU: RU,
  ZA: ZA,
  KE: KE,
  TZ: TZ,
  GH: GH,
  MY: MY,
  HT: HT,
  MZ: MZ,
  ID: ID,
  ZM: ZM,
  CA: CA,
  UG: UG,
  TH: TH
}

// Function to get SVG flag by phone code
export function getSVGFlagByPhoneCode(phoneCode: string, className: string = "w-6 h-4") {
  const isoCode = phoneCodeToISO[phoneCode]
  const FlagComponent = isoCode ? svgFlagComponents[isoCode] : null
  
  if (!FlagComponent) {
    // Fallback - return a placeholder
    return (
      <div 
        className={`${className} bg-gray-200 border border-gray-300 rounded-sm flex items-center justify-center text-xs text-gray-500`}
        title={phoneCode}
      >
        {phoneCode}
      </div>
    )
  }
  
  return <FlagComponent className={className} title={phoneCode} />
}

// Function to replace emoji flag with SVG flag
export function replaceEmojiWithSVG(phoneCode: string, className: string = "w-6 h-4") {
  return getSVGFlagByPhoneCode(phoneCode, className)
}

// Export the phone code to ISO mapping for other uses
export { phoneCodeToISO }

// Default export for backward compatibility
export default svgFlagComponents
