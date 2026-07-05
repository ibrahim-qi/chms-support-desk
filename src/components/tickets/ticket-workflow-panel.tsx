"use client";

import { useActionState } from "react";

import {
  assignTicket,
  updateTicketStatus,
} from "@/app/actions/ticket-workflow";
import { ActionFeedback } from "@/components/form/form-feedback";
import { StatusBadge } from "@/components/tickets/status-badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { STATUS_LABELS } from "@/lib/tickets/constants";
import {
  ticketActionInitialState,
  type TicketActionState,
} from "@/lib/tickets/types";
import type { TicketStatus } from "@/lib/types/database";
import { fieldSelectClassName } from "@/lib/utils";

export function TicketWorkflowPanel({
  ticketId,
  currentStatus,
  assigneeId,
  nextStatuses,
  agents,
}: {
  ticketId: string;
  currentStatus: TicketStatus;
  assigneeId: string | null;
  nextStatuses: TicketStatus[];
  agents: { id: string; full_name: string; email: string }[];
}) {
  const [statusState, statusAction, statusPending] = useActionState<
    TicketActionState,
    FormData
  >(updateTicketStatus, ticketActionInitialState);

  const [assignState, assignAction, assignPending] = useActionState<
    TicketActionState,
    FormData
  >(assignTicket, ticketActionInitialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent actions</CardTitle>
        <CardDescription>
          Move the ticket through the workflow or assign it to a team member.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">Current status:</span>
          <StatusBadge status={currentStatus} />
        </div>

        {nextStatuses.length > 0 ? (
          <form action={statusAction} className="grid gap-3">
            <input type="hidden" name="ticketId" value={ticketId} />
            <div className="grid gap-2">
              <label htmlFor="status" className="text-sm font-medium">
                Update status
              </label>
              <select
                id="status"
                name="status"
                required
                defaultValue={nextStatuses[0]}
                className={fieldSelectClassName}
              >
                {nextStatuses.map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </div>
            <ActionFeedback
              error={statusState.error}
              success={statusState.success}
            />
            <Button type="submit" disabled={statusPending} className="w-fit">
              {statusPending ? "Updating..." : "Update status"}
            </Button>
          </form>
        ) : (
          <p className="text-sm text-muted-foreground">
            This ticket is closed — no further status changes.
          </p>
        )}

        <form action={assignAction} className="grid gap-3 border-t pt-6">
          <input type="hidden" name="ticketId" value={ticketId} />
          <div className="grid gap-2">
            <label htmlFor="assigneeId" className="text-sm font-medium">
              Assign to agent
            </label>
            <select
              id="assigneeId"
              name="assigneeId"
              defaultValue={assigneeId ?? ""}
              className={fieldSelectClassName}
            >
              <option value="">Unassigned</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.full_name || agent.email}
                </option>
              ))}
            </select>
          </div>
          <ActionFeedback
            error={assignState.error}
            success={assignState.success}
          />
          <Button type="submit" disabled={assignPending} className="w-fit">
            {assignPending ? "Saving..." : "Save assignment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
