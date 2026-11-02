"use client";

// Hook session timeout.
import { useSessionTimeout } from "@/lib/hooks/useSessionTimeout";

// Wrapper agar hook bisa dipakai di Server Component layout.
export default function SessionTimeout() {
  // Timebox 8 jam, inactivity 2 jam.
  useSessionTimeout({ timeboxHours: 8, inactivityHours: 2 });

  // Tidak merender apa pun.
  return null;
}
