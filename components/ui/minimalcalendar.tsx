"use client";

import * as React from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DayPickerSingleProps } from "react-day-picker";
import { cn } from "@/lib/utils/utils";
import { buttonVariants } from "@/components/ui/button";
import { format } from "date-fns";
import { renderStatusIcon } from "@/components/props/render/render-icons";
import { BadgeDate } from "@/components/props/component/badge-date";

interface ItemWithStatus {
  status?: "รอดำเนินการ" | "รับงานเรียบร้อย" | "เสร็จสิ้น" | "รอยืนยัน" | "ยืนยันแล้ว" | string;
  [key: string]: unknown;
}

type MinimalCalendarProps<T extends ItemWithStatus> = Omit<
  DayPickerSingleProps,
  "mode" | "onSelect" | "selected"
> & {
  data?: T[];
  getDate?: (item: T) => Date;
  onMonthChange?: (month: Date) => void;
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
};

function MinimalCalendar<T extends ItemWithStatus>({
  className,
  classNames,
  showOutsideDays = true,
  data,
  getDate,
  onMonthChange,
  selected,
  onSelect,
  ...props
}: MinimalCalendarProps<T>) {
  const thaiDayFormat = (date: Date) => {
    const days = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
    return days[date.getDay()];
  };

  return (
    <DayPicker
      mode="single"
      formatters={{ formatWeekdayName: thaiDayFormat }}
      selected={selected}
      onSelect={onSelect}
      showOutsideDays={showOutsideDays}
      onMonthChange={onMonthChange}
      className={cn("", className)}
      classNames={{
        months: "flex flex-col sm:space-x-4 sm:space-y-0",
        month: "",
        caption: "flex items-center justify-start gap-4 px-5", // เพิ่ม gap สำหรับระยะห่าง
        caption_label: "text-xl font-semibold",
        nav_button_previous: "", // ย้ายปุ่มย้อนเดือนไปด้านซ้ายสุด
        nav_button_next: "", // ย้ายปุ่มถัดไปไปด้านขวาสุด
        nav: "flex items-center gap-2",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 rounded-full hover:bg-slate-100"
        ),
        table: "w-full border-collapse",
        head_row: "flex text-muted-foreground",
        head_cell: "w-full h-14 flex p-2 items-end justify-end font-medium",
        row: "flex w-full gap-2 mb-2",
        cell: "text-center gap-2 p-0 w-full h-20 md:h-26 relative [&:has([aria-selected])]:bg-transparent",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-full w-full text-lg border rounded-md flex items-start justify-end py-1 px-3 text-muted-foreground/90"
        ),
        day_selected:
          "relative bg-muted-foreground/30 hover:bg-muted-foreground/40 text-primary font-semibold after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-6 after:h-6 after:rounded-full after:z-[-1]",
        day_today:
          "text-accent-foreground font-semibold border border-dashed border-accent rounded-md",
        day_range_start: "bg-primary text-white rounded-l-md",
        day_range_end: "bg-primary text-white rounded-r-md",

        day_outside: "text-slate-300",
        day_disabled: "text-slate-300",
        day_range_middle: "bg-slate-100",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-6", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-6", className)} {...props} />
        ),
        DayContent: ({ date }) => {
          const key = format(date, "yyyy-MM-dd");
          const items = data?.filter((item) => {
            const itemDate = getDate?.(item);
            return itemDate && format(itemDate, "yyyy-MM-dd") === key;
          }) ?? [];

          if (!items || items.length === 0) {
            return (
              <div className="relative w-full h-full">
                <div className="absolute top-1 right-1 text-xs">
                  {format(date, "d")}
                </div>
              </div>
            );
          }

          const withStatus = items.filter((i) => i.status);
          const withoutStatus = items.filter((i) => !i.status);

          const statusCounts = withStatus.reduce(
            (acc: Record<string, number>, item) => {
              const status = item.status!;
              acc[status] = (acc[status] || 0) + 1;
              return acc;
            },
            {}
          );

          return (
            <div className="relative w-full h-full">
              <div className="absolute top-1 right-1 text-xs">
                {format(date, "d")}
              </div>

              {Object.entries(statusCounts).map(([status, count], i) => {
                const icon = renderStatusIcon(status);
                const color =
                  status === "รอดำเนินการ"
                    ? "amber"
                    : status === "รับงานเรียบร้อย"
                      ? "azurite"
                      : status === "เสร็จสิ้น"
                        ? "emerald"
                        : status === "รอยืนยัน"
                          ? "amethyst"
                          : status === "ยืนยันแล้ว"
                            ? "emerald"
                        : "default";

                return (
                  <BadgeDate
                    key={status}
                    icon={icon}
                    count={count}
                    variant={color}
                    className={cn({
                      "": i === 0,
                      "bottom-6 md:bottom-7": i === 1,
                      "bottom-11 md:bottom-13": i === 2,
                    })}
                  />
                );
              })}

              {/* เพิ่ม badge สำหรับรายการที่ไม่มี status */}
              {withoutStatus.length > 0 && (
                <BadgeDate
                  icon={<Calendar className="size-4"/>}
                  count={withoutStatus.length}
                  variant="azurite"
                  className={cn({
                    "bottom-6 md:bottom-7":
                      Object.keys(statusCounts).length >= 1,
                    "bottom-11 md:bottom-13":
                      Object.keys(statusCounts).length >= 2,
                    "bottom-16 md:bottom-19":
                      Object.keys(statusCounts).length >= 3,
                  })}
                />
              )}
            </div>
          );
        },
      }}
      {...props}
    />
  );
}

export { MinimalCalendar };
