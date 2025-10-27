import Header from "@/components/header"
import Footer from "@/components/footer"
import Breadcrumb from "@/components/breadcrumb"
import { COMMON_BREADCRUMBS } from "@/lib/breadcrumb-utils"
import type { Metadata } from "next"
import Link from "next/link"
import Tabs from "@/components/product/Tabs" // Import Tabs component

export const metadata: Metadata = {
  title: "DEW-31 / DEW-45 / DEW-63 Wafer Lines | High-Efficiency Wafer Production by D.E. Technics",
  description:
    "D.E. Technics' DEW-31, DEW-45, and DEW-63 wafer lines offer automated, high-capacity production of flat wafer sandwiches with outputs up to 200 kg/hr, featuring gas-fired ovens, cream spreaders, and optional cooling tunnels.",
  keywords:
    "wafer production line, DEW-31, DEW-45, DEW-63, wafer oven, flat wafer sandwich, bakery machinery, automated wafer line, cream spreader, cooling tunnel, D.E. Technics",
  openGraph: {
    title: "DEW-31 / DEW-45 / DEW-63 Wafer Lines | High-Efficiency Wafer Production by D.E. Technics",
    description:
      "D.E. Technics' DEW-31, DEW-45, and DEW-63 wafer lines offer automated, high-capacity production of flat wafer sandwiches with outputs up to 200 kg/hr, featuring gas-fired ovens, cream spreaders, and optional cooling tunnels.",
    images: [
      {
        url: "/images/product/Waffer-Lines.jpg",
        width: 1200,
        height: 630,
        alt: "DEW-31 / DEW-45 / DEW-63 Wafer Lines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DEW-31 / DEW-45 / DEW-63 Wafer Lines | High-Efficiency Wafer Production by D.E. Technics",
    description:
      "D.E. Technics' DEW-31, DEW-45, and DEW-63 wafer lines offer automated, high-capacity production of flat wafer sandwiches with outputs up to 200 kg/hr, featuring gas-fired ovens, cream spreaders, and optional cooling tunnels.",
    images: ["/images/product/Waffer-Lines.jpg"],
  },
}

const waferLinesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "DEW Wafer Production Lines",
  description: "Complete wafer manufacturing solutions with different capacity configurations",
  itemListElement: [
    {
      "@type": "Product",
      name: "DEW-31 Wafer Line",
      description: "31-plate configuration ideal for small to medium production requirements",
      image: "https://detechnics.com/images/dew-31.jpg",
      brand: { "@type": "Brand", name: "D.E. Technics" },
      category: "Wafer Production Equipment",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Product",
      name: "DEW-45 Wafer Line",
      description: "45-plate system for medium to high production volumes with enhanced automation",
      image: "https://detechnics.com/images/dew-45.jpg",
      brand: { "@type": "Brand", name: "D.E. Technics" },
      category: "Wafer Production Equipment",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Product",
      name: "DEW-63 Wafer Line",
      description: "High-capacity 63-plate configuration for large-scale production",
      image: "https://detechnics.com/images/dew-63.jpg",
      brand: { "@type": "Brand", name: "D.E. Technics" },
      category: "Wafer Production Equipment",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
      },
    },
  ],
}

