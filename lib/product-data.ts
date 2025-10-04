export interface ProductData {
  slug: string
  name: string
  category: string
  description: string
  features: string[]
  specifications: {
    [key: string]: string
  }
  images: string[]
  brochure?: string
  availability?: string
  tags?: string[]
  rating?: number
  reviews?: number
  faqs?: { question: string; answer: string }[]
  price?: string
  applications: string[]
  relatedProducts: string[]
}

export const productData: ProductData[] = [
  {
    slug: "de-210",
    name: "DE-210 Horizontal Form Fill Seal Machine",
    category: "HFFS Machines",
    description: "DE-210 HFFS pillow pack machine wraps large bakery items and soap bars at up to 150 packs/min with photo-electric film registration.",
    features: [
      "Handles bulkier items with precision",
      "Compatible with most heat-seal films",
      "Smooth and accurate film registration",
      "Mobile design for flexible production layouts",
      "Fast throughput of up to 150 packs/min"
    ],
    specifications: {
      "Size of Pack (L x W x H)": "100–300 x 40–80 x 25–75 mm",
      "Output": "Up to 150 packs per minute",
      "Electric Motors": "(1) 1 H.P. | (2) ½ H.P.",
      "Heaters": "2.2 kW",
      "Standard Equipment": "Photo Electric Eye & Inverter",
      "Dimensions of Machine": "4,130 x 1,050 x 1,600 mm",
      "Weight": "650 kg",
      "Reel (Max OD / Core)": "300 / 75 mm"
    },
    images: [
      "/images/product/DE-210.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de210.pdf",
    availability: "Ready on Order",
    tags: [
      "DE-210",
      "pillow pack",
      "large item wrapping",
      "tray packaging",
      "soap bar packaging",
      "heat-seal film"
    ],
    rating: 4.1,
    reviews: 41,
    applications: [
      "Bakery products in trays (buns, rusks, cookies)",
      "Washing and toilet soap bars",
      "General large-size pillow wrapping"
    ],
    relatedProducts: ["de-2000cw", "de-300", "de-2050ss"]
  },
  {
    slug: "de-2000cw",
    name: "DE-2000CW Cut & Wrap Machine",
    category: "HFFS Machines",
    description: "High-speed cut and wrap solution for gums, toffees, and chewy candies, capable of delivering up to 250 packs per minute with precise size handling.",
    features: [
      "Cut & wrap design for chewy confectionery",
      "Handles varied sizes within the pack range",
      "Output up to 250 packs per minute",
      "Optional stainless steel build for hygiene-sensitive operations",
      "Integrated photo-electric sensor system"
    ],
    specifications: {
      "Size of Pack": "80–200 x Ø15 x 10–22 x 35 mm",
      "Output": "Up to 250 packs per minute",
      "Electric Motors": "(1) 2 H.P. | (2) ½ H.P.",
      "Heaters": "2.6 kW",
      "Standard Equipment": "Photo Electric Eye & Inverter",
      "Dimensions of Machine": "4,590 x 1,820 x 1,000 mm",
      "Weight": "1,050 kg",
      "Reel (Max Outer Dia / Core Dia)": "300 / 75 mm",
      "Date Coder": "Optional",
      "Stainless Steel Version": "Optional (Conveyor & Doors only)"
    },
    images: [
      "/images/product/DE-2000CW.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de2000cw.pdf",
    availability: "Built to Order (custom request only)",
    tags: [
      "DE-2000CW",
      "cut and wrap",
      "chewy candy packer",
      "confectionery wrapper",
      "high-speed"
    ],
    rating: 3.5,
    reviews: 19,
    applications: ["Gums", "Toffees", "Chewy candies"],
    faqs: [
      { question: "What products is the DE-2000CW designed for?", answer: "The DE-2000CW is specifically designed for wrapping gums, toffees, and chewy candies with precise cut and wrap functionality." },
      { question: "What is the maximum speed of the DE-2000CW?", answer: "The machine can achieve speeds of up to 250 packs per minute, making it ideal for high-volume candy production." },
      { question: "What are the key features of this machine?", answer: "Key features include photo-electric precision sealing, optional stainless-steel conveyors, and specialized cut & wrap technology for confectionery products." },
      { question: "What packaging materials can it handle?", answer: "The machine works with various heat-sealable films suitable for candy packaging, including twist-wrap and flow-wrap materials." },
      { question: "Is the DE-2000CW suitable for food-grade applications?", answer: "Yes, the machine features food-grade construction with optional stainless-steel components to meet hygiene standards for confectionery production." }
    ],
    relatedProducts: ["de-210", "de-2000", "de-4050"]
  },
  {
    slug: "de-4050",
    name: "DE-4050 On-Edge Biscuit Wrapping Machine",
    category: "Biscuit Wrapping",
    description: "High-speed on-edge biscuit wrapping machine with magazine feeding and synchronized pushers for efficient and precise packaging.",
    features: [
      "High-speed dual-magazine feeding system",
      "Precision biscuit alignment with synchronized pushers",
      "Supports round and rectangular biscuit stacks",
      "Efficient sealing via double-head jaws",
      "Engineered for high-output packaging environments"
    ],
    specifications: {
      "Size of Pack (Rectangular)": "85–185 x 25–65 x 35–70 mm",
      "Size of Pack (Round)": "85–185 x 35–65 mm",
      "Output": "Up to 120 packs per minute",
      "Electric Motors (Main / Control)": "(1) 2 H.P. | (2) ½ H.P.",
      "Electrical Heaters (Fin & End Seal)": "4 x 300 W / 2,500 W",
      "Standard Equipment": "Photo Electric Eye & Inverter",
      "Dimensions of Machine": "4,570 x 1,790 x 1,150 mm",
      "Weight": "900 kg",
      "Reel (Max Outer Dia / Core Dia)": "420 / 75 mm"
    },
    images: [
      "/images/product/DE-4050.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de4050.pdf",
    availability: "Built to Order (custom request only)",
    tags: [
      "DE-4050",
      "on-edge wrapper",
      "magazine feed",
      "biscuit edge wrapping",
      "high-speed biscuit line"
    ],
    rating: 4.6,
    reviews: 89,
    applications: [
      "On-edge rectangular biscuit packaging",
      "On-edge round biscuit stack wrapping"
    ],
    faqs: [
      { question: "What makes the DE-4050 unique among on-edge biscuit wrappers?", answer: "It uses dual magazines and synchronized pushers to feed pre-determined biscuit stacks into the in-feed chain, combined with improved jaw mechanics and dual-head sealing for precise, high-speed wrapping." },
      { question: "Which biscuit shapes can it wrap?", answer: "It supports both round and rectangular biscuit stacks." },
      { question: "What is its production rate?", answer: "The DE-4050 can wrap up to 120 packs per minute." },
      { question: "How does it align biscuits accurately?", answer: "Dual magazines feed biscuit stacks via carrier lugs, and synchronized pushers ensure consistent product spacing." },
      { question: "What are the pack size ranges?", answer: "Rectangular packs: 85–185 mm long, 25–65 mm wide and 35–70 mm high; round packs: 85–185 mm long and 35–65 mm high." }
    ],
    relatedProducts: ["de-300", "de-210", "de-2000cw"]
  },
  {
    slug: "de-2050ss",
    name: "DE-2050SS Horizontal Form Fill Seal Machine",
    category: "HFFS Machines",
    description: "High-speed wrapping machine for biscuits and similar items, capable of handling single to four-pile packs with precision and consistency.",
    features: [
      "Online version of DE-2000SS for improved integration",
      "Supports multiple pack formats",
      "High-speed output up to 250 packs/min",
      "Robust electric system with inverter control",
      "Popular among premium packaging operations"
    ],
    specifications: {
      "Size of Pack": "00–250 x 40–80 x 10–50 mm",
      "Output": "Up to 250 single-pile packs per minute (Max)",
      "Electric Motors": "(1) 1.5 H.P. 3-Phase | (2) ½ H.P.",
      "Heaters": "4 kW",
      "Standard Equipment": "Photo-electric Eye & Inverter",
      "Dimensions of Machine": "5,700 x 2,080 x 1,000 mm",
      "Weight": "~1,000 kg",
      "Reel (Max OD / Core)": "300 / 75 mm"
    },
    images: [
      "/images/product/DE-2050SS.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de2050ss.pdf",
    availability: "Built to Order (custom request only)",
    tags: [
      "biscuit wrapping machine",
      "HFFS machine",
      "DE-2050SS",
      "bakery packaging",
      "inline flow wrap",
      "high-speed packaging",
      "soap bar packer"
    ],
    rating: 4.9,
    reviews: 113,
    applications: [
      "Biscuits (Single, Double, Triple, Four-Pile)",
      "Soap bars",
      "Bakery items"
    ],
    faqs: [
      { question: "What products and pack formats can the DE-2050SS handle?", answer: "It wraps single, double, triple and four-pile biscuit stacks and is also suitable for soap bars and bakery items." },
      { question: "How fast is the DE-2050SS?", answer: "The machine outputs up to 250 packs per minute." },
      { question: "What differentiates it from the DE-2000SS?", answer: "The DE-2050SS is an online version of the DE-2000SS, offering improved integration for high-speed packaging lines." },
      { question: "How does the machine ensure consistent wrapping quality?", answer: "A robust electric system with inverter control, durable construction and smart automation features minimise waste and maintain consistent pack quality." },
      { question: "What are the key technical specifications?", answer: "It handles pack sizes up to 100–250 mm long, 40–80 mm wide and 10–50 mm high; includes 1.5 H.P. and ½ H.P. motors; heaters rated at 4 kW." }
    ],
    relatedProducts: ["de-210", "de-2000", "de-2000cw"]
  },
  {
    slug: "de-2000",
    name: "DE-2000 Horizontal Form Fill Seal Machine",
    category: "HFFS Machines",
    description: "Versatile horizontal wrapper suitable for varied pack sizes and shapes with easy size changeover for efficient production lines.",
    features: [
      "Quick size changeover with universal wrapping box",
      "Suitable for diverse pack shapes and sizes",
      "High-speed output up to 200 packs per minute",
      "Compact and adaptable for various production lines",
      "Photo-electric eye ensures precision in sealing"
    ],
    specifications: {
      "Size of Pack": "100–300 x 40–80 x 10–50 mm",
      "Output": "Up to 200 packs per minute",
      "Electric Motors": "(1) 2 H.P. | (2) ½ H.P.",
      "Heaters": "4.2 kW",
      "Standard Equipment": "Photo Electric Eye & Inverter",
      "Dimensions of Machine": "6,400 x 920 x 1,600 mm",
      "Weight": "600 kg",
      "Reel (Max Outer Dia / Core Dia)": "300 / 75 mm"
    },
    images: [
      "/images/product/de-2000.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de2000.pdf",
    availability: "Built to Order (custom request only)",
    tags: [
      "horizontal form fill machine",
      "DE-2000",
      "biscuit packaging",
      "chocolate bar wrapping",
      "quick changeover"
    ],
    rating: 4.7,
    reviews: 129,
    applications: ["Biscuits", "Chocolate bars", "Bakery items"],
    faqs: [
      { question: "What pack sizes and shapes can the DE-2000 handle?", answer: "It accommodates packs from 100–300 mm long, 40–80 mm wide and 10–50 mm high, making it suitable for varied shapes and sizes." },
      { question: "How quickly does the DE-2000 operate?", answer: "The machine delivers up to 200 packs per minute." },
      { question: "What makes the DE-2000 suitable for varied production lines?", answer: "Its universal wrapping box and cut-length control enable quick size changeovers without major downtime, allowing manufacturers to handle biscuits, chocolate bars and bakery items." },
      { question: "Which products is this machine ideal for?", answer: "It is designed for packaging biscuits, chocolate bars and other bakery items." },
      { question: "What precision features are included?", answer: "A photo-electric eye ensures precise sealing and print alignment." }
    ],
    relatedProducts: ["de-2000cw", "de-2050ss", "de-210"]
  },
  {
    slug: "de-300",
    name: "DE-300 On-Edge Biscuit Wrapping Machine",
    category: "Biscuit Wrapping",
    description: "Efficient on-edge biscuit wrapping machine ideal for various biscuit shapes with easy adjustment and setup using L-Type conveyor feeding.",
    features: [
      "Supports a variety of biscuit shapes",
      "High-efficiency L-Type feeding system",
      "Simplified product changeover",
      "Compact structure with strong build",
      "Up to 80 packs per minute performance"
    ],
    specifications: {
      "Size of Pack (Rectangular)": "85–185 x 25–65 x 35–70 mm",
      "Size of Pack (Round)": "85–185 x 35–65 mm",
      "Output": "Up to 80 packs per minute",
      "Electric Motors (Main / Control)": "(1) 2 H.P. | (2) ½ H.P.",
      "Electrical Heaters (Fin & End Seal)": "2 x 300 W / 2,500 W",
      "Standard Equipment": "Photo Electric Eye & Inverter",
      "Dimensions of Machine": "4,120 x 1,770 x 1,060 mm",
      "Weight": "900 kg",
      "Reel (Max Outer Dia / Core Dia)": "420 / 75 mm"
    },
    images: [
      "/images/product/DE-300.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de300.pdf",
    availability: "Built to Order (custom request only)",
    tags: [
      "DE-300",
      "on-edge wrapper",
      "L-type conveyor",
      "biscuit packaging"
    ],
    rating: 3.6,
    reviews: 49,
    applications: [
      "Edge-wrapping of rectangular, round, or oval biscuits",
      "Bakery item packaging (standing orientation)"
    ],
    faqs: [
      { question: "What biscuit shapes can the DE-300 wrap?", answer: "It wraps biscuits on edge in round, square, rectangular and oval shapes." },
      { question: "How does the feeding system work?", answer: "An L-Type conveyor feeding system spaces and positions products consistently for automated lines." },
      { question: "What is the production capacity?", answer: "The DE-300 can produce up to 80 packs per minute." },
      { question: "Which features aid easy changeover?", answer: "Its L-Type feed system and simplified product changeover design allow operators to switch between biscuit types quickly." },
      { question: "What are the typical pack sizes?", answer: "Rectangular packs measure 85–185 mm long, 25–65 mm wide and 35–70 mm high; round packs are 85–185 mm long and 35–65 mm high." }
    ],
    relatedProducts: ["de-4050", "de-210", "wafer-spreading-machine"]
  },
  {
    slug: "wafer-lines",
    name: "DEW-31 / DEW-45 / DEW-63 Wafer Lines",
    category: "Wafer Equipment",
    description: "Automated, high-capacity production of flat wafer sandwiches. Available in 31, 45, and 63-plate configurations with uniform heating and efficient cream spreading, cooling and cutting integration.",
    features: [
      "31 / 45 / 63 plate configurations",
      "Uniform heating and high productivity",
      "Seamless cream spreading and sandwiching",
      "Optional cooling tunnel integration",
      "Continuous motion with efficient layout"
    ],
    specifications: {
      "No. of Plates": "31 / 45 / 63",
      "Plate Size": "350 x 470 mm",
      "Output": "100–200 kg/hr (model dependent)",
      "Power Required (With Cooling Tower)": "14 kW",
      "Power Required (Without Cooling Tower)": "7 kW",
      "Gas Consumption": "425–650 cu ft/hr (model dependent)",
      "Oven Length": "9,000–18,500 mm",
      "Width": "1,310 mm",
      "Height (With Chimney)": "3,000–3,850 mm",
      "Height (Without Chimney)": "1,700 mm"
    },
    images: [
      "/images/product/Waffer-Lines.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de3145636.pdf",
    availability: "Ready on Order",
    tags: ["wafer production line", "DEW-31", "wafer oven", "bakery machinery"],
    rating: 4.6,
    reviews: 41,
    applications: [
      "Industrial wafer sandwich production",
      "Large-scale bakery operations",
      "Automated flat wafer processing"
    ],
    faqs: [
      { question: "What are the different wafer line models available?", answer: "D.E. Technics offers DEW-31, DEW-45, and DEW-63 wafer production lines with 31, 45, and 63-plate configurations respectively." },
      { question: "What is the production capacity of these wafer lines?", answer: "The wafer lines can produce up to 200 kg/hr of flat wafer sandwiches, depending on the model and configuration." },
      { question: "What components are included in a complete wafer line?", answer: "A complete line includes gas-fired wafer ovens, cream spreaders, cooling tunnels, wafer cutters, and optional batter holding tanks and mixers." },
      { question: "What type of products can be made with these lines?", answer: "The lines are designed for producing flat wafer sandwiches with various cream fillings and can accommodate different wafer thicknesses and sizes." },
      { question: "Do you provide installation and training for wafer lines?", answer: "Yes, D.E. Technics provides complete installation, commissioning, operator training, and ongoing technical support for all wafer production lines." }
    ],
    relatedProducts: ["wafer-spreading-machine", "cream-mixer", "batter-holding-tank"]
  },
  {
    slug: "wafer-spreading-machine",
    name: "2A Wafer Spreading Machine",
    category: "Wafer Equipment",
    description: "Precision wafer cream spreading machine for sandwich formation in automated wafer lines.",
    features: [
      "Even cream spreading via precision rollers",
      "Sturdy and hygienic design",
      "Integrated control panel",
      "Easy to clean and maintain",
      "Compatible with DEW-31, DEW-45, DEW-63 wafer lines"
    ],
    specifications: {
      "Length": "2750 mm",
      "Height": "1440 mm"
    },
    images: [
      "/images/product/Waffer-Spreading-Machine.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de3145636_2A.pdf",
    availability: "Ready on Order",
    tags: ["wafer spreading machine", "2A", "cream layer applicator", "wafer sandwich machine", "bakery machinery"],
    rating: 4.3,
    reviews: 91,
    faqs: [
      { question: "What is the purpose of the 2A Wafer Spreading Machine?", answer: "It ensures uniform and efficient application of cream to wafer sheets for sandwich formation." },
      { question: "How is the cream applied to the wafers?", answer: "Sheets pass between stainless steel rollers that evenly apply the cream layer." },
      { question: "Which wafer lines is this machine compatible with?", answer: "It integrates with DEW-31, DEW-45 and DEW-63 wafer lines." },
      { question: "What features support hygiene and durability?", answer: "Its robust stainless steel construction and easy-clean design ensure hygienic processing and long life." },
      { question: "Where is this machine used?", answer: "In wafer sandwich production, confectionery processing lines and commercial bakeries." }
    ],
    applications: [
      "Wafer sandwich production",
      "Confectionery processing lines",
      "Commercial bakeries"
    ],
    relatedProducts: ["cream-mixer", "wafer-cutter", "wafer-lines"]
  },
  {
    slug: "cream-mixer",
    name: "Cream Mixer",
    category: "Wafer Equipment",
    description: "Efficient mixer designed for preparing cream fillings used in wafer sandwich production, ensuring smooth and uniform consistency.",
    features: [
      "Uniform and high-speed cream mixing",
      "Durable stainless steel structure",
      "Compact design for optimized space",
      "Easy to clean and maintain",
      "Integrated with D.E. Technics wafer lines"
    ],
    specifications: {
      "Width": "1300 mm",
      "Height": "1400 mm"
    },
    images: [
      "/images/product/Mixer-Machine.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de3145636_6.pdf",
    availability: "Compatible with DEW Wafer Lines (31, 45, 63 plates)",
    tags: ["cream mixer", "wafer filling", "food mixer", "confectionery equipment", "bakery processing"],
    rating: 4.3,
    reviews: 118,
    applications: [
      "Wafer cream filling preparation",
      "Confectionery and bakery lines",
      "Food processing automation"
    ],
    faqs: [
      { question: "What is the primary use of the Cream Mixer?", answer: "It produces consistent, homogenous cream fillings for wafer sandwiches." },
      { question: "How does it ensure quality mixing?", answer: "A robust design and powerful mixing action ensure even ingredient distribution, resulting in high-quality cream texture." },
      { question: "What features aid operation and cleaning?", answer: "The mixer is easy to operate and maintain, and its stainless steel structure allows for efficient cleaning." },
      { question: "How is it integrated into wafer production?", answer: "It is designed to work seamlessly with D.E. Technics wafer lines and is compatible with DEW-31, DEW-45 and DEW-63 lines." },
      { question: "Where is the cream mixer used?", answer: "It is used for wafer cream filling preparation, confectionery and bakery lines and general food processing automation." }
    ],
    relatedProducts: ["wafer-spreading-machine", "batter-holding-tank", "wafer-lines"]
  },
  {
    slug: "batter-holding-tank",
    name: "Batter Holding Tank",
    category: "Supporting Equipment",
    description: "Stainless steel tank for holding wafer batter before it is transferred to the baking plates, ensuring smooth, uninterrupted production.",
    features: [
      "Robust stainless steel build",
      "Compact footprint",
      "Facilitates continuous batter feed",
      "Easy to clean and maintain",
      "Integrated with D.E. Technics' wafer line systems"
    ],
    specifications: {
      "Width": "700 mm",
      "Height": "1200 mm"
    },
    images: [
      "/images/product/Holding-Tank.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de3145636_4.pdf",
    availability: "Compatible with DEW Wafer Lines (31, 45, 63 plates)",
    tags: ["batter tank", "wafer production", "food processing", "bakery equipment", "storage tank"],
    rating: 4.3,
    reviews: 198,
    applications: [
      "Wafer sheet production",
      "Food processing lines",
      "Industrial bakery automation"
    ],
    faqs: [
      { question: "What is the role of the batter holding tank?", answer: "It stores and maintains a consistent supply of batter between the turbo mixer and the baking section of wafer production lines." },
      { question: "How does it improve efficiency?", answer: "By providing a controlled batter feed to baking plates, it reduces downtime and ensures smooth, uninterrupted production." },
      { question: "What material is the tank made from?", answer: "The tank is built from food-grade stainless steel and has an easy-clean design, with optional level control integration." },
      { question: "Which features support continuous batter feeding?", answer: "Its robust stainless steel build, compact footprint and integration with D.E. Technics wafer lines facilitate continuous batter feed and easy maintenance." },
      { question: "Where is this tank placed in the production line?", answer: "It is positioned between the turbo mixer and the baking section." }
    ],
    relatedProducts: ["cream-mixer", "wafer-lines", "wafer-cutter"]
  },
  {
    slug: "wafer-cutter",
    name: "Wafer Cutter",
    category: "Wafer Equipment",
    description: "Precision cutting machine for wafer sheets, designed to deliver consistent, clean cuts for sandwich formation or packaging.",
    features: [
      "Consistent cutting accuracy",
      "Compact design to save floor space",
      "Easy access and maintenance",
      "Hygienic stainless steel build",
      "Integrated in D.E. Technics’ wafer lines"
    ],
    specifications: {
      "Length": "2000 mm",
      "Height": "1100 mm"
    },
    images: [
      "/images/product/Waffer-Cutter.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de3145636_3.pdf",
    availability: "Compatible with DEW Wafer Lines (31, 45, 63 plates)",
    tags: ["wafer cutter", "sheet cutting machine", "confectionery equipment", "food processing", "wafer production"],
    rating: 4.3,
    reviews: 126,
    applications: [
      "Wafer sandwich production",
      "Industrial confectionery lines",
      "Sheet-based bakery automation"
    ],
    faqs: [
      { question: "What role does the wafer cutter play in the production line?", answer: "It performs the final stage of wafer production by cutting multilayered wafer sheets into uniform bars for sandwich formation or packaging." },
      { question: "How does its construction support food processing hygiene?", answer: "The cutter is built from robust stainless steel, offering easy cleaning and reliable performance." },
      { question: "What features ensure consistent cuts?", answer: "It delivers consistent cutting accuracy, has a compact footprint and offers easy access for maintenance." },
      { question: "What are the typical dimensions of this machine?", answer: "The cutter's length is approximately 2000 mm and its height is 1100 mm." },
      { question: "Where is the wafer cutter used?", answer: "In wafer sandwich production, industrial confectionery lines and sheet-based bakery automation." }
    ],
    relatedProducts: ["wafer-spreading-machine", "batter-holding-tank", "wafer-lines"]
  },
  {
    slug: "de-200",
    name: "DE-200 HFFS Machine",
    category: "HFFS Machines",
    description: "Horizontal form-fill-seal machine for general packaging applications. Reliable performance for food and consumer goods.",
    features: [
      "Reliable servo drive",
      "Touchscreen HMI",
      "Quick changeover",
      "Consistent sealing quality",
    ],
    specifications: {
      "Size of Pack (L x W x H)": "80–200 x 40–80 x 10–30 mm",
      "Output": "Up to 200 packs per minute",
      "Electric Motors": "(1) 1 H.P. | (2) ½ H.P.",
      "Heaters": "1.6 kW",
      "Standard Equipment": "Photo Electric Eye & Inverter",
      "Dimensions of Machine": "3,990 x 900 x 1,650 mm",
      "Weight": "800 kg",
      "Reel (Max OD / Core)": "300 / 75 mm",
    },
    images: [
      "/images/product/DE-200-HFFS.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de200.pdf",
    availability: "Ready on Order",
    tags: ["HFFS", "photo-electric eye", "inverter"],
    rating: 4.0,
    reviews: 29,
    faqs: [
      { question: "What types of products can the DE-200 wrap?", answer: "Medium-sized items such as biscuits, chocolate bars, toffee bars, ice lollies, soap and similar products." },
      { question: "How many packs per minute?", answer: "Up to 200 packs per minute." }
    ],
    applications: [
      "Pillow wrapping of biscuits, soap, candy bars, ice lollies, etc.",
      "Suitable for FMCG industries with mid-sized product lines"
    ],
    relatedProducts: ["de-210", "de-2000", "de-2050ss"]
  },
  {
    slug: "de-202",
    name: "DE-202 HFFS Machine",
    category: "HFFS Machines",
    description: "Custom-built pillow pack machine designed for wrapping spring rolls of steel wool and medium-sized items in pillow-type packaging.",
    features: [
      "Compact footprint",
      "Film tension control",
      "Energy efficient",
      "Hygienic design",
    ],
    specifications: {
      "Size of Pack (L x W x H)": "80–200 x 40–80 x 10–30 mm",
      "Output": "Up to 200 packs per minute",
      "Electric Motors": "(1) 1 H.P. | (2) ½ H.P.",
      "Heaters": "1.6 kW",
      "Standard Equipment": "Photo Electric Eye & Inverter",
      "Dimensions of Machine": "4,000 x 800 x 1,650 mm",
      "Weight": "750 kg",
      "Reel (Max OD / Core)": "300 / 75 mm",
    },
    images: [
      "/images/product/DE-202.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de202.pdf",
    availability: "Ready on Order",
    tags: ["compact", "film control", "energy efficient"],
    rating: 4.2,
    reviews: 63,
    applications: [
      "Spring rolls of steel wool",
      "Biscuits, toffee bars, chocolate bars",
      "Ice lollies, soaps, combs",
      "Pillow-type medium-size packaging"
    ],
    faqs: [
      { question: "What is the DE-202 used for?", answer: "It wraps spring rolls of steel wool and medium‑sized products like biscuits, toffee bars, chocolate bars, ice lollies, soap and combs." },
      { question: "How fast is the DE-202?", answer: "The machine can wrap up to 200 packs per minute." },
      { question: "What makes the DE-202 unique?", answer: "It's a custom‑engineered continuous‑motion wrapper with a photo‑electric eye for accurate print alignment and is easy to operate and maintain." },
      { question: "What pack sizes can it handle?", answer: "Pack dimensions range from 80–200 mm long, 40–80 mm wide and 10–30 mm high." },
      { question: "What applications is it suitable for?", answer: "Ideal for spring rolls of steel wool, biscuits, toffee and chocolate bars, ice lollies, soaps and combs." }
    ],
    relatedProducts: ["de-210", "de-200", "de-2000cw"]
  },
  {
    slug: "de-310",
    name: "DE-310 On-Edge Biscuit Wrapper",
    category: "Biscuit Wrapping",
    description: "On-edge biscuit wrapping machine designed for small to medium production with excellent wrapping quality and efficiency.",
    features: [
      "On-edge feeding system",
      "Accurate registration",
      "High-speed operation",
      "Low film waste",
    ],
    specifications: {
      "Size of Pack (Rectangular)": "85–185 x 25–65 x 35–70 mm",
      "Size of Pack (Round)": "85–185 x 35–65 mm",
      "Output": "Up to 100 packs per minute",
      "Electric Motors (Main / Control)": "(1) 2 H.P. | (2) ½ H.P.",
      "Electrical Heaters (Fin & End Seal)": "2 x 300 W / 2,500 W",
      "Standard Equipment": "Photo Electric Eye & Inverter",
      "Dimensions of Machine": "4,260 x 1,770 x 1,025 mm",
      "Weight": "750 kg",
      "Reel (Max OD / Core)": "420 / 75 mm",
    },
    images: [
      "/images/product/DE-310.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de310.pdf",
    availability: "Ready on Order",
    tags: ["on-edge", "biscuit", "accuracy"],
    rating: 4.0,
    reviews: 47,
    applications: [
      "Wrapping of biscuits on-edge in round, rectangular, or oval shapes",
      "Ideal for setups with limited floor space"
    ],
    faqs: [
      { question: "What distinguishes the DE-310 from the DE-300?", answer: "The DE-310 is a space-efficient, straight-conveyor variant tailored for facilities with limited floor space." },
      { question: "Which biscuit shapes can it wrap?", answer: "It handles biscuits on edge in both round and rectangular shapes." },
      { question: "What is its operating speed?", answer: "The DE-310 operates at speeds up to 100 packs per minute." },
      { question: "How does the machine ensure precise wrapping?", answer: "It integrates a photo-electric eye and inverter system and uses reliable sealing with high-end heaters." },
      { question: "What pack sizes can it accommodate?", answer: "Rectangular packs: 85–185 mm long, 25–65 mm wide and 35–70 mm high; round packs: 85–185 mm long and 35–65 mm high." }
    ],
    relatedProducts: ["de-4050", "de-300", "de-210"]
  },
  {
    slug: "de-800-super-wrap",
    name: "DE-800 Super Wrap Candy Machine",
    category: "HFFS Machines",
    description: "High-speed pillow pack wrapping machine for filled and unfilled candies, offering superior seal quality and transfer control.",
    features: [
      "Speeds up to 800 packs per minute",
      "Reliable fin-seal and end-seal technology",
      "Handles both filled and unfilled candy types",
      "Integrated feed disc and brush for smooth transfer",
      "Built for high-output, continuous operation"
    ],
    specifications: {
      "Output": "Up to 800 packs per minute",
      "Electric Motors": "(1) 2 H.P. / 3 Phase | (2) ½ H.P.",
      "Electric Heaters": "3.2 kW",
      "Standard Equipment": "Photo Electric Eye & Inverter",
      "Dimensions of Machine": "2,335 x 900 x 1,175 mm",
      "Weight": "750 kg",
      "Reel (Max OD / Core)": "250 / 70 mm",
    },
    images: [
      "/images/product/DE-800.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de800.pdf",
    availability: "Built to Order (custom request only)",
    tags: [
      "DE-800",
      "super wrap",
      "candy pillow packer",
      "confectionery wrapper",
      "high-speed"
    ],
    rating: 4.3,
    reviews: 93,
    applications: [
      "Filled candies",
      "Unfilled candies",
      "Bubble gum balls",
      "Similar confectionery products"
    ],
    faqs: [
      { question: "Which confectionery products can the DE-800 wrap?", answer: "It wraps both filled and unfilled candies, including bubble gum balls and other similar confectionery items." },
      { question: "What is the maximum speed of the machine?", answer: "The DE-800 can wrap up to 800 packs per minute." },
      { question: "How does it ensure a high-quality seal?", answer: "The machine uses high-quality fin-seal and end-seal mechanisms to deliver consistent, airtight wrapping that prolongs shelf life." },
      { question: "What system ensures smooth product transfer?", answer: "A large feed disc and brush system guarantees smooth, accurate transfer of candies onto the carrier chain, facilitating high-output production." },
      { question: "Is the machine suited for continuous operation?", answer: "Yes, it's built for high-output, continuous operation in candy production environments." }
    ],
    relatedProducts: ["de-2000cw", "de-2000", "de-2050ss"]
  },
  {
    slug: "de-br-batch-roller",
    name: "DE-BR Batch Roller",
    category: "Supporting Equipment",
    description: "Batch roller for forming continuous candy rope from batch masses with uniform diameter and heat-controlled precision.",
    features: [
      "Converts candy batches into uniform ropes",
      "Adjustable rope diameter from 40 to 70 mm",
      "Dual heater system for consistent temperature",
      "Heavy-duty build for batch handling",
      "Integrates seamlessly into full candy lines"
    ],
    specifications: {
      "Capacity": "65 kg",
      "Rope Diameter": "40–70 mm",
      "Heater": "2 x 400–800 Watt",
      "Weight": "350 kg",
      "Electric Motor": "1 H.P. / 3 Phase"
    },
    images: [
      "/images/product/DE-BR.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/debr.pdf",
    availability: "Built to Order (custom request only)",
    tags: ["batch roller", "candy rope former", "confectionery forming", "heated roller"],
    rating: 4.3,
    reviews: 91,
    applications: [
      "Candy rope formation",
      "Sugar-based mass rolling",
      "Pre-extrusion candy processing"
    ],
    faqs: [
      { question: "What is the function of the DE-BR Batch Roller?", answer: "It transforms candy batch masses into continuous ropes of uniform diameter for further processing or cutting." },
      { question: "What capacity and rope sizes can it handle?", answer: "It handles up to 65 kg of candy mass and produces ropes with diameters ranging from 40 to 70 mm." },
      { question: "How does it control temperature?", answer: "A dual heater system (2 × 400–800 W) provides precise temperature control for the candy mass." },
      { question: "What features make it durable and reliable?", answer: "Its heavy-duty construction and uniform rolling mechanism support continuous candy production and seamless integration into candy lines." },
      { question: "Where is the batch roller used?", answer: "In candy rope formation, sugar-based mass rolling and pre-extrusion candy processing." }
    ],
    relatedProducts: ["de-rs-rope-sizer", "de-ow-overwrapper", "de-300"]
  },
  {
    slug: "de-ow-overwrapper",
    name: "DE-OW Overwrapper",
    category: "Supporting Equipment",
    description: "Automatic overwrapper designed to wrap display boxes of various sizes efficiently and neatly.",
    features: [
      "Adjustable for a range of box sizes",
      "High-quality overwrap finish",
      "Easy to operate and maintain",
      "Compact footprint for space-conscious setups",
      "Ideal for retail-ready packaging"
    ],
    specifications: {
      "Output": "Up to 35 boxes per minute",
      "Electric Motors": "(1) 1 H.P. | (2) ½ H.P.",
      "Electrical Heaters": "5 x 1.2 kW",
      "Standard Equipment": "Photo Electric Eye & Inverter",
      "Dimensions of Machine": "2,500 x 1,150 x 1,130 mm",
      "Weight": "500 kg",
      "Reel (Max OD / Core)": "300 / 75 mm"
    },
    images: [
      "/images/product/DE-OW.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/deow.pdf",
    availability: "Ready on Order",
    tags: ["DE-OW", "box overwrapper", "display box wrapping", "packaging automation"],
    rating: 4.2,
    reviews: 16,
    applications: [
      "Overwrapping of display boxes",
      "Secondary packaging of consumer goods",
      "Neat bundling for cartons and retail units"
    ],
    faqs: [
      { question: "What does the DE-OW Overwrapper do?", answer: "It wraps display boxes of various sizes for secondary packaging, providing professional, tight wrapping over pre-packed items." },
      { question: "How does it ensure precision and reliability?", answer: "Equipped with a photo-electric eye and inverter control, the machine delivers precise wrapping and is easy to use." },
      { question: "What range of box sizes can it handle?", answer: "The DE-OW is adjustable for a variety of box sizes, making it suitable for different retail-ready packaging needs." },
      { question: "What is its output speed?", answer: "It can wrap up to 35 boxes per minute." },
      { question: "Which applications suit the DE-OW?", answer: "It is used for overwrapping display boxes, secondary packaging of consumer goods and bundling cartons or retail units neatly." }
    ],
    relatedProducts: ["de-br-batch-roller", "de-rs-rope-sizer", "de-ow-overwrapper"]
  },
  {
    slug: "de-rs-rope-sizer",
    name: "DE-RS Rope Sizer",
    category: "Supporting Equipment",
    description: "Precision rope sizer for shaping and resizing candy ropes to desired thickness before forming or cutting processes.",
    features: [
      "Adjustable speed up to 100 RPM",
      "Output thickness control as fine as 0 mm",
      "Supports wide rope sizes with customizable width",
      "Five heating zones for optimal shaping control",
      "High-strength structure with accurate roller alignment"
    ],
    specifications: {
      "Speed": "0–100 RPM",
      "Rope Output Thickness": "0–7 mm",
      "Rope Width": "15–35 mm",
      "Heater": "5 x 250–1250 Watt",
      "Weight": "300 kg",
      "Electric Motor": "2 H.P. / 3 Phase"
    },
    images: [
      "/images/product/DE-RS.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/ders.pdf",
    availability: "Built to Order (custom request only)",
    tags: ["DE-RS", "rope sizer", "candy rope sizer", "confectionery rope adjuster", "precision rope sizing"],
    rating: 4.3,
    reviews: 102,
    applications: [
      "Candy rope resizing",
      "Pre-forming candy shaping",
      "Precision rope thickness control"
    ],
    faqs: [
      { question: "What does the DE-RS Rope Sizer do?", answer: "It shapes and resizes candy ropes to the desired thickness before forming or wrapping." },
      { question: "What thickness and width range does it support?", answer: "Output thickness can be adjusted from 0 to 7 mm and rope width from 15 to 35 mm." },
      { question: "How does it regulate speed?", answer: "The machine's speed is adjustable up to 100 RPM, allowing fine control over product dimensions." },
      { question: "What features maintain precise shaping?", answer: "It has five individually heated rollers, adjustable speed, and high-strength construction for accurate roller alignment and optimal shaping control." },
      { question: "Where is it used?", answer: "In candy rope resizing, pre-forming candy shaping and precision rope thickness control in confectionery production." }
    ],
    relatedProducts: ["de-br-batch-roller", "de-300", "de-4050"]
  },
  {
    slug: "control-panel",
    name: "Control Panel",
    category: "Supporting Equipment",
    description: "Centralized interface to monitor and manage machinery parameters like temperature, speed and output for integrated wafer lines.",
    features: [
      "Centralized control of machine parameters",
      "Enhances remote operability and monitoring",
      "Optional accessory for DEW-31 / DEW-45 / DEW-63 wafer plants",
      "Improves safety during high‑speed production"
    ],
    specifications: {},
    images: [
      "/images/product/control-panel.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de3145636_1.pdf",
    availability: "Not available off-the-shelf – manufactured upon custom request",
    tags: [
      "CONTROL PANEL",
      "control panel box",
      "control panel box design",
      "control panel box price",
      "electrical control panel"
    ],
    rating: 4.5,
    reviews: 28,
    applications: [],
    faqs: [
      { question: "What is the function of the D.E. Technics control panel?", answer: "It serves as a centralized interface for monitoring and managing machinery operations—operators can control parameters such as temperature, speed and output." },
      { question: "Is it a stand-alone device?", answer: "No. It's an optional accessory meant to be integrated with larger platforms like the DEW-31, DEW-45 or DEW-63 wafer plants." },
      { question: "How does the control panel enhance safety and convenience?", answer: "It enables operators to control key machine functions from a safe distance, improving remote operability and monitoring—particularly in high-output environments." },
      { question: "Which systems can it monitor?", answer: "The panel monitors diverse functions such as temperature, speed and output across integrated wafer lines." },
      { question: "When is the control panel recommended?", answer: "It's offered as an optional upgrade when purchasing or upgrading DEW wafer lines, adding remote control and safety to high-speed production." }
    ],
    relatedProducts: ["de-2000", "de-2050ss", "de-210"]
  },
  {
    slug: "turbo-mixer",
    name: "Turbo Mixer",
    category: "Supporting Equipment",
    description: "High-speed mixer designed to prepare smooth, homogenous wafer batter for consistent baking results.",
    features: [
      "High-speed and uniform mixing",
      "Stainless steel construction",
      "Simple operation and cleaning",
      "Compact and durable design",
      "Integrated with D.E. Technics wafer lines"
    ],
    specifications: {
      "Width": "800 mm",
      "Height": "1040 mm",
    },
    images: [
      "/images/product/Turbo-Mixer.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de3145636_5.pdf",
    availability: "Compatible with DEW Wafer Lines (31, 45, 63 plates)",
    tags: ["turbo mixer", "batter mixing", "food processing", "bakery equipment", "wafer line", "D.E. Technics"],
    rating: 4.3,
    reviews: 156,
    applications: [
      "Wafer batter mixing",
      "Food and bakery processing",
      "Confectionery manufacturing lines"
    ],
    faqs: [
      { question: "What does the Turbo Mixer do?", answer: "It rapidly mixes ingredients into a smooth, homogenous wafer batter for consistent baking results." },
      { question: "What design features support hygiene and performance?", answer: "Its stainless steel construction and high-speed rotating blades ensure hygienic processing and thorough mixing in short cycles." },
      { question: "How does it benefit continuous production?", answer: "Its compact, durable design and easy discharge system make it reliable for continuous operation in bakery lines." },
      { question: "What key features are highlighted?", answer: "Uniform high-speed mixing, stainless steel construction, simple operation and cleaning, compact and durable design, integration with D.E. Technics wafer lines." },
      { question: "Where is the Turbo Mixer typically used?", answer: "In wafer batter mixing, food and bakery processing and confectionery manufacturing lines." }
    ],
    relatedProducts: ["cream-mixer", "batter-holding-tank", "wafer-spreading-machine"]
  },
  {
    slug: "automatic-wafer-spread-machine",
    name: "2B Automatic Wafer Spreading Machine (Optional)",
    category: "Wafer Equipment",
    description: "Fully automated cream spreading solution for wafer sandwich production — ideal for enhancing productivity and reducing manual intervention.",
    features: [
      "Motorized cream spreading rollers",
      "Automated operation with control panel",
      "Optional upgrade for DEW-31, DEW-45, DEW-63 lines",
      "Improves hygiene and operational efficiency",
      "Reduces manpower requirements"
    ],
    specifications: {
      "Length": "3048 mm",
      "Height": "1600 mm"
    },
    images: [
      "/images/product/cream-spread-machine.jpg"
    ],
    brochure: "https://0s8jq5whgaqcig6o.public.blob.vercel-storage.com/pdf/de3145636_2B.pdf",
    availability: "Optional (with DEW Wafer Lines)",
    tags: ["wafer spreading machine", "automatic wafer spreader", "2B", "wafer sandwich production", "cream roller"],
    rating: 5.0,
    reviews: 33,
    applications: [
      "Automatic wafer sandwich lines",
      "Large-scale wafer production",
      "Food and confectionery automation"
    ],
    faqs: [
      { question: "What does the 2B Automatic Wafer Spreading Machine do?", answer: "It is an optional, automated upgrade that applies cream precisely and quickly to wafer sheets, eliminating manual handling." },
      { question: "How does automation improve productivity?", answer: "Motor-driven rollers and an integrated control system ensure uniform spreading, increase throughput and reduce labour requirements." },
      { question: "Which wafer lines can this machine be added to?", answer: "It can be retrofitted to DEW-31, DEW-45 or DEW-63 wafer lines." },
      { question: "How does it enhance hygiene?", answer: "Eliminating manual intervention improves hygiene and ensures consistent cream application." },
      { question: "Where is it used?", answer: "In automatic wafer sandwich lines, large-scale wafer production and food/confectionery automation." }
    ],
    relatedProducts: ["wafer-spreading-machine", "cream-mixer", "wafer-cutter"]
  }
]

export function getProductBySlug(slug: string): ProductData | undefined {
  return productData.find(product => product.slug === slug)
}

export function getProductsByCategory(category: string): ProductData[] {
  return productData.filter(product => product.category === category)
}

export function getRelatedProducts(productSlug: string): ProductData[] {
  const product = getProductBySlug(productSlug)
  if (!product) return []
  
  return productData.filter(p => product.relatedProducts.includes(p.slug))
}

export const productCategories = [
  {
    slug: "packing-machines",
    name: "Packing Machines",
    description: "Small packing machines, automatic packing machines, shrink packaging machines, vacuum packaging machines, airtight packaging machines, food packaging machines, powder packaging machines, blister packaging machines, sachet packaging machines, pillow packaging machines & plastic packaging machines at competitive prices in Pakistan"
  },
  {
    slug: "biscuit-wrapping", 
    name: "Biscuit Packing Machines",
    description: "Specialized packing machines for biscuit and cookie wrapping, bakery packaging machines, snack food packaging machines from leading machine manufacturer"
  },
  {
    slug: "wafer-equipment",
    name: "Wafer Packing Equipment", 
    description: "Complete wafer production lines and packing equipment, filling and packaging machines, sealing machines for packaging at best packing machine price in Pakistan"
  },
  {
    slug: "supporting-equipment",
    name: "Supporting Packing Equipment",
    description: "Additional packing equipment for complete production lines including juice packaging machines, candy packaging machines, dairy packaging machines - buy packing machine accessories"
  }
]
