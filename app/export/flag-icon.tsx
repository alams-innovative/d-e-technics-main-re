"use client"

import type { ComponentType } from "react"

// Import only flags used on /export
import AF from "country-flag-icons/react/3x2/AF"
import GH from "country-flag-icons/react/3x2/GH"
import MY from "country-flag-icons/react/3x2/MY"
import RU from "country-flag-icons/react/3x2/RU"
import TZ from "country-flag-icons/react/3x2/TZ"
import GB from "country-flag-icons/react/3x2/GB"
import BH from "country-flag-icons/react/3x2/BH"
import HT from "country-flag-icons/react/3x2/HT"
import MZ from "country-flag-icons/react/3x2/MZ"
import SA from "country-flag-icons/react/3x2/SA"
import TM from "country-flag-icons/react/3x2/TM"
import US from "country-flag-icons/react/3x2/US"
import BD from "country-flag-icons/react/3x2/BD"
import ID from "country-flag-icons/react/3x2/ID"
import OM from "country-flag-icons/react/3x2/OM"
import ZA from "country-flag-icons/react/3x2/ZA"
import AE from "country-flag-icons/react/3x2/AE"
import ZM from "country-flag-icons/react/3x2/ZM"
import CA from "country-flag-icons/react/3x2/CA"
import KE from "country-flag-icons/react/3x2/KE"
import QA from "country-flag-icons/react/3x2/QA"
import LK from "country-flag-icons/react/3x2/LK"
import UG from "country-flag-icons/react/3x2/UG"
import IN from "country-flag-icons/react/3x2/IN"
import PK from "country-flag-icons/react/3x2/PK"
import TH from "country-flag-icons/react/3x2/TH"

const FlagByName: Record<string, ComponentType<{ className?: string; title?: string }>> = {
  Afghanistan: AF,
  Ghana: GH,
  Malaysia: MY,
  Russia: RU,
  Tanzania: TZ,
  "United Kingdom": GB,
  Bahrain: BH,
  Haiti: HT,
  Mozambique: MZ,
  "Saudi Arabia": SA,
  Turkmenistan: TM,
  "United States": US,
  Bangladesh: BD,
  Indonesia: ID,
  Oman: OM,
  "South Africa": ZA,
  "United Arab Emirates": AE,
  Zambia: ZM,
  Canada: CA,
  Kenya: KE,
  Qatar: QA,
  "Sri Lanka": LK,
  Uganda: UG,
  India: IN,
  Pakistan: PK,
  Thailand: TH,
}

export default function FlagIcon({ name, className, title }: { name: string; className?: string; title?: string }) {
  const Flag = FlagByName[name]
  if (!Flag) return null
  return <Flag className={className} title={title ?? name} />
}