import Link from "next/link";

export default function TicketNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4 py-12 text-center">
      <h1 className="text-2xl font-semibold">Ticket not found</h1>
      <p className="text-sm text-muted-foreground">
        This ticket does not exist or you do not have permission to view it.
      </p>
      <Link href="/tickets" className="text-sm font-medium underline">
        Back to tickets
      </Link>
    </div>
  );
}
