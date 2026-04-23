"use client";
import { useEffect, useRef, useState } from "react";

export default function GlobalLoader() {
  const [visible, setVisible] = useState(false);
  const pendingCount = useRef(0);
  const delayTimer = useRef(null);

  useEffect(() => {
    const onLoadingEvent = (event) => {
      const isLoading = Boolean(event.detail?.isLoading);

      if (isLoading) {
        pendingCount.current += 1;

        if (!delayTimer.current && !visible) {
          delayTimer.current = setTimeout(() => {
            if (pendingCount.current > 0) {
              setVisible(true);
            }
            delayTimer.current = null;
          }, 300);
        }

        return;
      }

      pendingCount.current = Math.max(0, pendingCount.current - 1);

      if (pendingCount.current === 0) {
        if (delayTimer.current) {
          clearTimeout(delayTimer.current);
          delayTimer.current = null;
        }
        setVisible(false);
      }
    };

    window.addEventListener("api-loading", onLoadingEvent);

    return () => {
      window.removeEventListener("api-loading", onLoadingEvent);
      if (delayTimer.current) {
        clearTimeout(delayTimer.current);
      }
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed left-0 right-0 top-0 z-100">
      <div className="h-1.5 w-full overflow-hidden bg-cyan-300/20">
        <div className="loader-bar h-full w-1/3 bg-cyan-400" />
      </div>
    </div>
  );
}
