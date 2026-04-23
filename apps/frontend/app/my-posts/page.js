"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "../../services/api";
import PostCard from "../../components/PostCard";
import PostForm from "../../components/PostForm";

export default function MyPostsPage() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchMyPosts = async () => {
    try {
      const res = await API.get("/posts/me");
      setPosts(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    fetchMyPosts();
  }, [router]);

  const updatePost = async (data) => {
    if (!editing?._id) return;

    await API.put(`/posts/${editing._id}`, data);
    setEditing(null);
    fetchMyPosts();
  };

  const deletePost = async (id) => {
    await API.delete(`/posts/${id}`);
    if (editing?._id === id) {
      setEditing(null);
    }
    if (selectedPost?._id === id) {
      setSelectedPost(null);
    }
    fetchMyPosts();
  };

  const closePostModal = () => setSelectedPost(null);

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-cyan-950 to-teal-950 text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <div className="mb-8 rounded-2xl border border-cyan-300/20 bg-slate-900/50 p-6 shadow-[0_0_80px_-20px_rgba(34,211,238,0.35)] backdrop-blur-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                My Posts
              </h1>
              <p className="mt-2 text-sm text-slate-300 md:text-base">
                View, edit, and delete only the posts you created.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/20"
            >
              Back To Dashboard
            </Link>
          </div>
        </div>

        {editing && (
          <div className="mb-8">
            <PostForm
              onSubmit={updatePost}
              initialData={editing}
              onCancelEdit={() => setEditing(null)}
            />
          </div>
        )}

        <section>
          {loading ? (
            <p className="text-slate-300">Loading your posts...</p>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-cyan-300/30 bg-slate-900/40 p-8 text-center text-slate-300">
              You have not created any posts yet.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onDelete={deletePost}
                  onEdit={setEditing}
                  onView={setSelectedPost}
                  isOwner={true}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4"
          onClick={closePostModal}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-cyan-300/30 bg-slate-900 p-6 shadow-[0_0_50px_-10px_rgba(34,211,238,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold text-cyan-100">
                {selectedPost.title}
              </h3>
              <button
                onClick={closePostModal}
                className="rounded-lg border border-slate-500 px-3 py-1 text-sm text-slate-200 transition hover:border-slate-300"
              >
                Close
              </button>
            </div>

            <p className="mb-3 text-sm text-slate-400">
              By {selectedPost.author?.name || "You"}
            </p>
            <p className="whitespace-pre-wrap leading-7 text-slate-200">
              {selectedPost.content}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
