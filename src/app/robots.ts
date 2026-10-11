import type { MetadataRoute } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/crm/",
          "/api/",
          "/admin/",
        ],
      },
    ],
    sitemap: `${COMPANY_INFO.url}/sitemap.xml`,
  };
}
