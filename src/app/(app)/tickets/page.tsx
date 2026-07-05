import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { TicketFilters } from "@/components/tickets/ticket-filters";
import { TicketTable } from "@/components/tickets/ticket-table";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/auth/get-profile";
import { isAgent } from "@/lib/auth/authorization";
import { getTickets } from "@/lib/tickets/queries";
import {
  parseTicketSort,
  parseTicketStatus,
} from "@/lib/tickets/validation";

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; sort?: string }>;
}) {
  const profile = await getProfile();
  const params = await searchParams;
  const status = parseTicketStatus(params.status);
  const sort = parseTicketSort(params.sort);
  const tickets = await getTickets({ status, sort });

  if (!profile) {
    return null;
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="page-title">Tickets</h1>
          <p className="page-description">
            {isAgent(profile)
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
      <TicketTable tickets={tickets} role={profile.role} />
    </div>
  );
}
