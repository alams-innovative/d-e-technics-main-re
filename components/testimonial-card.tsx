import Image from "next/image"

interface TestimonialCardProps {
  rating: number
  content: string
  clientName: string
  clientTitle: string
  clientImage: string
}

export default function TestimonialCard({
  rating,
  content,
  clientName,
  clientTitle,
  clientImage,
}: TestimonialCardProps) {
  return (
    <div className="h-full flex flex-col bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex mb-4">
        {[...Array(Math.floor(rating))].map((_, i) => (
          <i key={i} className="fas fa-star text-yellow-400"></i>
        ))}
        {rating % 1 !== 0 && <i className="fas fa-star-half-alt text-yellow-400"></i>}
      </div>
      <p className="text-base leading-relaxed text-neutral-700 mb-6 flex-grow">{content}</p>
      <div className="flex items-center mt-auto">
        <Image
          src={clientImage || "/placeholder.svg?height=50&width=50"}
          alt={`${clientName} - ${clientTitle} testimonial photo for D.E. Technics packaging machines`}
          width={50}
          height={50}
          className="w-12 h-12 rounded-full mr-4"
          loading="lazy"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{clientName}</h4>
          <p className="text-sm text-gray-500">{clientTitle}</p>
        </div>
      </div>
    </div>
  )
}
