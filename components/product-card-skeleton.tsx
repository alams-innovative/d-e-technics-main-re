import SkeletonLoader from "./skeleton-loader"

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Image skeleton */}
      <SkeletonLoader variant="rectangular" height={192} className="w-full" />

      <div className="p-6">
        {/* Title skeleton */}
        <SkeletonLoader variant="text" className="mb-2" width="80%" />

        {/* Description skeleton */}
        <SkeletonLoader variant="text" lines={3} className="mb-4" />

        {/* Link skeleton */}
        <SkeletonLoader variant="text" width="40%" />
      </div>
    </div>
  )
}
