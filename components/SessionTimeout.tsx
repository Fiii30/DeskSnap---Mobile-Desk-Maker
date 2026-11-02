"use client";

// Hook session timeout.
import { useSessionTimeout } from "@/lib/hooks/useSessionTimeout";

// Wrapper agar hook bisa dipakai di Server Component layout.
export default function SessionTimeout() {
  // Timebox 3 jam, inactivity 1 jam.
  useSessionTimeout({ timeboxHours: 3, inactivityHours: 1 });

  // Tidak merender apa pun.
  return null;
}
