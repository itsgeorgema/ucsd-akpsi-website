import { createServerClient } from "../../supabase/server";

export interface RecruitmentEvent {
  eventName: string;
  date: string;
  day: string;
  description: string;
  details: string;
}

export async function fetchRecruitmentEvents(): Promise<RecruitmentEvent[]> {
  try {
    const { data, error } = await createServerClient()
      .from("recruitmentEvents")
      .select("eventName, date, day, description, details")
      .order("order", { ascending: true });

    if (error) {
      console.error("Error fetching recruitment events:", error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("Error fetching recruitment events:", error);
    return [];
  }
}
