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

export type TicketFormState = {
  error: string | null;
};

export type TicketActionState = {
  error: string | null;
  success: boolean;
};

export const ticketFormInitialState: TicketFormState = { error: null };

export const ticketActionInitialState: TicketActionState = {
  error: null,
  success: false,
};
