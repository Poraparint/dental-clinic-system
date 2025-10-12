"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function YearCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const [month, setMonth] = React.useState<Date>(props.month ?? new Date());
  const currentYear = new Date().getFullYear();

  const startYear = 1940;
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  );
  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  return (
    <DayPicker
      {...props}
      month={month}
      onMonthChange={setMonth}
      showOutsideDays={showOutsideDays}
      className={cn("p-5 rounded-md shadow-sm", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-6",
        month: "space-y-4",
        caption: "flex justify-between items-center relative",
        caption_label: "hidden", // ซ่อน label เดิม
        nav: "flex items-center gap-2",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 rounded-full hover:bg-muted-foreground"
        ),
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell:
          "w-10 h-6 flex items-center justify-center text-sm font-medium text-muted-foreground",
        row: "flex w-full mt-1",
        cell: "text-center text-sm p-0 w-10 relative [&:has([aria-selected])]:bg-transparent",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal rounded-full hover:bg-primary-foreground hover:dark:text-white"
        ),
        day_selected: "bg-charoite text-white",
        day_today: "border",
        day_outside: "text-gray-400 opacity-50",
        day_disabled: "text-gray-300 opacity-50",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-5", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-5", className)} {...props} />
        ),
        Caption: () => (
          <div className="flex w-full items-center justify-between px-1">
            <div className="flex gap-2">
              <Select
                value={String(month.getMonth())}
                onValueChange={(value) =>
                  setMonth(
                    new Date(
                      month.getFullYear(),
                      parseInt(value),
                      month.getDate()
                    )
                  )
                }
              >
                <SelectTrigger className="h-8 w-28 text-sm">
                  <SelectValue placeholder="เดือน" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m, index) => (
                    <SelectItem key={m} value={String(index)}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={String(month.getFullYear())}
                onValueChange={(value) =>
                  setMonth(
                    new Date(parseInt(value), month.getMonth(), month.getDate())
                  )
                }
              >
                <SelectTrigger className="h-8 w-20 text-sm">
                  <SelectValue placeholder="ปี" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setMonth(
                    new Date(month.getFullYear(), month.getMonth() - 1, 1)
                  )
                }
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-8 w-8 p-0 rounded-full"
                )}
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() =>
                  setMonth(
                    new Date(month.getFullYear(), month.getMonth() + 1, 1)
                  )
                }
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-8 w-8 p-0 rounded-full"
                )}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        ),
      }}
    />
  );
}

export { YearCalendar };
