import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToLocationHash } from "../lib/scrollToAnchor";

/** After lazy Home mounts, honor `#token` and other in-page hashes. */
export function HashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    if (scrollToLocationHash()) return;
    const started = Date.now();
    const timer = window.setInterval(() => {
      if (scrollToLocationHash() || Date.now() - started > 2000) {
        window.clearInterval(timer);
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [location.hash, location.pathname]);

  return null;
}
