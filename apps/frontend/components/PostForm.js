"use client";
import { useEffect, useState } from "react";

export default function PostForm({ onSubmit, initialData, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      return;
    }

    setTitle("");
    setContent("");
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });

    if (!initialData) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-cyan-300/20 bg-slate-900/55 p-5 shadow-[0_0_40px_-18px_rgba(34,211,238,0.45)] backdrop-blur-sm md:p-6"
    >
      <h2 className="mb-4 text-lg font-semibold text-cyan-100 md:text-xl">
        {initialData ? "Edit Your Post" : "Create A New Post"}
      </h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-xl border border-cyan-300/25 bg-slate-950/50 p-3 text-slate-100 placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
        />
        <textarea
          placeholder="Post content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={5}
          className="w-full rounded-xl border border-cyan-300/25 bg-slate-950/50 p-3 text-slate-100 placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-xl bg-cyan-500 px-5 py-2.5 font-medium text-slate-950 transition hover:bg-cyan-400"
        >
          {initialData ? "Update Post" : "Create Post"}
        </button>

        {initialData && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-xl border border-slate-500 px-5 py-2.5 font-medium text-slate-200 transition hover:border-slate-300 hover:text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
