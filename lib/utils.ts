import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toDate } from "date-fns-tz";

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
  const timeZone = "Asia/Bangkok";

  const zonedDate = toDate(date, { timeZone });

  return new Date(
    Date.UTC(
      zonedDate.getFullYear(),
      zonedDate.getMonth(),
      zonedDate.getDate(),
      0,
      0,
      0,
      0
    )
  );
}
