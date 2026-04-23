"use client";
import { useState } from "react";

export default function PostForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <input
        className="w-full p-2 border mb-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <textarea
        className="w-full p-2 border mb-2 rounded"
        placeholder="Content"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
      />

      <button
        onClick={() => onSubmit({ title, content })}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}