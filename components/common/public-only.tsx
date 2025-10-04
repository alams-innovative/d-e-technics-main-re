"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { isPublicPath } from "@/lib/routes"

interface PublicOnlyProps {
  children: React.ReactNode
}

export default function PublicOnly({ children }: PublicOnlyProps) {
  const pathname = usePathname()
  if (!isPublicPath(pathname || "/")) return null
  return <>{children}</>
}
