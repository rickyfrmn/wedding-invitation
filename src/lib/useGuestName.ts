"use client";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const fallback = () => "Tamu Undangan";
function readGuestName() {
  if (typeof window === "undefined") return "Tamu Undangan";
  const name = new URLSearchParams(window.location.search).get("to")?.trim();
  return name?.slice(0, 80) || "Tamu Undangan";
}
export function useGuestName() {
  return useSyncExternalStore(subscribe, readGuestName, fallback);
}
