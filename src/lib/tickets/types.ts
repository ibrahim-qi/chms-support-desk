import type { Comment, Profile, Ticket } from "@/lib/types/database";

export type TicketWithRequester = Ticket & {
  requester: Pick<Profile, "full_name" | "email"> | null;
};

export type TicketDetail = Ticket & {
  requester: Pick<Profile, "id" | "full_name" | "email"> | null;
  assignee: Pick<Profile, "id" | "full_name" | "email"> | null;
};

export type CommentWithAuthor = Comment & {
  author: Pick<Profile, "full_name" | "email" | "role"> | null;
};

export type TicketFieldErrors = {
  title?: string;
  description?: string;
  category?: string;
  priority?: string;
};

export type TicketFormState = {
  error: string | null;
  fieldErrors: TicketFieldErrors;
};

export type TicketActionState = {
  error: string | null;
  success: boolean;
};

export const ticketFormInitialState: TicketFormState = {
  error: null,
  fieldErrors: {},
};

export const ticketActionInitialState: TicketActionState = {
  error: null,
  success: false,
};
