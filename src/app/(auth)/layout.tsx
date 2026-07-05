export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          CHMS Cybersec
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Support Desk</h1>
      </div>
      {children}
    </div>
  );
}
