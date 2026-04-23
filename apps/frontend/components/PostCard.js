"use client";

export default function PostCard({ post, onDelete, onEdit, onView, isOwner }) {
  return (
    <article className="group rounded-2xl border border-cyan-300/20 bg-slate-900/55 p-5 shadow-[0_0_35px_-20px_rgba(34,211,238,0.7)] transition hover:border-cyan-300/45">
      <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-cyan-100">
        {post.title}
      </h3>
      <p className="mb-3 line-clamp-4 text-sm text-slate-300">{post.content}</p>

      <p className="mb-4 text-xs text-slate-400">
        By {post.author?.name || "Unknown Author"}
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onView(post)}
          className="rounded-lg border border-cyan-300/50 px-3 py-1.5 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/10"
        >
          View Post
        </button>

        {isOwner && (
          <>
          <button
            onClick={() => onEdit(post)}
            className="rounded-lg bg-amber-400 px-3 py-1.5 text-sm font-medium text-slate-900 transition hover:bg-amber-300"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(post._id)}
            className="rounded-lg bg-rose-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-rose-400"
          >
            Delete
          </button>
          </>
        )}
      </div>
    </article>
  );
}