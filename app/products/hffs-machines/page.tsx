import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import { getProductsByCategory } from "@/lib/product-data"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "HFFS Machines | Horizontal Form Fill Seal | D.E. Technics",
  description: "Explore D.E. Technics' range of HFFS (Horizontal Form Fill Seal) machines for biscuits, confectionery, bakery products, food packaging machines, snack food packaging machines. High-speed, reliable packaging solutions at competitive packing machine price in Pakistan. Local support for packaging machine lahore clients.",
  keywords: "HFFS machines, horizontal form fill seal, packaging machines, biscuit wrapping, confectionery packaging, food packaging machine, snack food packaging machine, bakery packaging machine, pillow packaging machine, plastic packaging machine, automatic packing machine, small packing machine price in Pakistan, buy packing machine, packing machine price in Pakistan, packaging machine lahore, D.E. Technics, flow wrapper, sachet packaging, sachet packing, seal machine, pack machine, heat seal machine, wrapper machine, heat and seal machine, GulfoodManufacturing, DubaiExhibition, ManufacturingInnovation, FoodIndustry, PackagingSolutions, SAMAEngineering, PakistanPavilion, MeetUsInDubai, GlobalExpo, PakistanEntrepreneursAward, AwardWinner, lahoreengineering, packingmachinery, packing, packingmachine, packaging, packagingmachine, wrappingmachinery, wrapping, biscuits, soap, cake, BeveragePackaging, DairyProcessing, PackagingMachinery, MetalDetectors, XRayInspection, QualityAssurance, millipack, packagingpakistan, packagingindustry, industrialprinters, foodprocessing",
  openGraph: {
    title: "HFFS Machines | Horizontal Form Fill Seal | D.E. Technics",
    description: "Explore D.E. Technics' range of HFFS machines for high-speed packaging solutions.",
    images: ["/images/hffs-category.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HFFS Machines | Horizontal Form Fill Seal | D.E. Technics",
    description: "Explore D.E. Technics' range of HFFS machines for high-speed packaging solutions.",
    images: ["/images/hffs-category.jpg"],
  },
  alternates: {
    canonical: "https://detechnics.com/products/hffs-machines",
  },
}

export default function HFFSMachinesPage() {
  const hffsProducts = getProductsByCategory("HFFS Machines")

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "HFFS Machines" }
  ]

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "HFFS Machines",
    "description": "Horizontal Form Fill Seal machines for packaging applications",
    "url": "https://detechnics.com/products/hffs-machines",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": hffsProducts.map((product, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": product.name,
        "description": product.description,
        "image": `https://detechnics.com${product.images[0]}`,
        "url": `https://detechnics.com/products/${product.slug}`
      }))
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://detechnics.com/" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://detechnics.com/products" },
      { "@type": "ListItem", "position": 3, "name": "HFFS Machines", "item": "https://detechnics.com/products/hffs-machines" }
    ]
  }

  return (
    <div>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} 
      />
      
      <Header />
      
      {/* Category Hero */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/bg-banner.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <Breadcrumb items={breadcrumbItems} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">HFFS Machines</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Horizontal Form Fill Seal machines designed for high-speed, reliable packaging of biscuits, confectionery, and bakery products. Available with on-site assistance for <strong>packaging machine lahore</strong> projects.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hffsProducts.map((product) => (
              <Link 
                key={product.slug} 
                href={`/products/${product.slug}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium" style={{color: '#c8a415'}}>
                      {product.specifications["Production Speed"] || "High Speed"}
                    </span>
                    <span className="font-medium hover:opacity-80" style={{color: '#c8a415'}}>
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our HFFS Machines?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our horizontal form fill seal machines offer superior performance and reliability for your packaging needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'rgba(200, 164, 21, 0.1)'}}>
                <i className="fas fa-tachometer-alt text-2xl" style={{color: '#c8a415'}}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">High Speed</h3>
              <p className="text-gray-600">Up to 250 packages per minute for maximum productivity</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-cogs text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Servo Control</h3>
              <p className="text-gray-600">Advanced servo motor systems for precise operation</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-exchange-alt text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Changeover</h3>
              <p className="text-gray-600">Fast product changeover for versatile production</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-orange-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliable Sealing</h3>
              <p className="text-gray-600">Consistent, high-quality sealing for product protection</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
