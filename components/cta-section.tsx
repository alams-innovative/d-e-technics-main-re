import Link from "next/link"

interface CTASectionProps {
  title?: string
  description?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  className?: string
}

export default function CTASection({
  title = "Ready to Optimize Your Packaging Process?",
  description = "Get expert consultation on horizontal form fill seal machines and packaging solutions. Contact our wafer lines manufacturer team for customized HFFS equipment quotes.",
  primaryButtonText = "Get Free Quote",
  primaryButtonHref = "/contact",
  secondaryButtonText = "View Products",
  secondaryButtonHref = "/products",
  className = ""
}: CTASectionProps) {
  return (
    <section className={`py-16 bg-gradient-to-r from-blue-600 to-blue-800 ${className}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={primaryButtonHref}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 shadow-lg"
          >
            {primaryButtonText}
          </Link>
          <Link
            href={secondaryButtonHref}
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
          >
            {secondaryButtonText}
          </Link>
        </div>
      </div>
    </section>
  )
}
