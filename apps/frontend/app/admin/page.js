"use client";
import { useEffect, useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    API.get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch(() => {
        setError("You are not authorized to view this page.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  const adminCount = users.filter((user) => user.role === "admin").length;
  const memberCount = users.length - adminCount;

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-cyan-950 to-teal-950 text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8">
        <div className="mb-8 rounded-2xl border border-cyan-300/20 bg-slate-900/50 p-6 shadow-[0_0_80px_-20px_rgba(34,211,238,0.35)] backdrop-blur-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-300 md:text-base">
                Manage and review all registered users in BlogSphere.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/20"
            >
              Back To Posts
            </Link>
          </div>
        </div>

        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-cyan-300/15 bg-slate-900/45 p-5">
            <p className="text-sm text-slate-300">Total Users</p>
            <p className="mt-2 text-3xl font-bold text-cyan-100">{users.length}</p>
          </article>
          <article className="rounded-2xl border border-cyan-300/15 bg-slate-900/45 p-5">
            <p className="text-sm text-slate-300">Admins</p>
            <p className="mt-2 text-3xl font-bold text-amber-200">{adminCount}</p>
          </article>
          <article className="rounded-2xl border border-cyan-300/15 bg-slate-900/45 p-5">
            <p className="text-sm text-slate-300">Members</p>
            <p className="mt-2 text-3xl font-bold text-emerald-200">{memberCount}</p>
          </article>
        </section>

        <section className="rounded-2xl border border-cyan-300/20 bg-slate-900/50 p-4 shadow-[0_0_40px_-18px_rgba(34,211,238,0.45)] md:p-6">
          <h2 className="mb-4 text-xl font-semibold text-cyan-100">Registered Users</h2>

          {loading ? (
            <p className="text-slate-300">Loading users...</p>
          ) : error ? (
            <div className="rounded-xl border border-rose-400/40 bg-rose-950/40 p-4 text-rose-200">
              {error}
            </div>
          ) : users.length === 0 ? (
            <div className="rounded-xl border border-dashed border-cyan-300/30 bg-slate-900/40 p-6 text-center text-slate-300">
              No users found.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-cyan-300/20">
              <table className="min-w-full divide-y divide-cyan-300/20 text-left">
                <thead className="bg-slate-900/75">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-300">
                      Name
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-300">
                      Email
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-300">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyan-300/15 bg-slate-900/35">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-cyan-400/5">
                      <td className="px-4 py-3 font-medium text-slate-100">{user.name}</td>
                      <td className="px-4 py-3 text-slate-300">{user.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-amber-300/20 text-amber-200"
                              : "bg-emerald-300/20 text-emerald-200"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}