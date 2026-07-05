import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { CommentForm } from "@/components/tickets/comment-form";
import { CommentTimeline } from "@/components/tickets/comment-timeline";
import { TicketMetaBadges } from "@/components/tickets/ticket-meta-badges";
import { TicketWorkflowPanel } from "@/components/tickets/ticket-workflow-panel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isAgent } from "@/lib/auth/authorization";
import { getProfile } from "@/lib/auth/get-profile";
import { CATEGORY_LABELS, formatDateTime } from "@/lib/tickets/constants";
import {
  getAgents,
  getComments,
  getTicketById,
} from "@/lib/tickets/queries";
import { getNextStatuses } from "@/lib/tickets/workflow";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await getProfile();
  const ticket = await getTicketById(id);

  if (!ticket || !profile) {
    notFound();
  }

  const comments = await getComments(id);
  const agents = isAgent(profile) ? await getAgents() : [];
  const nextStatuses = getNextStatuses(ticket.status);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          render={<Link href="/tickets" />}
          nativeButton={false}
        >
          <ArrowLeft data-icon="inline-start" />
          Back to queue
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="grid gap-2">
                  <CardTitle className="text-xl">{ticket.title}</CardTitle>
                  <CardDescription>
                    Opened {formatDateTime(ticket.created_at)}
                  </CardDescription>
                </div>
                <TicketMetaBadges
                  status={ticket.status}
                  priority={ticket.priority}
                />
              </div>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div>
                <h2 className="mb-2 text-sm font-medium">Description</h2>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {ticket.description}
                </p>
              </div>
              <dl className="grid gap-4 border-t pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-muted-foreground">Category</dt>
                  <dd className="text-sm font-medium">
                    {CATEGORY_LABELS[ticket.category]}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Requester</dt>
                  <dd className="text-sm font-medium">
                    {ticket.requester?.full_name ||
                      ticket.requester?.email ||
                      "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Assignee</dt>
                  <dd className="text-sm font-medium">
                    {ticket.assignee?.full_name ||
                      ticket.assignee?.email ||
                      "Unassigned"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Last updated</dt>
                  <dd className="text-sm font-medium">
                    {formatDateTime(ticket.updated_at)}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <CardDescription>
                Comments and updates on this ticket.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <CommentTimeline comments={comments} />
              <CommentForm ticketId={ticket.id} formKey={comments.length} />
            </CardContent>
          </Card>
        </div>

        {isAgent(profile) && (
          <TicketWorkflowPanel
            ticketId={ticket.id}
            currentStatus={ticket.status}
            assigneeId={ticket.assignee_id}
            nextStatuses={nextStatuses}
            agents={agents}
          />
        )}
      </div>
    </div>
  );
}
