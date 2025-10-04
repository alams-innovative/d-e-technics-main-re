import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import { getProductsByCategory } from "@/lib/product-data"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Biscuit Wrapping Machines | On-Edge Wrappers | D.E. Technics",
  description: "Specialized biscuit wrapping machines for individual biscuit packaging, bakery packaging machines, snack food packaging machines. High-speed on-edge wrapping with precision control and reliable performance at competitive packing machine price in Pakistan. Available for packaging machine lahore clients with local support.",
  keywords: "biscuit wrapping machines, on-edge wrappers, biscuit packaging, individual wrapping, bakery packaging machine, snack food packaging machine, food packaging machine, pillow packaging machine, automatic packing machine, small packing machine price in Pakistan, buy packing machine, packing machine price in Pakistan, D.E. Technics, packaging machine lahore, flow wrapper, sachet packaging, sachet packing, seal machine, pack machine, heat seal machine, wrapper machine, heat and seal machine, GulfoodManufacturing, DubaiExhibition, ManufacturingInnovation, FoodIndustry, PackagingSolutions, SAMAEngineering, PakistanPavilion, MeetUsInDubai, GlobalExpo, PakistanEntrepreneursAward, AwardWinner, lahoreengineering, packingmachinery, packing, packingmachine, packaging, packagingmachine, wrappingmachinery, wrapping, biscuits, soap, cake, BeveragePackaging, DairyProcessing, PackagingMachinery, MetalDetectors, XRayInspection, QualityAssurance, millipack, packagingpakistan, packagingindustry, industrialprinters, foodprocessing",
  openGraph: {
    title: "Biscuit Wrapping Machines | On-Edge Wrappers | D.E. Technics",
    description: "Specialized biscuit wrapping machines for individual biscuit packaging.",
    images: ["/images/biscuit-wrapping-category.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biscuit Wrapping Machines | On-Edge Wrappers | D.E. Technics",
    description: "Specialized biscuit wrapping machines for individual biscuit packaging.",
    images: ["/images/biscuit-wrapping-category.jpg"],
  },
  alternates: {
    canonical: "https://detechnics.com/products/biscuit-wrapping",
  },
}

export default function BiscuitWrappingPage() {
  const biscuitProducts = getProductsByCategory("Biscuit Wrapping")

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Biscuit Wrapping" }
  ]

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Biscuit Wrapping Machines",
    "description": "Specialized machines for individual biscuit wrapping and packaging",
    "url": "https://detechnics.com/products/biscuit-wrapping",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": biscuitProducts.map((product, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": product.name,
        "description": product.description,
        "image": `https://detechnics.com${product.images[0]}`,
        "url": `https://detechnics.com/products/${product.slug}`
      }))
    }
  }

  return (
    <div>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} 
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Biscuit Wrapping Machines</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Specialized on-edge biscuit wrapping machines for individual biscuit packaging with precision and efficiency.
            We also serve customers searching for <strong>packaging machine lahore</strong> solutions.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {biscuitProducts.map((product) => (
              <Link 
                key={product.slug} 
                href={`/products/${product.slug}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Key Features:</h4>
                    <ul className="text-gray-600 space-y-2">
                      {product.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-green-600 mt-1">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-sm text-gray-500">Production Speed</span>
                      <p className="font-medium">{product.specifications["Production Speed"]}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Product Size</span>
                      <p className="font-medium">{product.specifications["Product Size"]}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-orange-600 font-medium">
                      {product.specifications["Production Speed"]}
                    </span>
                    <span className="text-orange-600 hover:text-orange-800 font-medium">
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
            <h2 className="text-3xl font-bold mb-4">Biscuit Wrapping Excellence</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our biscuit wrapping machines deliver precise, efficient packaging for individual biscuits and cookies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-cookie-bite text-orange-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Individual Wrapping</h3>
              <p className="text-gray-600">Precise individual biscuit wrapping for optimal presentation</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'rgba(200, 164, 21, 0.1)'}}>
                <i className="fas fa-arrows-alt text-2xl" style={{color: '#c8a415'}}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Adjustable Sizing</h3>
              <p className="text-gray-600">Accommodates various biscuit shapes and sizes</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-compress-arrows-alt text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Minimal Waste</h3>
              <p className="text-gray-600">Optimized film usage with minimal material waste</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-cog text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Operation</h3>
              <p className="text-gray-600">User-friendly interface with simple controls</p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perfect For</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our biscuit wrapping machines are ideal for various confectionery and bakery applications
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-cookie text-orange-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800">Biscuits & Cookies</h3>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-layer-group text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800">Wafer Products</h3>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-candy-cane text-pink-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800">Confectionery</h3>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-bread-slice text-green-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800">Snack Items</h3>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
