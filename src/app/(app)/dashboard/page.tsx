import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProfile } from "@/lib/auth/get-profile";

export default async function DashboardPage() {
  const profile = await getProfile();

  if (profile?.role !== "agent") {
    redirect("/tickets");
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Agent overview — status counts coming in a later step.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Agent access confirmed</CardTitle>
          <CardDescription>
            This page is only visible to support agents.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Ticket counts by status will appear here once the queue is built.
        </CardContent>
      </Card>
    </div>
  );
}
