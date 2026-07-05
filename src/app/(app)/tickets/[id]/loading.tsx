import { Skeleton } from "@/components/ui/skeleton";

export default function TicketDetailLoading() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <Skeleton className="h-8 w-32" />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>
    </div>
  );
}
