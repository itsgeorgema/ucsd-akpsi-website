import type { Metadata } from "next";
import BrotherProfilePage from "../../../../components/BrotherProfilePage";
import { ACTIVES_TABLE } from "../../../../utils/chapterTables";
import { buildMemberMetadata } from "../../../../utils/memberMetadata";

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

export default function BrotherPage() {
  return (
    <BrotherProfilePage
      table={ACTIVES_TABLE}
      profileLabel="Brother Profile"
      notFoundTitle="Brother not found"
    />
  );
}
