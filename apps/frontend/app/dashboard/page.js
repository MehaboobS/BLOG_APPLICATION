"use client";
import { useEffect, useState } from "react";
import API from "../../services/api";
import PostCard from "../../components/PostCard";
import PostForm from "../../components/PostForm";
import PopupModal from "../../components/PopupModal";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
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

    fetchPosts();
  }, [router]);

  const createPost = async (data) => {
    await API.post("/posts", data);
    fetchPosts();
    setPopup({
      type: "success",
      title: "Post created",
      message: "Your new post is now live in the dashboard.",
      confirmLabel: "Great",
      onClose: () => setPopup(null)
    });
  };

  const updatePost = async (data) => {
    await API.put(`/posts/${editing._id}`, data);
    setEditing(null);
    fetchPosts();
    setPopup({
      type: "success",
      title: "Post updated",
      message: "Your changes were saved successfully.",
      confirmLabel: "Done",
      onClose: () => setPopup(null)
    });
  };

  const requestDeletePost = (post) => {
    setPopup({
      type: "confirm",
      title: "Delete post?",
      message: `This will permanently delete \"${post.title}\". This action cannot be undone.`,
      confirmLabel: "Delete",
      cancelLabel: "Keep It",
      onClose: () => setPopup(null),
      onConfirm: async () => {
        const id = post._id;
        setPopup(null);
        await API.delete(`/posts/${id}`);
        if (editing?._id === id) {
          setEditing(null);
        }
        fetchPosts();
        setPopup({
          type: "success",
          title: "Post deleted",
          message: "The post was removed successfully.",
          confirmLabel: "Okay",
          onClose: () => setPopup(null)
        });
      }
    });
  };

  const isPostOwner = (post) => {
    if (!user?._id || !post?.author) return false;

    const authorId =
      typeof post.author === "string" ? post.author : post.author._id;

    return authorId === user._id;
  };

  const closePostModal = () => setSelectedPost(null);

  const renderPostsGrid = (list, emptyText) => {
    if (list.length === 0) {
      return (
        <div className="rounded-2xl border border-dashed border-cyan-300/30 bg-slate-900/40 p-8 text-center text-slate-300">
          {emptyText}
        </div>
      );
    }

    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onDelete={requestDeletePost}
            onEdit={setEditing}
            onView={setSelectedPost}
            isOwner={isPostOwner(post)}
          />
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-cyan-950 to-teal-950 text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <div className="mb-8 rounded-2xl border border-cyan-300/20 bg-slate-900/50 p-6 shadow-[0_0_80px_-20px_rgba(34,211,238,0.35)] backdrop-blur-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Content Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-300 md:text-base">
                Create, manage, and curate your posts in one place.
              </p>
            </div>

            <Link
              href="/my-posts"
              className="inline-flex items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/20"
            >
              Go To My Posts
            </Link>
          </div>
        </div>

        <PostForm
          onSubmit={editing ? updatePost : createPost}
          initialData={editing}
          onCancelEdit={() => setEditing(null)}
        />

        <section className="mt-8">
          {loading ? (
            <p className="text-slate-300">Loading posts...</p>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-cyan-300/30 bg-slate-900/40 p-8 text-center text-slate-300">
              No posts yet. Write your first post above.
            </div>
          ) : (
            <div>
              <h2 className="mb-4 text-xl font-semibold text-cyan-100">
                All Posts
              </h2>
              {renderPostsGrid(posts, "No posts found right now.")}
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
              By {selectedPost.author?.name || "Unknown Author"}
            </p>
            <p className="whitespace-pre-wrap leading-7 text-slate-200">
              {selectedPost.content}
            </p>
          </div>
        </div>
      )}

      <PopupModal
        open={Boolean(popup)}
        type={popup?.type || "info"}
        title={popup?.title}
        message={popup?.message}
        confirmLabel={popup?.confirmLabel || "Okay"}
        cancelLabel={popup?.cancelLabel || "Cancel"}
        onClose={popup?.onClose}
        onConfirm={popup?.onConfirm}
      />
    </main>
  );
}