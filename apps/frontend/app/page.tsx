import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-cyan-950 to-teal-950 text-slate-100">
      <section className="mx-auto w-full max-w-6xl px-4 pb-12 pt-16 md:px-8 md:pt-24">
        <div className="rounded-3xl border border-cyan-300/20 bg-slate-900/55 p-8 shadow-[0_0_90px_-24px_rgba(34,211,238,0.5)] backdrop-blur-sm md:p-12">
          <p className="mb-4 inline-flex rounded-full border border-cyan-300/35 bg-cyan-400/10 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-cyan-100 uppercase">
            BlogSphere Platform
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Publish ideas that move people.
          </h1>

          <p className="mt-5 max-w-2xl text-base text-slate-300 md:text-lg">
            Build your voice with rich stories, connect with readers, and manage
            every post from a beautifully crafted dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Start Writing
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-cyan-300/45 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/10"
            >
              Explore Dashboard
            </Link>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-900/45 py-4">
          <div className="slogan-track">
            <p className="slogan-item">
              Write. Publish. Inspire. Repeat. Your story starts on BlogSphere.
            </p>
            <p className="slogan-item" aria-hidden="true">
              Write. Publish. Inspire. Repeat. Your story starts on BlogSphere.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-cyan-300/15 bg-slate-900/40 p-5">
            <h2 className="text-lg font-semibold text-cyan-100">Create Posts</h2>
            <p className="mt-2 text-sm text-slate-300">
              Draft and publish blog posts with clean editing and instant updates.
            </p>
          </article>
          <article className="rounded-2xl border border-cyan-300/15 bg-slate-900/40 p-5">
            <h2 className="text-lg font-semibold text-cyan-100">Own Your Work</h2>
            <p className="mt-2 text-sm text-slate-300">
              Manage your own content safely with creator-only edit and delete access.
            </p>
          </article>
          <article className="rounded-2xl border border-cyan-300/15 bg-slate-900/40 p-5">
            <h2 className="text-lg font-semibold text-cyan-100">Read Easily</h2>
            <p className="mt-2 text-sm text-slate-300">
              Browse community and personal posts in dedicated, focused sections.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
