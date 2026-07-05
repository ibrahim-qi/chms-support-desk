import type { TicketStatus } from "@/lib/types/database";

export const VALID_TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  open: ["in_progress"],
  in_progress: ["resolved"],
  resolved: ["closed"],
  closed: [],
};

export function getNextStatuses(current: TicketStatus): TicketStatus[] {
  return VALID_TRANSITIONS[current];
}

export function canTransition(from: TicketStatus, to: TicketStatus): boolean {
  return VALID_TRANSITIONS[from].includes(to);
}
