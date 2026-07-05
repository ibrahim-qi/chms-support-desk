"use client";

import { useActionState } from "react";

import { addComment } from "@/app/actions/comments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ticketActionInitialState,
  type TicketActionState,
} from "@/lib/tickets/types";

function ActionMessage({ state }: { state: TicketActionState }) {
  if (!state.error) {
    return null;
  }

  return (
    <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {state.error}
    </p>
  );
}

export function CommentForm({
  ticketId,
  formKey,
}: {
  ticketId: string;
  formKey: number;
}) {
  const [state, formAction, pending] = useActionState<
    TicketActionState,
    FormData
  >(addComment, ticketActionInitialState);

  return (
    <form action={formAction} className="grid gap-3 border-t pt-6">
      <input type="hidden" name="ticketId" value={ticketId} />
      <ActionMessage state={state} />
      <div className="grid gap-2">
        <label htmlFor={`body-${formKey}`} className="text-sm font-medium">
          New comment
        </label>
        <Textarea
          id={`body-${formKey}`}
          name="body"
          placeholder="Write an update..."
          required
          key={formKey}
        />
      </div>
      <Button type="submit" disabled={pending} className="w-fit">
        {pending ? "Posting..." : "Post comment"}
      </Button>
    </form>
  );
}
