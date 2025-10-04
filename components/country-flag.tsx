"use client"

import { getSVGFlagByPhoneCode } from './svg-flags'

interface CountryFlagProps {
  phoneCode: string
  className?: string
  country?: string
}

export default function CountryFlag({ phoneCode, className = "w-12 h-8 rounded border border-gray-200 shadow-sm", country }: CountryFlagProps) {
  return getSVGFlagByPhoneCode(phoneCode, className)
}
