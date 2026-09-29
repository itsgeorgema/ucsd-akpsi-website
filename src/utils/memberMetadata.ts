import type { Metadata } from "next";
import type { ChapterTable } from "./chapterTables";
import { fetchMemberBySlug, memberSlug } from "./members";
import { truncate } from "./pageMetadata";
import { siteName } from "./site";

interface MemberMetadataOptions {
  table: ChapterTable;
  slug: string;
  /** Route prefix used to build the canonical URL, e.g. "/brothers/active". */
  basePath: string;
  fallbackTitle: string;
  /** Title-cased role used when a row has no `position`. */
  defaultRole: string;
}

export async function buildMemberMetadata({
  table,
  slug,
  basePath,
  fallbackTitle,
  defaultRole,
}: MemberMetadataOptions): Promise<Metadata> {
  const member = await fetchMemberBySlug(table, decodeURIComponent(slug));

  if (!member) {
    return { title: fallbackTitle, robots: { index: false, follow: true } };
  }

  const role = member.position?.trim() || defaultRole;
  const intro = `${member.name}, ${role} of the Nu Xi Chapter of Alpha Kappa Psi at UC San Diego.`;
  // Bios are stored with hard line breaks, which can't go into a meta tag.
  const bio = member.bio?.replace(/\s+/g, " ").trim();
  const description = truncate(bio ? `${intro} ${bio}` : intro, 300);
  const path = `${basePath}/${memberSlug(member.name)}`;
  // Headshots are portrait, so they get no 1200x630 dimensions and a small card.
  const image = { url: `/brothers/${member.image_path}`, alt: member.name };

  return {
    title: `${member.name} — ${role}`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${member.name} | ${siteName}`,
      description,
      url: path,
      siteName,
      images: [image],
      locale: "en_US",
      type: "profile",
    },
    twitter: {
      card: "summary",
      title: `${member.name} | ${siteName}`,
      description,
      images: [image.url],
    },
  };
}
