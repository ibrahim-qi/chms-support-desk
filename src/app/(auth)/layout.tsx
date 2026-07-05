export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-muted/40 px-4 py-12">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <span className="text-sm font-semibold">SD</span>
        </div>
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          CHMS
        </p>
        <h1 className="page-title mt-2">Support Desk</h1>
        <p className="page-description">Sign in to manage internal tickets</p>
      </div>
      {children}
    </div>
  );
}
