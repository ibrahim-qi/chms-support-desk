import { createClient } from "@/lib/supabase/server";
import type { TicketStatus } from "@/lib/types/database";

import { PRIORITY_ORDER, TICKET_STATUSES, type TicketSort } from "./constants";
import type {
  CommentWithAuthor,
  TicketDetail,
  TicketWithRequester,
} from "./types";

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
  query = query.order("created_at", { ascending: false });

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

export async function getTicketById(id: string): Promise<TicketDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tickets")
    .select(
      `
      *,
      requester:profiles!requester_id (
        id,
        full_name,
        email
      ),
      assignee:profiles!assignee_id (
        id,
        full_name,
        email
      )
    `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as TicketDetail | null;
}

export async function getComments(ticketId: string): Promise<CommentWithAuthor[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      *,
      author:profiles!author_id (
        full_name,
        email,
        role
      )
    `
    )
    .eq("ticket_id", ticketId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as CommentWithAuthor[];
}

export async function getAgents() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .eq("role", "agent")
    .order("full_name");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getTicketCountsByStatus() {
  const supabase = await createClient();

  const counts = {
    open: 0,
    in_progress: 0,
    resolved: 0,
    closed: 0,
  } satisfies Record<TicketStatus, number>;

  const results = await Promise.all(
    TICKET_STATUSES.map(async (status) => {
      const { count, error } = await supabase
        .from("tickets")
        .select("*", { count: "exact", head: true })
        .eq("status", status);

      if (error) {
        throw new Error(error.message);
      }

      return { status, count: count ?? 0 };
    })
  );

  for (const { status, count } of results) {
    counts[status] = count;
  }

  return counts;
}
