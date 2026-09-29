import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrotherProfilePage from "../../../../components/BrotherProfilePage";
import { ECOMM_TABLE } from "../../../../utils/chapterTables";
import { buildMemberMetadata } from "../../../../utils/memberMetadata";
import {
  fetchMemberBySlug,
  fetchMemberNames,
  memberSlug,
} from "../../../../utils/members";

export const revalidate = 3600;

export async function generateStaticParams() {
  const executives = await fetchMemberNames(ECOMM_TABLE);
  return executives.map((executive) => ({ name: memberSlug(executive.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  return buildMemberMetadata({
    table: ECOMM_TABLE,
    slug: name,
    basePath: "/brothers/executive",
    fallbackTitle: "Executive not found",
    defaultRole: "Executive Committee",
  });
}

export default async function ExecutivePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const member = await fetchMemberBySlug(ECOMM_TABLE, decodeURIComponent(name));

  if (!member) notFound();

  return <BrotherProfilePage member={member} profileLabel="position" />;
}
