"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout, isAuthenticated, isReady } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const showAuthedLinks = isAuthenticated || Boolean(user);

  return (
    <nav className="sticky top-0 z-40 border-b border-cyan-300/25 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <div className="min-w-0">
          <Link href="/" className="block text-xl font-bold tracking-wide text-cyan-100">
            BlogSphere
          </Link>
          <p className="truncate text-xs text-slate-300 md:text-sm">
            Write stories, explore ideas, and manage your publishing journey.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 md:gap-3">
          <Link
            href="/"
            className="rounded-lg border border-cyan-300/35 px-3 py-1.5 text-xs font-medium text-cyan-100 transition hover:bg-cyan-300/10 md:text-sm"
          >
            Home
          </Link>

          {showAuthedLinks && (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg border border-cyan-300/35 px-3 py-1.5 text-xs font-medium text-cyan-100 transition hover:bg-cyan-300/10 md:text-sm"
              >
                Dashboard
              </Link>

              <Link
                href="/my-posts"
                className="rounded-lg border border-cyan-300/35 px-3 py-1.5 text-xs font-medium text-cyan-100 transition hover:bg-cyan-300/10 md:text-sm"
              >
                My Posts
              </Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="rounded-lg border border-amber-300/45 px-3 py-1.5 text-xs font-medium text-amber-200 transition hover:bg-amber-300/10 md:text-sm"
            >
              Admin
            </Link>
          )}

          {isReady && showAuthedLinks ? (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-rose-400 md:text-sm"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-medium text-slate-950 transition hover:bg-cyan-400 md:text-sm"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}