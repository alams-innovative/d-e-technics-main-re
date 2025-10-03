import { Button } from "@/components/ui/button"

export function Mission() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl md:text-4xl font-light text-center mb-16 text-balance">
          Combining innovation, durability and efficiency
        </h3>
        <div className="relative aspect-[16/9] mb-12 overflow-hidden">
          <img src="/engineer-inspecting-industrial-packaging-equipment.jpg" alt="Mission" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base leading-relaxed text-foreground/80 mb-8">
            D.E. Technics serves as a key partner in industrial transformation across food processing, confectionery,
            and pharmaceutical sectors. We deliver sustainable solutions for manufacturing excellence.
          </p>
          <Button variant="default" className="rounded-full px-8">
            Learn more
          </Button>
        </div>
      </div>
    </section>
  )
}
