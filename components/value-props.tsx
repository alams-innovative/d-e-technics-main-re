export function ValueProps() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h3 className="text-sm font-light tracking-wider mb-16">Our core principles</h3>
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          <div className="flex gap-8">
            <div className="text-7xl font-light text-foreground/20">1</div>
            <div className="flex-1 pt-4">
              <p className="text-base leading-relaxed text-foreground/80">
                Support enterprises in their transition to sustainable and efficient manufacturing practices
              </p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-7xl font-light text-foreground/20">2</div>
            <div className="flex-1 pt-4">
              <p className="text-base leading-relaxed text-foreground/80">
                Drive innovation through advanced automation systems and precision engineering solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
