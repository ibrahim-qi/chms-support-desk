import { parseEnumValue } from "@/lib/form";
import type { TicketCategory, TicketPriority, TicketStatus } from "@/lib/types/database";

import {
  SORT_OPTIONS,
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
  TICKET_STATUSES,
  type TicketSort,
} from "./constants";

export function parseTicketStatus(value?: string): TicketStatus | null {
  if (!value || value === "all") {
    return null;
  }

  return parseEnumValue(value, TICKET_STATUSES);
}

export function parseTicketCategory(value: string): TicketCategory | null {
  return parseEnumValue(value, TICKET_CATEGORIES);
}

export function parseTicketPriority(value: string): TicketPriority | null {
  return parseEnumValue(value, TICKET_PRIORITIES);
}

export function parseTicketSort(value?: string): TicketSort {
  return SORT_OPTIONS.some((option) => option.value === value)
    ? (value as TicketSort)
    : "created_at";
}
