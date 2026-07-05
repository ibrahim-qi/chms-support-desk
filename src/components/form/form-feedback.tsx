export function FormBanner({ message }: { message: string | null | undefined }) {
  if (!message) {
    return null;
  }

  return (
    <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
      {message}
    </p>
  );
}

export function InlineFieldError({
  message,
  id,
}: {
  message?: string;
  id?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  );
}

export function ActionFeedback({
  error,
  success,
  successMessage = "Updated successfully.",
}: {
  error: string | null;
  success: boolean;
  successMessage?: string;
}) {
  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  if (success) {
    return <p className="text-sm text-emerald-600">{successMessage}</p>;
  }

  return null;
}
