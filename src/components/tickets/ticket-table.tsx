import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { PriorityBadge } from "@/components/tickets/priority-badge";
import { StatusBadge } from "@/components/tickets/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CATEGORY_LABELS, formatDateTime } from "@/lib/tickets/constants";
import type { TicketWithRequester } from "@/lib/tickets/types";
import type { UserRole } from "@/lib/types/database";

export function TicketTable({
  tickets,
  role,
}: {
  tickets: TicketWithRequester[];
  role: UserRole;
}) {
  if (tickets.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No tickets found</CardTitle>
          <CardDescription>
            {role === "agent"
              ? "The queue is empty or no tickets match your filters."
              : "You have not raised any tickets yet, or none match your filters."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button render={<Link href="/tickets/new" />} nativeButton={false}>
            <PlusCircle data-icon="inline-start" />
            Raise a ticket
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="py-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Category</TableHead>
            {role === "agent" && <TableHead>Requester</TableHead>}
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="max-w-xs font-medium">{ticket.title}</TableCell>
              <TableCell>
                <StatusBadge status={ticket.status} />
              </TableCell>
              <TableCell>
                <PriorityBadge priority={ticket.priority} />
              </TableCell>
              <TableCell>{CATEGORY_LABELS[ticket.category]}</TableCell>
              {role === "agent" && (
                <TableCell>
                  {ticket.requester?.full_name || ticket.requester?.email || "—"}
                </TableCell>
              )}
              <TableCell className="text-muted-foreground">
                {formatDateTime(ticket.created_at)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
