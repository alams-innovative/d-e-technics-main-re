// Flag image component that serves SVGs from /public/flags/3x2
export default function FlagImg({
  name,
  className,
  width = 40,
  height,
  title,
}: {
  name: string
  className?: string
  width?: number
  height?: number
  title?: string
}) {
  const NameToCode: Record<string, string> = {
    Afghanistan: 'AF',
    Ghana: 'GH',
    Malaysia: 'MY',
    Russia: 'RU',
    Tanzania: 'TZ',
    'United Kingdom': 'GB',
    Bahrain: 'BH',
    Haiti: 'HT',
    Mozambique: 'MZ',
    'Saudi Arabia': 'SA',
    Turkmenistan: 'TM',
    'United States': 'US',
    Bangladesh: 'BD',
    Indonesia: 'ID',
    Oman: 'OM',
    'South Africa': 'ZA',
    'United Arab Emirates': 'AE',
    Zambia: 'ZM',
    Canada: 'CA',
    Kenya: 'KE',
    Qatar: 'QA',
    'Sri Lanka': 'LK',
    Uganda: 'UG',
    India: 'IN',
    Pakistan: 'PK',
    Thailand: 'TH',
  }

  const code = NameToCode[name]
  if (!code) return null

  const intrinsicWidth = width
  const intrinsicHeight = height ?? Math.round((intrinsicWidth * 2) / 3) // 3×2 aspect

  return (
    <img
      src={`/flags/3x2/${code}.svg`}
      width={intrinsicWidth}
      height={intrinsicHeight}
      loading="lazy"
      className={className}
      alt={`${name} flag`}
      title={title ?? name}
    />
  )
}