"use client";

// Hook React.
import { useEffect } from "react";

// Router untuk redirect.
import { useRouter } from "next/navigation";

// Client Supabase browser.
import { createClient } from "@/lib/supabase/client";

// Hook pengecekan login.
export function useRequireAuth() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();

      // Belum login → lempar ke halaman login.
      if (!data.user) {
        router.replace("/login");
      }
    }

    checkAuth();
  }, [router]);
}
