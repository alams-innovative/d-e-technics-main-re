"use client"

import type React from "react"
import { useId, useState, useCallback, type KeyboardEvent, useEffect } from "react"

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  initialId?: string
  className?: string
}

export default function Tabs({ tabs, initialId, className = "" }: TabsProps) {
  const [active, setActive] = useState<string>(initialId || tabs[0]?.id)
  const tabsId = useId()

  useEffect(() => {
    if (initialId) {
      setActive(initialId)
    }
  }, [initialId])

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const currentIdx = tabs.findIndex((t) => t.id === active)
      if (currentIdx < 0) return
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        setActive(tabs[(currentIdx + 1) % tabs.length].id)
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        setActive(tabs[(currentIdx - 1 + tabs.length) % tabs.length].id)
      }
    },
    [active, tabs],
  )

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Product sections"
        className="flex flex-wrap gap-2 border-b border-neutral-200"
        onKeyDown={onKeyDown}
      >
        {tabs.map((t) => {
          const isActive = t.id === active
          return (
            <button
              key={t.id}
              role="tab"
              id={`${tabsId}-${t.id}-tab`}
              aria-controls={`${tabsId}-${t.id}-panel`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(t.id)}
              className={`px-4 py-2 text-sm rounded-t-lg border-b-2 -mb-px ${isActive ? "border-blue-600 text-blue-700" : "border-transparent text-neutral-600 hover:text-neutral-800"}`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {tabs.map((t) => {
        const isActive = t.id === active
        return (
          <div
            key={t.id}
            role="tabpanel"
            id={`${tabsId}-${t.id}-panel`}
            aria-labelledby={`${tabsId}-${t.id}-tab`}
            hidden={!isActive}
            className="pt-6"
          >
            {isActive && t.content}
          </div>
        )
      })}
    </div>
  )
}
