import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h1 className="text-xl font-light tracking-wide">D.E. Technics</h1>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Home
              </a>
              <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Products
              </a>
              <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                Services
              </a>
              <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                About
              </a>
            </nav>
          </div>
          <Button variant="default" size="sm" className="rounded-full px-6">
            Contact
          </Button>
        </div>
      </div>
    </header>
  )
}
