import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-light mb-8 text-balance">Discuss your project</h3>
        <Button variant="default" className="rounded-full px-8">
          Contact us
        </Button>
      </div>
    </section>
  )
}
