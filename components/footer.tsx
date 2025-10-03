export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-xl font-light mb-6">D.E. Technics</h4>
            <p className="text-sm text-background/70 leading-relaxed">Advanced packaging machinery solutions</p>
          </div>
          <div>
            <h5 className="text-sm font-light mb-4">Navigation</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-light mb-4">Solutions</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Food & Beverage
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Confectionery
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors">
                  Pharmaceuticals
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-light mb-4">Contact</h5>
            <ul className="space-y-2">
              <li className="text-sm text-background/70">contact@detechnics.com</li>
              <li className="text-sm text-background/70">+92 42 35272601-02</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
