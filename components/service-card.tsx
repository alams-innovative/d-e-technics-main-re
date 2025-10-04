interface ServiceCardProps {
  icon: string
  title: string
  description: string
  iconColor?: string
  bgColor?: string
}

export default function ServiceCard({
  icon,
  title,
  description,
  iconColor = "text-blue-600",
  bgColor = "bg-blue-100",
}: ServiceCardProps) {
  return (
    <div className="h-full flex flex-col text-center p-6 bg-white rounded-2xl border border-neutral-200/60 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className={`w-16 h-16 mx-auto mb-4 ${bgColor} rounded-full flex items-center justify-center`}>
        <i className={`${icon} text-2xl ${iconColor}`}></i>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-base leading-relaxed text-neutral-700 flex-grow">{description}</p>
    </div>
  )
}
