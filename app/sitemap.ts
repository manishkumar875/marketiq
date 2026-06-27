import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://primeeyeresearch.com";

  // Core pages
  const routes = ["", "/about", "/contact", "/signup", "/request-proposal"];
  
  // Service pages
  const services = [
    "/services",
    "/services/business-research",
    "/services/online-research",
    "/services/qualitative-research",
    "/services/quantitative-research",
    "/services/telephone-surveys"
  ];

  // Solution pages
  const solutions = [
    "/solutions",
    "/solutions/education",
    "/solutions/financial-services",
    "/solutions/healthcare",
    "/solutions/retail",
    "/solutions/technology"
  ];

  const allRoutes = [...routes, ...services, ...solutions];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("/services/") || route.includes("/solutions/") ? 0.8 : 0.9,
  }));
}
