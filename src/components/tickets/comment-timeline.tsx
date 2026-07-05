import { formatDateTime } from "@/lib/tickets/constants";
import type { CommentWithAuthor } from "@/lib/tickets/types";

export function CommentTimeline({ comments }: { comments: CommentWithAuthor[] }) {
  if (comments.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No comments yet. Add the first update below.
      </p>
    );
  }

  return (
    <ol className="grid gap-4">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="relative border-l-2 border-border pl-4"
        >
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium">
              {comment.author?.full_name || comment.author?.email || "Unknown"}
            </span>
            <span className="capitalize text-muted-foreground">
              {comment.author?.role}
            </span>
            <span className="text-muted-foreground">·</span>
            <time className="text-muted-foreground">
              {formatDateTime(comment.created_at)}
            </time>
          </div>
          <p className="mt-2 whitespace-pre-wrap text-sm">{comment.body}</p>
        </li>
      ))}
    </ol>
  );
}
