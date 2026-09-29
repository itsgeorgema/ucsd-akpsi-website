import { createServerClient } from "../../supabase/server";
import type { ChapterTable } from "./chapterTables";

export interface Member {
  name: string;
  position?: string;
  pronouns: string;
  location: string;
  bio: string;
  linkedin: string;
  image_path: string;
}

/** Profile routes strip whitespace from names: "Grace Xiao" -> "GraceXiao". */
export function memberSlug(name: string): string {
  return name.replace(/\s/g, "");
}

export async function fetchMembers(table: ChapterTable): Promise<Member[]> {
  try {
    const { data, error } = await createServerClient().from(table).select("*");

    if (error) {
      console.error(`Error fetching members from ${table}:`, error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error(`Error fetching members from ${table}:`, error);
    return [];
  }
}

export async function fetchMemberBySlug(
  table: ChapterTable,
  slug: string,
): Promise<Member | null> {
  const members = await fetchMembers(table);
  return members.find((member) => memberSlug(member.name) === slug) ?? null;
}
