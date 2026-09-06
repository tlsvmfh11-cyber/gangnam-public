import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { absoluteUrl, contentUpdatedAt } from "@/lib/site";

/**
 * 실제로 존재하는 Indexable URL만 포함합니다. (noindex인 not-found는 제외)
 * URL은 absoluteUrl()을 통해 canonical과 같은 형태로 생성합니다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = contentUpdatedAt;

  const corePages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/system"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/price"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteUrl(`/blog/${article.slug}`),
    lastModified: article.dateModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...corePages, ...articlePages];
}
