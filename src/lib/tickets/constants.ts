import type {
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from "@/lib/types/database";

export const TICKET_STATUSES: TicketStatus[] = [
  "open",
  "in_progress",
  "resolved",
  "closed",
];

export const TICKET_PRIORITIES: TicketPriority[] = [
  "low",
  "medium",
  "high",
  "urgent",
];

export const TICKET_CATEGORIES: TicketCategory[] = [
  "hardware",
  "software",
  "access",
  "other",
];

export const STATUS_LABELS: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

export const PRIORITY_LABELS: Record<TicketPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export const CATEGORY_LABELS: Record<TicketCategory, string> = {
  hardware: "Hardware",
  software: "Software",
  access: "Access",
  other: "Other",
};

export const PRIORITY_ORDER: Record<TicketPriority, number> = {
  urgent: 0,
  high: 1,
  medium: 2,
  low: 3,
};

export type TicketSort = "created_at" | "priority";

export const SORT_OPTIONS: { value: TicketSort; label: string }[] = [
  { value: "created_at", label: "Newest first" },
  { value: "priority", label: "Priority" },
];

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
