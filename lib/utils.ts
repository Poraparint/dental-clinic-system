import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toZonedTime } from "date-fns-tz";
import { isToday } from "date-fns";

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

  const zoned = toZonedTime(date, timeZone);

  const midnightLocal = new Date(
    zoned.getFullYear(),
    zoned.getMonth(),
    zoned.getDate(),
    0,
    0,
    0
  );
  const utcTimestamp =
    midnightLocal.getTime() - midnightLocal.getTimezoneOffset() * 60 * 1000;
  return new Date(utcTimestamp);
}

export function getDisplayDate(date: Date) {
  return isToday(date) ? new Date() : formatDateOnly(date);
}