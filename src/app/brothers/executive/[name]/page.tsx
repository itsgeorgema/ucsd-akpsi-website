import type { Metadata } from "next";
import BrotherProfilePage from "../../../../components/BrotherProfilePage";
import { ECOMM_TABLE } from "../../../../utils/chapterTables";
import { buildMemberMetadata } from "../../../../utils/memberMetadata";

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

export default function ExecutivePage() {
  return (
    <BrotherProfilePage
      table={ECOMM_TABLE}
      profileLabel="position"
      notFoundTitle="Executive not found"
    />
  );
}
