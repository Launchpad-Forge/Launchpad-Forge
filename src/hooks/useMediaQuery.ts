"use client";
import { useState, useEffect, useSyncExternalStore } from "react";

function getServerSnapshot() {
  return false;
}

function subscribeToMediaQuery(query: string, callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function useMediaQuery(query: string): boolean {
  const matches = useSyncExternalStore(
    (callback) => subscribeToMediaQuery(query, callback),
    () => window.matchMedia(query).matches,
    getServerSnapshot
  );

  return matches;
}

export function useIsMobile() {
  return useMediaQuery("(max-width: 768px)");
}

export function useIsTablet() {
  return useMediaQuery("(max-width: 1024px)");
}

export function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);
  return isTouch;
}