export default function WaferLinesPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(waferLinesSchema) }} />

      <Header />

      {/* Page Header with bg-banner */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/bg-banner.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Breadcrumb items={COMMON_BREADCRUMBS.waferLines} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Wafer Lines</h1>
          <p className="text-xl text-gray-200">DEW-31 / DEW-45 / DEW-63 Wafer Lines</p>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <img
                  src="/images/product/Waffer-Lines.jpg"
                  alt="DEW-31 / DEW-45 / DEW-63 Wafer Lines"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 mb-4">
                  Wafer
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  DEW-31 / DEW-45 / DEW-63 Wafer Lines
                </h2>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                  <span className="text-gray-600">(4.3 - 87 Reviews)</span>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <strong className="text-gray-900">Availability:</strong> Ready on Order
                </div>
                <div>
                  <strong className="text-gray-900">Tags:</strong> wafer oven, wafer line, DEW-31, DEW-45, DEW-63,
                  bakery machinery, D.E. Technics, high capacity wafer oven, industrial wafer production
                </div>
              </div>

              <p className="text-lg text-gray-700">
                High-efficiency wafer production lines for flat wafer sandwiches – available in 31, 45, and 63-plate
                configurations.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/quote-form?product=DEW-31%20%2F%20DEW-45%20%2F%20DEW-63%20Wafer%20Lines"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold"
                  style={{ backgroundColor: "#c8a415" }}
                >
                  Request a Quote
                </Link>
                <a
                  href="/scripts/pdfs/wafer-lines.pdf"
                  target="_blank"
                  className="border border-gray-300 hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg font-semibold"
                  rel="noreferrer"
                >
                  Download Datasheet
                </a>
                <a
                  href="https://wa.me/923330184756?text=Hello!%20I%20visited%20your%20website%20and%20am%20interested%20in%20your%20Wafer%20Lines"
                  target="_blank"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp mr-2"></i>Share via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tabs */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            tabs={[
              {
                id: "description",
                label: "Description",
                content: (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 md:p-8">
                      <h3 className="text-2xl font-bold mb-6">Product Description</h3>

                      <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
                        <div className="space-y-4">
                          <h4 className="text-xl font-semibold">Overview</h4>
                          <p className="text-gray-700 leading-relaxed">
                            D.E. Technics' wafer lines are engineered to produce high-quality flat wafer sandwiches in
                            an economical and automated manner. The complete line includes a gas-fired oven (available
                            in 31, 45, or 63-plate variants), turbo mixer, sheet conditioner, cream mixer, wafer
                            spreading machine, cooling tunnel (optional), and wafer cutter.
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            The process begins with batter preparation in the turbo mixer, which is transferred to the
                            batter holding tank and then fed into baking plates. After baking, sheets are automatically
                            ejected and passed through a sheet conditioner, followed by uniform cream application and
                            sandwich formation. The finished wafers are either cooled or cut directly.
                          </p>
                        </div>
                        <div className="">
                          <img
                            src="/images/product/Waffer-Lines.jpg"
                            alt="Wafer Lines Process"
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="">
                          <img
                            src="/images/product/Waffer-Lines.jpg"
                            alt="Wafer Lines Features"
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-xl font-semibold">Features</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                              <i className="fas fa-check text-green-500 mt-1 mr-3 flex-shrink-0"></i>
                              Available in 3 scalable plate configurations
                            </li>
                            <li className="flex items-start">
                              <i className="fas fa-check text-green-500 mt-1 mr-3 flex-shrink-0"></i>
                              Uniform heating and high productivity
                            </li>
                            <li className="flex items-start">
                              <i className="fas fa-check text-green-500 mt-1 mr-3 flex-shrink-0"></i>
                              Seamless cream spreading and sandwiching
                            </li>
                            <li className="flex items-start">
                              <i className="fas fa-check text-green-500 mt-1 mr-3 flex-shrink-0"></i>
                              Optional cooling tunnel integration
                            </li>
                            <li className="flex items-start">
                              <i className="fas fa-check text-green-500 mt-1 mr-3 flex-shrink-0"></i>
                              Continuous motion with efficient layout
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                id: "specifications",
                label: "Specifications",
                content: (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 md:p-8">
                      <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Model</th>
                              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">DEW-31</th>
                              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">DEW-45</th>
                              <th className="border border-gray-300 px-4 py-3 text-center font-semibold">DEW-63</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 px-4 py-3 font-medium">No. of Plates</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">31</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">45</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">63</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-3 font-medium">Plate Size</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">350 x 470 mm</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">350 x 470 mm</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">350 x 470 mm</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-4 py-3 font-medium">Output</td>
                              <td
                                className="border border-gray-300 px-4 py-3 text-center font-semibold"
                                style={{ color: "#c8a415" }}
                              >
                                100 kg/hr
                              </td>
                              <td
                                className="border border-gray-300 px-4 py-3 text-center font-semibold"
                                style={{ color: "#c8a415" }}
                              >
                                150 kg/hr
                              </td>
                              <td
                                className="border border-gray-300 px-4 py-3 text-center font-semibold"
                                style={{ color: "#c8a415" }}
                              >
                                200 kg/hr
                              </td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-3 font-medium">
                                Power Required (With Cooling Tower)
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-center">14 kW</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">18 kW</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">20 kW</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-4 py-3 font-medium">
                                Power Required (Without Cooling Tower)
                              </td>
                              <td className="border border-gray-300 px-4 py-3 text-center">7 kW</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">11 kW</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">11 kW</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-3 font-medium">Gas Consumption</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">425 cu ft/hr</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">550 cu ft/hr</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">650 cu ft/hr</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-4 py-3 font-medium">Oven Length</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">9,000 mm</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">11,000 mm</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">18,500 mm</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-3 font-medium">Width</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">1,310 mm</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">1,310 mm</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">1,310 mm</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 px-4 py-3 font-medium">Height (With Chimney)</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">3,500 mm</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">3,850 mm</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">3,000 mm</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 px-4 py-3 font-medium">Height (Without Chimney)</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">1,700 mm</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">1,700 mm</td>
                              <td className="border border-gray-300 px-4 py-3 text-center">1,700 mm</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                id: "applications",
                label: "Applications",
                content: (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 md:p-8">
                      <h3 className="text-2xl font-bold mb-6">Applications</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <i className="fas fa-industry mt-1 mr-3 flex-shrink-0" style={{ color: "#c8a415" }}></i>
                          Industrial wafer sandwich production
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-building mt-1 mr-3 flex-shrink-0" style={{ color: "#c8a415" }}></i>
                          Large-scale bakery operations
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-cog mt-1 mr-3 flex-shrink-0" style={{ color: "#c8a415" }}></i>
                          Automated flat wafer processing
                        </li>
                      </ul>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* DEW Production Lines Summary */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Choose Your Configuration</h2>
            <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              Select the DEW model that best matches your production requirements and facility size.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* DEW-31 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200/60 shadow-sm">
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-2" style={{ color: "#c8a415" }}>
                  DEW-31
                </h3>
                <p className="text-neutral-700 leading-relaxed">Entry Level Production Line</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-neutral-700 leading-relaxed">31 plates wafer baking capacity</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-neutral-700 leading-relaxed">Compact design for smaller facilities</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-neutral-700 leading-relaxed">Easy operation and maintenance</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-neutral-700 leading-relaxed">Cost-effective solution</span>
                </li>
              </ul>
              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center text-white px-6 py-3 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[44px] hover:opacity-90"
                  style={{ backgroundColor: "#c8a415" }}
                >
                  Get Quote
                </Link>
              </div>
            </div>

            {/* DEW-45 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-2 shadow-sm" style={{ borderColor: "#c8a415" }}>
              <div className="text-center mb-6">
                <div
                  className="text-white px-3 py-1.5 rounded-full text-sm font-semibold mb-3 inline-block"
                  style={{ backgroundColor: "#c8a415" }}
                >
                  POPULAR
                </div>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-2" style={{ color: "#c8a415" }}>
                  DEW-45
                </h3>
                <p className="text-neutral-700 leading-relaxed">Standard Production Line</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-neutral-700 leading-relaxed">45 plates wafer baking capacity</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-neutral-700 leading-relaxed">Balanced production and efficiency</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-neutral-700 leading-relaxed">Suitable for medium-scale operations</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-neutral-700 leading-relaxed">Proven reliability and performance</span>
                </li>
              </ul>
              <div className="text-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ backgroundColor: "#c8a415" }}
                >
                  Get Quote
                </a>
              </div>
            </div>

            {/* DEW-63 */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200/60 shadow-sm">
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-2" style={{ color: "#c8a415" }}>
                  DEW-63
                </h3>
                <p className="text-neutral-700 leading-relaxed">High-Capacity Production Line</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-neutral-700 leading-relaxed">63 plates wafer baking capacity</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-neutral-700 leading-relaxed">
                    High-capacity production for large-scale operations
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-neutral-700 leading-relaxed">Advanced automation and control features</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-600 mt-1 mr-3"></i>
                  <span className="text-neutral-700 leading-relaxed">Maximum efficiency and throughput</span>
                </li>
              </ul>
              <div className="text-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ backgroundColor: "#c8a415" }}
                >
                  Get Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Equipment */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Supporting Equipment</h2>
            <p className="text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto">
              Complete your wafer production setup with our range of supporting equipment and accessories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Wafer Spreading Machine */}
            <div className="text-center p-6 bg-gray-50 rounded-2xl border border-neutral-200/60">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "rgba(200, 164, 21, 0.1)" }}
              >
                <i className="fas fa-cog text-2xl" style={{ color: "#c8a415" }}></i>
              </div>
              <h3 className="text-lg font-semibold tracking-tight mb-2">Wafer Spreading Machine</h3>
              <p className="text-neutral-700 leading-relaxed text-sm">
                Automatic cream spreading for consistent wafer sandwiches
              </p>
            </div>

            {/* Cream Mixer */}
            <div className="text-center p-6 bg-gray-50 rounded-2xl border border-neutral-200/60">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-mix text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold tracking-tight mb-2">Cream Mixer</h3>
              <p className="text-neutral-700 leading-relaxed text-sm">
                Uniform cream preparation for consistent wafer filling quality and texture
              </p>
            </div>

            {/* Batter Holding Tank */}
            <div className="text-center p-6 bg-gray-50 rounded-2xl border border-neutral-200/60">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-tint text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold tracking-tight mb-2">Batter Holding Tank</h3>
              <p className="text-neutral-700 leading-relaxed text-sm">
                Consistent wafer batter storage and distribution for continuous production
              </p>
            </div>

            {/* Wafer Cutter */}
            <div className="text-center p-6 bg-gray-50 rounded-2xl border border-neutral-200/60">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-cut text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold tracking-tight mb-2">Wafer Cutter</h3>
              <p className="text-neutral-700 leading-relaxed text-sm">
                Precision cutting for uniform wafer sizes and shapes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action with bg-banner */}
      <section className="relative py-16 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/bg-banner.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Wafer Production?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our experts to discuss the right wafer production line configuration for your business needs and
            production goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] font-semibold"
              style={{ color: "#c8a415" }}
            >
              Get Quote
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-800 transition-colors min-h-[44px] font-semibold"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
