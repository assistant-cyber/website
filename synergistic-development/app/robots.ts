import type { MetadataRoute } from "next";

const SITE_URL = "https://sddenver.com";

// Pages that exist for internal client review only and should never be
// crawled or indexed (see robots: { index: false } in their own metadata).
const disallow = ["/portfolio-preview", "/site-images-preview", "/api/"];

// Explicit rules for major search + AI crawlers so it's clear at a glance
// that this site intentionally welcomes AI answer-engine crawlers (GEO/AEO)
// in addition to traditional search bots.
const userAgents = [
  "*",
  "Googlebot",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: userAgents.map((userAgent) => ({
      userAgent,
      allow: "/",
      disallow,
    })),
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
