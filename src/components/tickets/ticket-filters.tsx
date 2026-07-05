import { Button } from "@/components/ui/button";
import {
  SORT_OPTIONS,
  STATUS_LABELS,
  TICKET_STATUSES,
  type TicketSort,
} from "@/lib/tickets/constants";
import type { TicketStatus } from "@/lib/types/database";
import { fieldSelectClassName } from "@/lib/utils";

export function TicketFilters({
  status,
  sort,
}: {
  status?: TicketStatus | null;
  sort: TicketSort;
}) {
  return (
    <form className="flex flex-wrap items-end gap-3" method="get">
      <div className="grid gap-1.5">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={status ?? "all"}
          className={fieldSelectClassName}
        >
          <option value="all">All statuses</option>
          {TICKET_STATUSES.map((value) => (
            <option key={value} value={value}>
              {STATUS_LABELS[value]}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="sort" className="text-sm font-medium">
          Sort by
        </label>
        <select id="sort" name="sort" defaultValue={sort} className={fieldSelectClassName}>
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" variant="secondary">
        Apply
      </Button>
    </form>
  );
}
