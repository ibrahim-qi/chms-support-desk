import { TicketForm } from "@/components/tickets/ticket-form";

export default function NewTicketPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div>
        <h1 className="page-title">New ticket</h1>
        <p className="page-description">
          Submit a new support request for the team.
        </p>
      </div>
      <TicketForm />
    </div>
  );
}
