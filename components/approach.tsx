export function Approach() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl md:text-4xl font-light mb-16 text-balance">
          A comprehensive approach for future manufacturing
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
            <img
              src="/business-handshake-partnership.png"
              alt="Partnership"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/0 transition-all duration-500" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
            <img
              src="/precision-engineering-manufacturing.jpg"
              alt="Engineering"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/0 transition-all duration-500" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden group cursor-pointer">
            <img
              src="/industrial-machinery-precision-parts.jpg"
              alt="Precision"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/0 transition-all duration-500" />
          </div>
        </div>
      </div>
    </section>
  )
}
