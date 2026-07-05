import { redirect } from "next/navigation";

import { StatusCountCards } from "@/components/dashboard/status-count-cards";
import { getProfile } from "@/lib/auth/get-profile";
import { getTicketCountsByStatus } from "@/lib/tickets/queries";

export default async function DashboardPage() {
  const profile = await getProfile();

  if (profile?.role !== "agent") {
    redirect("/tickets");
  }

  const counts = await getTicketCountsByStatus();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">
          Ticket volume by status. Click a card to open the filtered queue.
        </p>
      </div>
      <StatusCountCards counts={counts} />
    </div>
  );
}
