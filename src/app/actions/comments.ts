"use server";

import { revalidatePath } from "next/cache";

import { getAuthenticatedProfile } from "@/lib/auth/authorization";
import { getField } from "@/lib/form";
import { getTicketById } from "@/lib/tickets/queries";
import type { TicketActionState } from "@/lib/tickets/types";
import { createClient } from "@/lib/supabase/server";

export async function addComment(
  _prevState: TicketActionState,
  formData: FormData
): Promise<TicketActionState> {
  const auth = await getAuthenticatedProfile();

  if (!auth.ok) {
    return { error: auth.error, success: false };
  }

  const ticketId = getField(formData, "ticketId");
  const body = getField(formData, "body");

  if (!ticketId) {
    return { error: "Invalid ticket.", success: false };
  }

  if (!body) {
    return { error: "Comment cannot be empty.", success: false };
  }

  const ticket = await getTicketById(ticketId);

  if (!ticket) {
    return { error: "Ticket not found or access denied.", success: false };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("comments").insert({
    ticket_id: ticketId,
    author_id: auth.profile.id,
    body,
  });

  if (error) {
    return { error: error.message, success: false };
  }

  revalidatePath(`/tickets/${ticketId}`);
  return { error: null, success: true };
}
