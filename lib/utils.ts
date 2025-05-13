import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: Date) {
  const date = new Date(dateString);
  return date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatCurrency(value?: number) {
  return typeof value === "number" ? value.toLocaleString() : "-";
}

export function DateOnly(date: Date | null | undefined): Date | null {
  if (!date) return null;

  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}