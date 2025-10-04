/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Added recommended fields
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // existing
  trailingSlash: false,

  // ✅ Image/output hints
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.blob.vercel-storage.com',
        pathname: '/**',
      }
    ],
  },

  // ✅ Perf (safe with React 19)
  experimental: {
    optimizePackageImports: ['react', 'react-dom', 'lucide-react'],
    // Disabled to avoid requiring 'critters' during static prerender (e.g., /404)
    // If you want to re-enable, install critters: `pnpm add critters@0.0.22`
    // optimizeCss: true,
    scrollRestoration: true,
  },

  async rewrites() {
    // No rewrites needed now that pages are migrated to Next.js routes
    return [];
  },

  async redirects() {
    return [
      // Ensure legacy_html root resolves to index.html so relative assets load correctly
      { source: "/legacy_html", destination: "/legacy_html/index.html", permanent: true },
      // Favicon redirect (serve existing PNG as ICO)
      { source: "/favicon.ico", destination: "/favicon.png", permanent: true },
      // Legacy root and main pages
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/products.html", destination: "/products", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/quote-form.html", destination: "/quote-form", permanent: true },
      { source: "/blog.html", destination: "/blog", permanent: true },
      { source: "/clients.html", destination: "/clients", permanent: true },
      { source: "/export.html", destination: "/export", permanent: true },
      { source: "/wafer-lines.html", destination: "/products/wafer-lines", permanent: true },
      { source: "/policy.html", destination: "/policy", permanent: true },

      // Legacy blog posts
      { source: "/blogs/biscuit-packaging-machine-the-ultimate-guide-for-optimal-production.html", destination: "/blog/biscuit-packaging-machine-the-ultimate-guide-for-optimal-production", permanent: true },
      { source: "/blogs/candy-packaging-machines-the-ultimate-guide-to-confectionery-packaging.html", destination: "/blog/candy-packaging-machines-the-ultimate-guide-to-confectionery-packaging", permanent: true },
      { source: "/blogs/chocolate-packaging-machine-ensuring-quality-and-enhancing-appeal.html", destination: "/blog/chocolate-packaging-machine-ensuring-quality-and-enhancing-appeal", permanent: true },
      { source: "/blogs/hffs-machine-the-ultimate-guide-to-flexible-packaging.html", destination: "/blog/hffs-machine-the-ultimate-guide-to-flexible-packaging", permanent: true },
      { source: "/blogs/horizontal-form-fill-seal-versatile-packaging-solution.html", destination: "/blog/horizontal-form-fill-seal-versatile-packaging-solution", permanent: true },

      // Legacy product pages
      { source: "/automatic-wafer-spread-machine.html", destination: "/products/automatic-wafer-spread-machine", permanent: true },
      { source: "/batter-holding-tank.html", destination: "/products/batter-holding-tank", permanent: true },
      { source: "/control-panel.html", destination: "/products/control-panel", permanent: true },
      { source: "/cream-mixer.html", destination: "/products/cream-mixer", permanent: true },
      { source: "/turbo-mixer.html", destination: "/products/turbo-mixer", permanent: true },
      { source: "/wafer-cutter.html", destination: "/products/wafer-cutter", permanent: true },
      { source: "/wafer-spreading-machine.html", destination: "/products/wafer-spreading-machine", permanent: true },

      // Legacy product pages with common typos
      { source: "/waffer-lines.html", destination: "/products/wafer-lines", permanent: true },
      { source: "/automatic-waffer-spread-machine.html", destination: "/products/automatic-wafer-spread-machine", permanent: true },
      { source: "/waffer-cutter.html", destination: "/products/wafer-cutter", permanent: true },
      { source: "/waffer-spreading-machine.html", destination: "/products/wafer-spreading-machine", permanent: true },

      { source: "/de-200-horizontal-form-fill-seal-machine.html", destination: "/products/de-200", permanent: true },
      { source: "/de-2000-horizontal-form-fill-seal-machine.html", destination: "/products/de-2000", permanent: true },
      { source: "/de-2000CW-horizontal-form-fill-seal-machine.html", destination: "/products/de-2000cw", permanent: true },
      { source: "/de-202-horizontal-form-fill-seal-machine.html", destination: "/products/de-202", permanent: true },
      { source: "/de-2050SS-horizontal-form-fill-seal-machine.html", destination: "/products/de-2050ss", permanent: true },
      { source: "/de-210-horizontal-form-fill-seal-machine.html", destination: "/products/de-210", permanent: true },
      { source: "/de-300-on-edge-biscuit-wrapping-machine.html", destination: "/products/de-300", permanent: true },
      { source: "/de-310-on-edge-biscuit-wrapping-machine.html", destination: "/products/de-310", permanent: true },
      { source: "/de-4050-on-edge-biscuit-wrapping-machine.html", destination: "/products/de-4050", permanent: true },
      // Typos: "on-ege" -> "on-edge"
      { source: "/de-300-on-ege-biscuit-wrapping-machine.html", destination: "/products/de-300", permanent: true },
      { source: "/de-310-on-ege-biscuit-wrapping-machine.html", destination: "/products/de-310", permanent: true },
      { source: "/de-4050-on-ege-biscuit-wrapping-machine.html", destination: "/products/de-4050", permanent: true },
      { source: "/de-800-super-wrap.html", destination: "/products/de-800-super-wrap", permanent: true },
      { source: "/de-br-batch-roller.html", destination: "/products/de-br-batch-roller", permanent: true },
      { source: "/de-ow-overwrapper.html", destination: "/products/de-ow-overwrapper", permanent: true },
      { source: "/de-rs-rope-sizer.html", destination: "/products/de-rs-rope-sizer", permanent: true },
    ];
  },

  async headers() {
    return [
      // ✅ Added site-wide security headers
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // If your whole site is HTTPS on apex + subdomains, you may also add:
          // { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
      // Static assets caching
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // existing HTML-specific headers
      {
        source: "/:path*.html",
        headers: [
          {
            key: "Content-Type",
            value: "text/html; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
