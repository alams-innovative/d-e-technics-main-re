import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://detechnics.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/private/",
          "/admin/",
          "/api/",
          "/dashboard/",
          "/login/",
          "/internal/",
          "/_next/",
          "/temp/",
          "/draft/",
          "*.pdf$",
          "/search?*",
          "/filter?*",
          "/sort?*",
        ],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/private/", "/admin/", "/api/", "/dashboard/", "/login/", "/internal/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/private/", "/admin/", "/api/", "/dashboard/", "/login/", "/internal/"],
        crawlDelay: 2,
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`],
    host: baseUrl,
  }
}
