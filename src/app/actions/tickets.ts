"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireProfile } from "@/lib/auth/get-profile";
import {
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
} from "@/lib/tickets/constants";
import type { TicketFormState } from "@/lib/tickets/types";
import { createClient } from "@/lib/supabase/server";
import type { TicketCategory, TicketPriority } from "@/lib/types/database";

function getField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function parseCategory(value: string): TicketCategory | null {
  return TICKET_CATEGORIES.includes(value as TicketCategory)
    ? (value as TicketCategory)
    : null;
}

function parsePriority(value: string): TicketPriority | null {
  return TICKET_PRIORITIES.includes(value as TicketPriority)
    ? (value as TicketPriority)
    : null;
}

export async function createTicket(
  _prevState: TicketFormState,
  formData: FormData
): Promise<TicketFormState> {
  const profile = await requireProfile();
  const title = getField(formData, "title");
  const description = getField(formData, "description");
  const category = parseCategory(getField(formData, "category"));
  const priority = parsePriority(getField(formData, "priority"));

  if (!title || !description) {
    return { error: "Title and description are required." };
  }

  if (!category || !priority) {
    return { error: "Please select a valid category and priority." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("tickets").insert({
    requester_id: profile.id,
    title,
    description,
    category,
    priority,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}
