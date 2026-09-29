import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrotherProfilePage from "../../../../components/BrotherProfilePage";
import { ACTIVES_TABLE } from "../../../../utils/chapterTables";
import { buildMemberMetadata } from "../../../../utils/memberMetadata";
import {
  fetchMemberBySlug,
  fetchMemberNames,
  memberSlug,
} from "../../../../utils/members";

export const revalidate = 3600;

export async function generateStaticParams() {
  const brothers = await fetchMemberNames(ACTIVES_TABLE);
  return brothers.map((brother) => ({ name: memberSlug(brother.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  return buildMemberMetadata({
    table: ACTIVES_TABLE,
    slug: name,
    basePath: "/brothers/active",
    fallbackTitle: "Brother not found",
    defaultRole: "Active Brother",
  });
}

export default async function BrotherPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const member = await fetchMemberBySlug(
    ACTIVES_TABLE,
    decodeURIComponent(name),
  );

  if (!member) notFound();

  return <BrotherProfilePage member={member} profileLabel="Brother Profile" />;
}
