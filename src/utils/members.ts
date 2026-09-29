import { createServerClient } from "../../supabase/server";
import { ACTIVES_TABLE, ECOMM_TABLE } from "./chapterTables";
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

/** The subset the roster grids render, so listings don't ship every bio. */
export interface MemberCard {
  name: string;
  position?: string;
  image_path: string;
}

/** Profile routes strip whitespace from names: "Grace Xiao" -> "GraceXiao". */
export function memberSlug(name: string): string {
  return name.replace(/\s/g, "");
}

/** Headshots are served from the repo, not Supabase, to avoid egress cost. */
export function memberImageUrl(imagePath: string): string {
  return `/brothers/${imagePath}`;
}

async function select<T>(
  table: ChapterTable,
  columns: string,
  orderBy?: { column: string; ascending?: boolean },
): Promise<T[]> {
  try {
    const query = createServerClient().from(table).select(columns);

    const { data, error } = orderBy
      ? await query.order(orderBy.column, {
          ascending: orderBy.ascending ?? true,
        })
      : await query;

    if (error) {
      console.error(`Error fetching from ${table}:`, error);
      return [];
    }

    return (data ?? []) as T[];
  } catch (error) {
    console.error(`Error fetching from ${table}:`, error);
    return [];
  }
}

export function fetchActiveCards(): Promise<MemberCard[]> {
  return select<MemberCard>(ACTIVES_TABLE, "name, image_path", {
    column: "name",
  });
}

export function fetchExecutiveCards(): Promise<MemberCard[]> {
  return select<MemberCard>(ECOMM_TABLE, "name, position, image_path", {
    column: "number",
  });
}

export function fetchMemberNames(
  table: ChapterTable,
): Promise<Pick<Member, "name">[]> {
  return select<Pick<Member, "name">>(table, "name");
}

export async function fetchMemberBySlug(
  table: ChapterTable,
  slug: string,
): Promise<Member | null> {
  const members = await select<Member>(table, "*");
  return members.find((member) => memberSlug(member.name) === slug) ?? null;
}
