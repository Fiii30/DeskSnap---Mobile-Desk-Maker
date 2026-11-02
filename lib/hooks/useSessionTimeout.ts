"use client";

// Hook React.
import { useEffect, useRef } from "react";

// Router untuk redirect.
import { useRouter } from "next/navigation";

// Client Supabase browser.
import { createClient } from "@/lib/supabase/client";

// Opsi timeout.
type SessionTimeoutOptions = {
  // Batas maksimal sejak login (jam).
  timeboxHours?: number;
  // Batas tidak aktif (jam).
  inactivityHours?: number;
};

// Key localStorage.
const LOGIN_TIME_KEY = "session_login_time";
const LAST_ACTIVITY_KEY = "session_last_activity";

// Hook session timeout: timebox + inactivity.
export function useSessionTimeout({
  timeboxHours = 8,
  inactivityHours = 2,
}: SessionTimeoutOptions = {}) {
  const router = useRouter();

  // Simpan waktu login & aktivitas terakhir di ref biar tidak re-render.
  const loginTimeRef = useRef<number | null>(null);
  const lastActivityRef = useRef<number | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // Konversi jam ke milidetik.
    const timeboxMs = timeboxHours * 60 * 60 * 1000;
    const inactivityMs = inactivityHours * 60 * 60 * 1000;

    // Ambil waktu login & aktivitas terakhir dari localStorage.
    const savedLogin = localStorage.getItem(LOGIN_TIME_KEY);
    const savedActivity = localStorage.getItem(LAST_ACTIVITY_KEY);

    loginTimeRef.current = savedLogin ? Number(savedLogin) : null;
    lastActivityRef.current = savedActivity
      ? Number(savedActivity)
      : Date.now();

    // Catat waktu login saat user berhasil login.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        const now = Date.now();
        loginTimeRef.current = now;
        lastActivityRef.current = now;
        localStorage.setItem(LOGIN_TIME_KEY, String(now));
        localStorage.setItem(LAST_ACTIVITY_KEY, String(now));
      }

      if (event === "SIGNED_OUT") {
        loginTimeRef.current = null;
        lastActivityRef.current = null;
        localStorage.removeItem(LOGIN_TIME_KEY);
        localStorage.removeItem(LAST_ACTIVITY_KEY);
        router.replace("/login");
      }
    });

    // Update aktivitas terakhir saat user berinteraksi.
    function updateActivity() {
      const now = Date.now();
      lastActivityRef.current = now;
      localStorage.setItem(LAST_ACTIVITY_KEY, String(now));
    }

    // Event yang dianggap "aktivitas".
    const events = [
      "click",
      "keydown",
      "mousemove",
      "touchstart",
      "scroll",
    ] as const;

    events.forEach((event) =>
      window.addEventListener(event, updateActivity, { passive: true }),
    );

    // Cek timeout setiap 30 detik.
    const interval = setInterval(() => {
      const now = Date.now();

      // Timebox: sudah lewat batas sejak login.
      if (loginTimeRef.current && now - loginTimeRef.current > timeboxMs) {
        supabase.auth.signOut();
        return;
      }

      // Inactivity: terlalu lama tidak ada aktivitas.
      if (
        lastActivityRef.current &&
        now - lastActivityRef.current > inactivityMs
      ) {
        supabase.auth.signOut();
        return;
      }
    }, 30_000);

    // Bersih-bersih saat unmount.
    return () => {
      subscription.unsubscribe();
      events.forEach((event) =>
        window.removeEventListener(event, updateActivity),
      );
      clearInterval(interval);
    };
  }, [router, timeboxHours, inactivityHours]);
}
