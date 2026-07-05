import type { Profile, Ticket } from "@/lib/types/database";

export type TicketWithRequester = Ticket & {
  requester: Pick<Profile, "full_name" | "email"> | null;
};

export type TicketFormState = {
  error: string | null;
};

export const ticketFormInitialState: TicketFormState = { error: null };
