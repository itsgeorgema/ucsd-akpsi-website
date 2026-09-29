import type { MetadataRoute } from "next";
import { ACTIVES_TABLE, ECOMM_TABLE } from "../utils/chapterTables";
import { fetchMemberNames, memberSlug } from "../utils/members";
import { siteUrl } from "../utils/site";

// Rebuild daily so a roster change reaches the sitemap without a redeploy.
export const revalidate = 86400;

const staticRoutes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/brothers/active", priority: 0.8, changeFrequency: "monthly" },
  { path: "/brothers/executive", priority: 0.8, changeFrequency: "monthly" },
  { path: "/recruitment", priority: 0.9, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [actives, executives] = await Promise.all([
    fetchMemberNames(ACTIVES_TABLE),
    fetchMemberNames(ECOMM_TABLE),
  ]);
  const lastModified = new Date();

  const memberRoutes = [
    ...actives.map((member) => `/brothers/active/${memberSlug(member.name)}`),
    ...executives.map(
      (member) => `/brothers/executive/${memberSlug(member.name)}`,
    ),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: `${siteUrl}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...memberRoutes,
  ];
}
