"use client";

import { useCallback, useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getSnapshot = () => {
  const saved = localStorage.getItem("decksUsed");
  return saved ? Number(saved) : 0;
};

const getServerSnapshot = () => 0;

export const useDecksUsed = () => {
  const decksUsed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setDecksUsed = useCallback((value: number) => {
    localStorage.setItem("decksUsed", String(value));
    window.dispatchEvent(new Event("storage"));
  }, []);

  return { decksUsed, setDecksUsed };
};
  