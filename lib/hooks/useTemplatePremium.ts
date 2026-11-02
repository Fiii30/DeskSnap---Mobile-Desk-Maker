"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

export function useTemplatePremium() {
  const [templatesUnlocked, setTemplatesUnlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    let cancelled = false;
    let running = false;

    async function loadPremium() {
      if (running) return;
      running = true;

      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) throw authError;

        if (!user) {
          if (!cancelled) {
            setTemplatesUnlocked(false);
            setError(null);
          }
          return;
        }

        const { data, error: queryError } = await supabase
          .from("user_entitlements")
          .select("templates_unlocked")
          .eq("user_id", user.id)
          .maybeSingle();

        if (queryError) throw queryError;

        if (!cancelled) {
          setTemplatesUnlocked(data?.templates_unlocked === true);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setTemplatesUnlocked(false);
          setError("Status Premium belum bisa dimuat.");
        }
      } finally {
        running = false;

        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadPremium();

    // Menunggu webhook yang mungkin datang setelah popup sukses.
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void loadPremium();
      }
    }, 10_000);

    function handleFocus() {
      void loadPremium();
    }

    window.addEventListener("focus", handleFocus);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return {
    templatesUnlocked,
    isLoading,
    error,
  };
}
