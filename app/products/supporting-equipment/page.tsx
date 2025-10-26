import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import { getProductsByCategory } from "@/lib/product-data"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Supporting Equipment | Auxiliary Packing Machine Equipment | D.E. Technics",
  description: "Complete your packing machine production line with D.E. Technics supporting equipment at competitive packing machine price in Pakistan including cream mixers, batter tanks, wafer cutters, filling and packaging machines, sealing machines for packaging. Local assistance available for packaging machine lahore clients.",
  keywords: "supporting equipment, auxiliary packing machine, cream mixer, batter tank, wafer cutter, spreading machine, filling and packaging machine, sealing machines for packaging, juice packaging machine, candy packaging machine, dairy packaging machine, food packaging machine, powder packaging machine, blister packaging machine, sachet packaging machine, automatic packing machine accessories, small packing machine equipment, buy packing machine, packaging machine lahore, flow wrapper, sachet packaging, sachet packing, seal machine, pack machine, heat seal machine, wrapper machine, heat and seal machine, GulfoodManufacturing, DubaiExhibition, ManufacturingInnovation, FoodIndustry, PackagingSolutions, SAMAEngineering, PakistanPavilion, MeetUsInDubai, GlobalExpo, PakistanEntrepreneursAward, AwardWinner, lahoreengineering, packingmachinery, packing, packingmachine, packaging, packagingmachine, wrappingmachinery, wrapping, biscuits, soap, cake, BeveragePackaging, DairyProcessing, PackagingMachinery, MetalDetectors, XRayInspection, QualityAssurance, millipack, packagingpakistan, packagingindustry, industrialprinters, foodprocessing, Strapack, PackagingStraps, SecureShipping, DurableStraps, ReliablePackaging, PrintedStraps, CustomBranding, honeypackaging, FoodGrade, SmallBusiness, honeystorage, LeakProof, Customizable, BrandingOpportunity, NewBusiness, Startups, WomenInBusiness",
  openGraph: {
    title: "Supporting Equipment | Auxiliary Packing Machine Equipment | D.E. Technics",
    description: "Complete your packing machine production line with D.E. Technics supporting equipment at competitive packing machine price in Pakistan.",
    images: ["/images/supporting-equipment-category.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supporting Equipment | Auxiliary Packing Machine Equipment | D.E. Technics",
    description: "Complete your packing machine production line with D.E. Technics supporting equipment at competitive packing machine price in Pakistan.",
    images: ["/images/supporting-equipment-category.jpg"],
  },
  alternates: {
    canonical: "https://detechnics.com/products/supporting-equipment",
  },
}

export default function SupportingEquipmentPage() {
  const supportingProducts = getProductsByCategory("Supporting Equipment")

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Supporting Equipment" }
  ]

  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Supporting Equipment",
    "description": "Auxiliary equipment for complete production line solutions",
    "url": "https://detechnics.com/products/supporting-equipment",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": supportingProducts.map((product, index) => ({
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
      { "@type": "ListItem", "position": 3, "name": "Supporting Equipment", "item": "https://detechnics.com/products/supporting-equipment" }
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
        <div className="relative container mx-auto px-4 text-center">
          <div className="mb-4">
            <Breadcrumb items={breadcrumbItems} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Packing Machine Supporting Equipment</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Complete your packing machine production line with our range of auxiliary equipment at competitive packing machine price in Pakistan. We also support <strong>packaging machine lahore</strong> projects with local service.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportingProducts.map((product) => (
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
                    <span className="text-green-600 font-medium">
                      {Object.keys(product.specifications)[0]}: {Object.values(product.specifications)[0]}
                    </span>
                    <span className="text-green-600 hover:text-green-800 font-medium">
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
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Packing Machine Solutions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our supporting equipment ensures smooth operation and optimal quality throughout your automatic packing machine production process
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-blender text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mixing Solutions</h3>
              <p className="text-gray-600">Advanced mixing technology for consistent quality</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'rgba(200, 164, 21, 0.1)'}}>
                <i className="fas fa-thermometer-half text-2xl" style={{color: '#c8a415'}}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Temperature Control</h3>
              <p className="text-gray-600">Precise temperature management systems</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-cut text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Precision Cutting</h3>
              <p className="text-gray-600">Accurate cutting and shaping equipment</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-layer-group text-orange-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Spreading Systems</h3>
              <p className="text-gray-600">Uniform application and spreading technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Packing Machine Equipment Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized equipment for different stages of your packing machine production process
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'rgba(200, 164, 21, 0.1)'}}>
                <i className="fas fa-flask text-2xl" style={{color: '#c8a415'}}></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Mixing Equipment</h3>
              <p className="text-sm text-gray-600">Cream mixers and batter preparation systems</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-database text-green-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Storage Systems</h3>
              <p className="text-sm text-gray-600">Batter holding tanks and storage solutions</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-paint-roller text-purple-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Spreading Machines</h3>
              <p className="text-sm text-gray-600">Wafer cream spreading and application systems</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-cut text-orange-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Cutting Equipment</h3>
              <p className="text-sm text-gray-600">Precision wafer cutters and shaping tools</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Integration Benefits */}
      <section className="py-16" style={{backgroundColor: 'rgba(200, 164, 21, 0.05)'}}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Seamless Packing Machine Integration</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our supporting equipment is designed to integrate seamlessly with your main packing machine production machinery, 
                creating a complete and efficient automatic packing machine production line.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Compatible Design</h3>
                    <p className="text-gray-600">All equipment designed to work together harmoniously</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Unified Control</h3>
                    <p className="text-gray-600">Centralized control systems for easy operation</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Optimized Workflow</h3>
                    <p className="text-gray-600">Streamlined processes for maximum efficiency</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Need Custom Packing Machine Solutions?</h3>
                <p className="text-gray-600 mb-6">Our engineers can design custom supporting equipment for your packing machine at competitive packing machine price in Pakistan</p>
                <a 
                  href="/contact" 
                  className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Discuss Your Needs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
