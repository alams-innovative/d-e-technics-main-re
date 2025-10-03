import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ValueProps } from "@/components/value-props"
import { Mission } from "@/components/mission"
import { Approach } from "@/components/approach"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ValueProps />
      <Mission />
      <Approach />
      <CTA />
      <Footer />
    </main>
  )
}
