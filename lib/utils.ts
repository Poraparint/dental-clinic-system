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

export function formatDateOnly(date: Date) {
  const selectedDate = date
    ? new Date(date.setHours(0, 0, 0, 0))
    : new Date();
  const dateOnly = new Date(
    Date.UTC(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    )
  );
  return dateOnly;
}