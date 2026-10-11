"use client";

import { useEffect } from "react";
import { setConsoleFunction } from "three";

// Globally silence harmless upstream library deprecations and transient warnings
if (typeof window !== "undefined") {
  // 1. Configure Three.js official console handler
  try {
    setConsoleFunction((type, message, ...params) => {
      if (
        typeof message === "string" &&
        (message.includes("Clock: This module has been deprecated") ||
          message.includes("THREE.Clock"))
      ) {
        return;
      }
      const fn = console[type as keyof Console];
      if (typeof fn === "function") {
        (fn as (...args: unknown[]) => void)(message, ...params);
      }
    });
  } catch {
    // Graceful fallback if setConsoleFunction is not available
  }

  // 2. Global console.warn filter for browser-level logs
  if (typeof console !== "undefined") {
    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      const first = args[0];
      const msg =
        typeof first === "string"
          ? first
          : first instanceof Error
            ? first.message
            : String(first ?? "");

      if (
        msg.includes("Clock: This module has been deprecated") ||
        msg.includes("THREE.Clock") ||
        msg.includes("THREE.Timer") ||
        msg.includes("Invalid scope")
      ) {
        return;
      }
      originalWarn(...args);
    };
  }
}

export default function ClientInit() {
  useEffect(() => {
    // Re-verify on hydration
    if (typeof window !== "undefined" && typeof console !== "undefined") {
      try {
        setConsoleFunction((type, message, ...params) => {
          if (
            typeof message === "string" &&
            (message.includes("Clock: This module has been deprecated") ||
              message.includes("THREE.Clock"))
          ) {
            return;
          }
          const fn = console[type as keyof Console];
          if (typeof fn === "function") {
            (fn as (...args: unknown[]) => void)(message, ...params);
          }
        });
      } catch {
        // no-op
      }
    }
  }, []);

  return null;
}
