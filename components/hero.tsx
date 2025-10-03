export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 to-foreground/70 z-10" />
      <img
        src="/industrial-packaging-machinery-production-line.jpg"
        alt="Industrial machinery"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-background max-w-4xl mx-auto leading-tight text-balance">
          D.E. Technics is a leader in advanced packaging machinery solutions for industrial manufacturing
        </h2>
      </div>
    </section>
  )
}
