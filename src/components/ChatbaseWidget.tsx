"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSupabase } from "./providers/SupabaseProvider";

type Props = {
  // If provided, the widget will only show on these path prefixes (e.g. ['/','/help'])
  showOnRoutes?: string[];
  // If provided, the widget will be hidden on these path prefixes
  hideOnRoutes?: string[];
  // When true, only show the widget for authenticated users
  authRequired?: boolean;
};

export default function ChatbaseWidget({
  showOnRoutes,
  hideOnRoutes,
  authRequired = false,
}: Props) {
  const pathname = usePathname();
  const { supabase } = useSupabase();
  const [isAuthed, setIsAuthed] = React.useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!mounted) return;
      setIsAuthed(Boolean(user));
    });
    return () => {
      mounted = false;
    };
  }, [supabase]);
  // Route matching helpers
  const pathAllowed = () => {
    if (!pathname) return true;
    if (showOnRoutes && showOnRoutes.length > 0) {
      return showOnRoutes.some((p) => pathname.startsWith(p));
    }
    if (hideOnRoutes && hideOnRoutes.length > 0) {
      return !hideOnRoutes.some((p) => pathname.startsWith(p));
    }
    return true;
  };

  // Always declare this effect so hooks order doesn't change between renders.
  // The effect will early-return without side-effects if conditions aren't met.
  useEffect(() => {
    // Guard: only run in browser
    if (typeof window === "undefined") return;

    // If auth is required but we haven't determined auth state yet, don't inject
    if (authRequired && isAuthed === null) return;
    if (authRequired && !isAuthed) return;
    if (!pathAllowed()) return;

    try {
      if (document.getElementById("gp_W16HWS_7nP0iGNEdaF")) return;

      // Minimal shim so calls before the script loads are queued
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!window.chatbase || typeof window.chatbase !== "function") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.chatbase = (...args: any[]) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (!window.chatbase.q) window.chatbase.q = [];
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.chatbase.q.push(args);
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.chatbase = new Proxy(window.chatbase, {
          get(target: any, prop: string) {
            if (prop === "q") return target.q;
            return (...args: any[]) => (window as any).chatbase(prop, ...args);
          },
        });
      }

      const onLoad = () => {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "gp_W16HWS_7nP0iGNEdaF";
        script.setAttribute("data-domain", "www.chatbase.co");
        document.body.appendChild(script);
      };

      if (document.readyState === "complete") onLoad();
      else window.addEventListener("load", onLoad);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("Chatbase widget failed to initialize", e);
    }
    // Re-run when route or auth state changes so the script can be injected only when appropriate.
  }, [pathname, isAuthed, authRequired]);

  // If auth is required but we haven't determined auth state yet, don't render anything
  if (authRequired && isAuthed === null) return null;
  if (authRequired && !isAuthed) return null;
  if (!pathAllowed()) return null;

  return (
    <div
      id="chatbase-widget-root"
      style={{ position: "fixed", right: 16, bottom: 16, zIndex: 9999 }}
    >
      <div id="chatbase-embed-anchor" />
    </div>
  );
}
