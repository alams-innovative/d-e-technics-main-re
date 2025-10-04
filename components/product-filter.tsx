"use client"

import { useState, useEffect } from "react"

interface FilterOption {
  value: string
  label: string
}

interface ProductFilterProps {
  filters: FilterOption[]
  onFilterChange?: (activeFilter: string) => void
  defaultFilter?: string
  className?: string
}

export default function ProductFilter({
  filters,
  onFilterChange,
  defaultFilter = "all",
  className = ""
}: ProductFilterProps) {
  const [activeFilter, setActiveFilter] = useState(defaultFilter)

  useEffect(() => {
    // Apply filter to product cards on the page
    const productCards = document.querySelectorAll(".product-card")
    
    productCards.forEach((card) => {
      const categoryElement = card.querySelector(".product-category")
      if (categoryElement) {
        const categoryText = categoryElement.textContent || ""
        const shouldShow = activeFilter === "all" || categoryText.includes(activeFilter)
        
        const cardElement = card as HTMLElement
        cardElement.style.display = shouldShow ? "block" : "none"
      }
    })
  }, [activeFilter])

  const handleFilterClick = (filterValue: string) => {
    setActiveFilter(filterValue)
    onFilterChange?.(filterValue)
  }

  return (
    <div className={`product-filter flex flex-wrap gap-2 mb-6 ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleFilterClick(filter.value)}
          className={`filter-btn px-4 py-2 rounded-lg font-medium transition-colors ${
            activeFilter === filter.value
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          data-filter={filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
