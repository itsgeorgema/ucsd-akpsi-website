import type { Metadata } from "next";
import { ogImage, siteName } from "./site";

interface PageMetadataOptions {
  title: string;
  description: string;
  /** Root-relative path, resolved against `metadataBase` for canonical + OG. */
  path: string;
  image?: { url: string; alt: string };
}

/**
 * Next merges metadata shallowly, so a child route that defines `openGraph`
 * replaces the parent's wholesale. Building it here keeps every page from
 * silently dropping the share image.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const share = image
    ? { url: image.url, width: 1200, height: 630, alt: image.alt }
    : ogImage;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName,
      images: [share],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [share.url],
    },
  };
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}
