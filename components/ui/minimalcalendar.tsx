"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

type MinimalCalendarProps = React.ComponentProps<typeof DayPicker> & {
  eventCounts?: Record<string, number>;
  onMonthChange?: (month: Date) => void;
};

function MinimalCalendar({
  className,
  classNames,
  showOutsideDays = true,
  onMonthChange,
  eventCounts = {},
  ...props
}: MinimalCalendarProps) {
  
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      onMonthChange={onMonthChange}
      className={cn("", className)}
      classNames={{
        months: "flex flex-col space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-6",
        caption: "flex justify-between relative items-center mb-4",
        caption_label: "text-xl font-semibold",
        nav: "flex items-center gap-2",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 p-0 rounded-full hover:bg-slate-100"
        ),
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse shadow-md",
        head_row: "flex border rounded-t-md bg-primary-foreground",
        head_cell:
          "w-full h-10 flex items-center justify-center text-xl font-medium",
        row: "flex w-full border-b border-r",
        cell: "text-center border-l p-0 w-full h-20 md:h-24 relative [&:has([aria-selected])]:bg-transparent",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-full w-full text-lg rounded-none flex items-start justify-end py-1 px-3 text-muted-foreground/90"
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
          const count = eventCounts[key] || 0;

          return (
            <div className="relative w-full h-full">
              <div className="absolute top-1 left-1 text-xs">
                {format(date, "d")}
              </div>
              {count > 0 && (
                <Badge
                  variant={"lapis"}
                  className="absolute bottom-1 text-[8px] md:text-xs flex items-center justify-center"
                >
                  {count} <span className="max-md:sr-only ">รายการนัด</span>
                </Badge>
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
