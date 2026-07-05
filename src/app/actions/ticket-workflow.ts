"use server";

import { revalidatePath } from "next/cache";

import { getAgentProfile } from "@/lib/auth/authorization";
import { getField } from "@/lib/form";
import { TICKET_STATUSES, STATUS_LABELS } from "@/lib/tickets/constants";
import { getTicketById } from "@/lib/tickets/queries";
import type { TicketActionState } from "@/lib/tickets/types";
import { canTransition } from "@/lib/tickets/workflow";
import { createClient } from "@/lib/supabase/server";
import type { TicketStatus } from "@/lib/types/database";

function revalidateTicketPaths(ticketId: string) {
  revalidatePath(`/tickets/${ticketId}`);
  revalidatePath("/tickets");
  revalidatePath("/dashboard");
}

export async function updateTicketStatus(
  _prevState: TicketActionState,
  formData: FormData
): Promise<TicketActionState> {
  const auth = await getAgentProfile();

  if (!auth.ok) {
    return { error: auth.error, success: false };
  }

  const ticketId = getField(formData, "ticketId");
  const status = getField(formData, "status") as TicketStatus;

  if (!ticketId || !TICKET_STATUSES.includes(status)) {
    return { error: "Invalid ticket or status.", success: false };
  }

  const ticket = await getTicketById(ticketId);

  if (!ticket) {
    return { error: "Ticket not found.", success: false };
  }

  if (!canTransition(ticket.status, status)) {
    return {
      error: `Cannot move from ${STATUS_LABELS[ticket.status]} to ${STATUS_LABELS[status]}.`,
      success: false,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("tickets")
    .update({ status })
    .eq("id", ticketId);

  if (error) {
    return { error: error.message, success: false };
  }

  revalidateTicketPaths(ticketId);
  return { error: null, success: true };
}

export async function assignTicket(
  _prevState: TicketActionState,
  formData: FormData
): Promise<TicketActionState> {
  const auth = await getAgentProfile();

  if (!auth.ok) {
    return { error: auth.error, success: false };
  }

  const ticketId = getField(formData, "ticketId");
  const assigneeId = getField(formData, "assigneeId");

  if (!ticketId) {
    return { error: "Invalid ticket.", success: false };
  }

  const ticket = await getTicketById(ticketId);

  if (!ticket) {
    return { error: "Ticket not found.", success: false };
  }

  const supabase = await createClient();

  if (assigneeId) {
    const { data: agent, error: agentError } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("id", assigneeId)
      .eq("role", "agent")
      .maybeSingle();

    if (agentError || !agent) {
      return { error: "Selected assignee is not a valid agent.", success: false };
    }
  }

  const { error } = await supabase
    .from("tickets")
    .update({ assignee_id: assigneeId || null })
    .eq("id", ticketId);

  if (error) {
    return { error: error.message, success: false };
  }

  revalidateTicketPaths(ticketId);
  return { error: null, success: true };
}
