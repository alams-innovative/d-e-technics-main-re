interface SkeletonLoaderProps {
  className?: string
  variant?: "text" | "rectangular" | "circular"
  width?: string | number
  height?: string | number
  lines?: number
}

export default function SkeletonLoader({
  className = "",
  variant = "rectangular",
  width,
  height,
  lines = 1,
}: SkeletonLoaderProps) {
  const baseClasses = "animate-pulse bg-gray-200 rounded"

  const variantClasses = {
    text: "h-4 rounded",
    rectangular: "rounded-lg",
    circular: "rounded-full",
  }

  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  }

  if (variant === "text" && lines > 1) {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variantClasses.text} ${index < lines - 1 ? "mb-2" : ""}`}
            style={{ width: index === lines - 1 ? "75%" : "100%" }}
          />
        ))}
      </div>
    )
  }

  return <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} style={style} />
}
