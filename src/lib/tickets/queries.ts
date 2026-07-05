import { createClient } from "@/lib/supabase/server";
import type { TicketStatus } from "@/lib/types/database";

import { PRIORITY_ORDER, type TicketSort } from "./constants";
import type { TicketWithRequester } from "./types";

export async function getTickets(options: {
  status?: TicketStatus | null;
  sort?: TicketSort;
}): Promise<TicketWithRequester[]> {
  const supabase = await createClient();

  let query = supabase.from("tickets").select(`
      *,
      requester:profiles!requester_id (
        full_name,
        email
      )
    `);

  if (options.status) {
    query = query.eq("status", options.status);
  }

  const sort = options.sort ?? "created_at";

  if (sort === "created_at") {
    query = query.order("created_at", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  let tickets = (data ?? []) as TicketWithRequester[];

  if (sort === "priority") {
    tickets = [...tickets].sort(
      (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
    );
  }

  return tickets;
}
