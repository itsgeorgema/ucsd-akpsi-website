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
  /** An array so a double major matches under each of its majors. */
  majors?: string[];
  year?: string;
}

/** The subset the roster grids render, so listings don't ship every bio. */
export interface MemberCard {
  name: string;
  position?: string;
  image_path: string;
  majors?: string[];
  year?: string;
}

/** Ordering for the class-year filter; matches the values the migration writes. */
export const YEAR_ORDER = [
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Masters",
];

/** Profile routes strip whitespace from names: "Grace Xiao" -> "GraceXiao". */
export function memberSlug(name: string): string {
  return name.replace(/\s/g, "");
}

/** Headshots are served from the repo, not Supabase, to avoid egress cost. */
export function memberImageUrl(imagePath: string): string {
  return `/brothers/${imagePath}`;
}

/** Postgres `undefined_column`, i.e. the majors/year migration hasn't run yet. */
const UNDEFINED_COLUMN = "42703";

type SelectResult<T> = { rows: T[] | null; error: unknown };

/** Returns the error instead of logging so callers can expect certain failures. */
async function runSelect<T>(
  table: ChapterTable,
  columns: string,
  orderBy?: { column: string; ascending?: boolean },
): Promise<SelectResult<T>> {
  try {
    const query = createServerClient().from(table).select(columns);

    const { data, error } = orderBy
      ? await query.order(orderBy.column, {
          ascending: orderBy.ascending ?? true,
        })
      : await query;

    if (error) return { rows: null, error };

    return { rows: (data ?? []) as T[], error: null };
  } catch (error) {
    return { rows: null, error };
  }
}

async function select<T>(
  table: ChapterTable,
  columns: string,
  orderBy?: { column: string; ascending?: boolean },
): Promise<T[]> {
  const { rows, error } = await runSelect<T>(table, columns, orderBy);
  if (!rows) console.error(`Error fetching from ${table}:`, error);
  return rows ?? [];
}

export async function fetchActiveCards(): Promise<MemberCard[]> {
  const order = { column: "name" };
  const { rows, error } = await runSelect<MemberCard>(
    ACTIVES_TABLE,
    "name, image_path, majors, year",
    order,
  );

  if (rows) return rows;

  const code = (error as { code?: string } | null)?.code;
  if (code !== UNDEFINED_COLUMN) {
    console.error(`Error fetching from ${ACTIVES_TABLE}:`, error);
  }

  // Before the migration lands there is no majors/year; render plain cards.
  return select<MemberCard>(ACTIVES_TABLE, "name, image_path", order);
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
