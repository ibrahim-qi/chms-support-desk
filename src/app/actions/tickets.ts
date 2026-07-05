"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getAuthenticatedProfile } from "@/lib/auth/authorization";
import { getField } from "@/lib/form";
import {
  parseTicketCategory,
  parseTicketPriority,
} from "@/lib/tickets/validation";
import type { TicketFieldErrors, TicketFormState } from "@/lib/tickets/types";
import { createClient } from "@/lib/supabase/server";

export async function createTicket(
  _prevState: TicketFormState,
  formData: FormData
): Promise<TicketFormState> {
  const auth = await getAuthenticatedProfile();

  if (!auth.ok) {
    return { error: auth.error, fieldErrors: {} };
  }

  const title = getField(formData, "title");
  const description = getField(formData, "description");
  const category = parseTicketCategory(getField(formData, "category"));
  const priority = parseTicketPriority(getField(formData, "priority"));

  const fieldErrors: TicketFieldErrors = {};

  if (!title) {
    fieldErrors.title = "Title is required.";
  }

  if (!description) {
    fieldErrors.description = "Description is required.";
  }

  if (!category) {
    fieldErrors.category = "Select a valid category.";
  }

  if (!priority) {
    fieldErrors.priority = "Select a valid priority.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { error: null, fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("tickets").insert({
    requester_id: auth.profile.id,
    title,
    description,
    category: category!,
    priority: priority!,
  });

  if (error) {
    return { error: error.message, fieldErrors: {} };
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}
