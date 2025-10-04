"use client"

interface ProductRatingProps {
  rating?: number
  reviews?: number
}

export default function ProductRating({ rating = 0, reviews = 0 }: ProductRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5
  const totalStars = 5

  return (
    <div className="flex items-center gap-2" aria-label={`Rating ${rating} out of 5`}>
      <div className="flex items-center">
        {Array.from({ length: totalStars }).map((_, i) => {
          const isFull = i < fullStars
          const isHalf = !isFull && hasHalf && i === fullStars
          const cls = isFull ? "fas fa-star text-yellow-500" : isHalf ? "fas fa-star-half-alt text-yellow-500" : "far fa-star text-yellow-500"
          return <i key={i} className={cls} aria-hidden="true"></i>
        })}
      </div>
      <span className="text-sm text-neutral-600">({rating.toFixed(1)} - {reviews} Reviews)</span>
    </div>
  )
}
