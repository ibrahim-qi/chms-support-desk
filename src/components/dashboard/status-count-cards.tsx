import Link from "next/link";

import { StatusBadge } from "@/components/tickets/status-badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { STATUS_LABELS, TICKET_STATUSES } from "@/lib/tickets/constants";
import type { TicketStatus } from "@/lib/types/database";

export function StatusCountCards({
  counts,
}: {
  counts: Record<TicketStatus, number>;
}) {
  const total = TICKET_STATUSES.reduce((sum, status) => sum + counts[status], 0);

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium text-muted-foreground">
            Total tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-semibold tracking-tight">{total}</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TICKET_STATUSES.map((status) => (
          <Link key={status} href={`/tickets?status=${status}`}>
            <Card className="h-full transition-colors hover:bg-muted/40">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {STATUS_LABELS[status]}
                </CardTitle>
                <StatusBadge status={status} />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold tracking-tight">
                  {counts[status]}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  View in queue
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
