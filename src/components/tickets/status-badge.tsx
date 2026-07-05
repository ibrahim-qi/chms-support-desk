import { Badge } from "@/components/ui/badge";
import { STATUS_LABELS } from "@/lib/tickets/constants";
import type { TicketStatus } from "@/lib/types/database";
import { cn } from "@/lib/utils";

const statusStyles: Record<TicketStatus, string> = {
  open: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  in_progress: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  resolved: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  closed: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-300",
};

export function StatusBadge({ status }: { status: TicketStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("border-transparent font-medium", statusStyles[status])}
    >
      {STATUS_LABELS[status]}
    </Badge>
  );
}
