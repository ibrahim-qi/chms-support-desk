import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { TicketFilters } from "@/components/tickets/ticket-filters";
import { TicketTable } from "@/components/tickets/ticket-table";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/auth/get-profile";
import {
  SORT_OPTIONS,
  TICKET_STATUSES,
  type TicketSort,
} from "@/lib/tickets/constants";
import { getTickets } from "@/lib/tickets/queries";
import type { TicketStatus } from "@/lib/types/database";

function parseStatus(value?: string): TicketStatus | null {
  if (!value || value === "all") {
    return null;
  }

  return TICKET_STATUSES.includes(value as TicketStatus)
    ? (value as TicketStatus)
    : null;
}

function parseSort(value?: string): TicketSort {
  return SORT_OPTIONS.some((option) => option.value === value)
    ? (value as TicketSort)
    : "created_at";
}

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; sort?: string }>;
}) {
  const profile = await getProfile();
  const params = await searchParams;
  const status = parseStatus(params.status);
  const sort = parseSort(params.sort);
  const tickets = await getTickets({ status, sort });

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tickets</h1>
          <p className="text-sm text-muted-foreground">
            {profile?.role === "agent"
              ? "All support tickets across the organisation."
              : "Track the status of tickets you have raised."}
          </p>
        </div>
        <Button render={<Link href="/tickets/new" />} nativeButton={false}>
          <PlusCircle data-icon="inline-start" />
          New ticket
        </Button>
      </div>

      <TicketFilters status={status} sort={sort} />
      <TicketTable tickets={tickets} role={profile!.role} />
    </div>
  );
}
