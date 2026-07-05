import { PriorityBadge } from "@/components/tickets/priority-badge";
import { StatusBadge } from "@/components/tickets/status-badge";
import type { TicketPriority, TicketStatus } from "@/lib/types/database";

export function TicketMetaBadges({
  status,
  priority,
}: {
  status: TicketStatus;
  priority: TicketPriority;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusBadge status={status} />
      <PriorityBadge priority={priority} />
    </div>
  );
}
