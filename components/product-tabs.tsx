"use client"

import { useState } from "react"

interface TabContent {
  id: string
  label: string
  content: React.ReactNode
}

interface ProductTabsProps {
  tabs: TabContent[]
  defaultTab?: string
  className?: string
}

export default function ProductTabs({ 
  tabs, 
  defaultTab,
  className = "" 
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "")

  if (!tabs || tabs.length === 0) {
    return null
  }

  const activeTabContent = tabs.find(tab => tab.id === activeTab)

  return (
    <div className={`product-tabs ${className}`}>
      {/* Tab Buttons */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-btn px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === tab.id
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}
            data-tab={tab.id}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={tab.id}
            className={`tab-pane ${activeTab === tab.id ? "active block" : "hidden"}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}
