import { Badge } from "@/components/ui/badge";
import { PRIORITY_LABELS } from "@/lib/tickets/constants";
import type { TicketPriority } from "@/lib/types/database";
import { cn } from "@/lib/utils";

const priorityStyles: Record<TicketPriority, string> = {
  low: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
  medium: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  high: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  urgent: "bg-red-500/10 text-red-700 dark:text-red-300",
};

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  return (
    <Badge
      variant="outline"
      className={cn("border-transparent font-medium", priorityStyles[priority])}
    >
      {PRIORITY_LABELS[priority]}
    </Badge>
  );
}
