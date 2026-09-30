// Update these two values once per term. They are the only place the Supabase
// table names appear; see WEBMASTER_UPDATE_GUIDE.md.
export const ACTIVES_TABLE = "actives-fall26";
export const ECOMM_TABLE = "ecomm-fall26";

export type ChapterTable = typeof ACTIVES_TABLE | typeof ECOMM_TABLE;
