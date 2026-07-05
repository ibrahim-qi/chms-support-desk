"use client";

import Link from "next/link";
import { useActionState } from "react";

import { createTicket } from "@/app/actions/tickets";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
} from "@/lib/tickets/constants";
import {
  ticketFormInitialState,
  type TicketFormState,
} from "@/lib/tickets/types";
import { cn } from "@/lib/utils";

const selectClassName = cn(
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
  "dark:bg-input/30"
);

function FieldError({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {message}
    </p>
  );
}

export function TicketForm() {
  const [state, formAction, pending] = useActionState<
    TicketFormState,
    FormData
  >(createTicket, ticketFormInitialState);

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Raise a ticket</CardTitle>
        <CardDescription>
          Describe your issue and the support team will pick it up. New tickets
          start as Open.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-4">
          <FieldError message={state.error} />
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              name="title"
              placeholder="Brief summary of the issue"
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="What happened? What have you tried?"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue="software"
                className={selectClassName}
              >
                {TICKET_CATEGORIES.map((value) => (
                  <option key={value} value={value}>
                    {CATEGORY_LABELS[value]}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="priority" className="text-sm font-medium">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                required
                defaultValue="medium"
                className={selectClassName}
              >
                {TICKET_PRIORITIES.map((value) => (
                  <option key={value} value={value}>
                    {PRIORITY_LABELS[value]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-3 border-t-0 bg-transparent">
          <Button type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Submit ticket"}
          </Button>
          <Button
            type="button"
            variant="outline"
            render={<Link href="/tickets" />}
            nativeButton={false}
          >
            Cancel
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
