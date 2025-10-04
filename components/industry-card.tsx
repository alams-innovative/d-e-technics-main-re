import Image from "next/image"

interface IndustryCardProps {
  icon: string
  title: string
  description: string
  bgColor?: string
}

export default function IndustryCard({ icon, title, description, bgColor = "bg-blue-100" }: IndustryCardProps) {
  return (
    <div className="h-full flex flex-col text-center p-6 bg-white rounded-2xl border border-neutral-200/60 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className={`w-20 h-20 mx-auto mb-4 ${bgColor} rounded-full flex items-center justify-center`}>
        <Image
          src={icon || "/placeholder.svg?height=60&width=60"}
          alt={`${title} - Industrial packaging machinery icon for ${title.toLowerCase()} sector`}
          width={60}
          height={60}
          className="w-12 h-12"
          loading="lazy"
        />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-base leading-relaxed text-neutral-700 flex-grow">{description}</p>
    </div>
  )
}
