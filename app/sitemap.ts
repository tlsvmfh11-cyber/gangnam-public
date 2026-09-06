import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { absoluteUrl } from "@/lib/site";

/**
 * 실제로 존재하는 Indexable URL만 포함합니다. (noindex인 not-found는 제외)
 * URL은 absoluteUrl()을 통해 canonical과 같은 형태로 생성합니다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-07");

  const corePages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly" },
    { url: absoluteUrl("/system"), lastModified, changeFrequency: "monthly" },
    { url: absoluteUrl("/price"), lastModified, changeFrequency: "monthly" },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "monthly" },
    { url: absoluteUrl("/blog"), lastModified, changeFrequency: "weekly" },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/blog/${article.slug}`),
    lastModified: new Date(article.dateModified),
    changeFrequency: "monthly",
  }));

  return [...corePages, ...articlePages];
}
