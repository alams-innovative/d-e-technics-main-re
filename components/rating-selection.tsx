"use client"

import { useState } from "react"

interface RatingSelectionProps {
  maxRating?: number
  initialRating?: number
  onRatingChange?: (rating: number) => void
  className?: string
  size?: "sm" | "md" | "lg"
  readonly?: boolean
}

export default function RatingSelection({
  maxRating = 5,
  initialRating = 0,
  onRatingChange,
  className = "",
  size = "md",
  readonly = false
}: RatingSelectionProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl"
  }

  const handleStarClick = (starRating: number) => {
    if (readonly) return
    
    setRating(starRating)
    onRatingChange?.(starRating)
  }

  const handleStarHover = (starRating: number) => {
    if (readonly) return
    setHoverRating(starRating)
  }

  const handleMouseLeave = () => {
    if (readonly) return
    setHoverRating(0)
  }

  const displayRating = hoverRating || rating

  return (
    <div 
      className={`rating-select inline-flex gap-1 ${sizeClasses[size]} ${className}`}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: maxRating }, (_, index) => {
        const starRating = index + 1
        const isFilled = starRating <= displayRating

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleStarClick(starRating)}
            onMouseEnter={() => handleStarHover(starRating)}
            className={`transition-colors duration-150 ${
              readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
            } ${isFilled ? "text-yellow-400" : "text-gray-300"}`}
            data-rating={starRating}
            disabled={readonly}
            aria-label={`Rate ${starRating} star${starRating !== 1 ? 's' : ''}`}
          >
            <i className={`${isFilled ? "fas" : "far"} fa-star`}></i>
          </button>
        )
      })}
      
      {rating > 0 && (
        <span className="ml-2 text-sm text-gray-600">
          ({rating}/{maxRating})
        </span>
      )}
    </div>
  )
}
