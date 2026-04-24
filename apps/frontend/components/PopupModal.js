"use client";

import { useEffect } from "react";

const variantStyles = {
  success: {
    panel: "border-emerald-400/30 bg-emerald-950/95 shadow-[0_0_60px_-15px_rgba(16,185,129,0.55)]",
    accent: "bg-emerald-400/15 text-emerald-200 border-emerald-400/30",
    title: "text-emerald-100"
  },
  error: {
    panel: "border-rose-400/30 bg-rose-950/95 shadow-[0_0_60px_-15px_rgba(244,63,94,0.55)]",
    accent: "bg-rose-400/15 text-rose-200 border-rose-400/30",
    title: "text-rose-100"
  },
  confirm: {
    panel: "border-amber-300/30 bg-slate-950/95 shadow-[0_0_60px_-15px_rgba(251,191,36,0.45)]",
    accent: "bg-amber-400/15 text-amber-200 border-amber-400/30",
    title: "text-amber-100"
  },
  info: {
    panel: "border-cyan-300/30 bg-slate-950/95 shadow-[0_0_60px_-15px_rgba(34,211,238,0.45)]",
    accent: "bg-cyan-400/15 text-cyan-200 border-cyan-400/30",
    title: "text-cyan-100"
  }
};

export default function PopupModal({
  open,
  type = "info",
  title,
  message,
  confirmLabel = "Okay",
  cancelLabel = "Cancel",
  onClose,
  onConfirm
}) {
  useEffect(() => {
    if (!open || typeof document === "undefined") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const styles = variantStyles[type] || variantStyles.info;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-modal-title"
        className={`w-full max-w-md rounded-3xl border p-6 text-slate-100 ${styles.panel}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`mb-4 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] ${styles.accent}`}>
          {type}
        </div>

        <h3 id="popup-modal-title" className={`text-2xl font-bold ${styles.title}`}>
          {title}
        </h3>

        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">
          {message}
        </p>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          {type === "confirm" && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-400 hover:text-white"
            >
              {cancelLabel}
            </button>
          )}

          <button
            type="button"
            onClick={type === "confirm" ? onConfirm : onClose}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              type === "success"
                ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                : type === "error"
                ? "bg-rose-400 text-slate-950 hover:bg-rose-300"
                : type === "confirm"
                ? "bg-amber-400 text-slate-950 hover:bg-amber-300"
                : "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}