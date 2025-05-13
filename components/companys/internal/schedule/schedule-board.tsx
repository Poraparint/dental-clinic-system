"use client";

import { MinimalCalendar } from "@/components/ui/minimalcalendar";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";
import { useState } from "react";
import { DialogCreateSchedule } from "@/components/dialog/internal/dialog-create-schedule";
import { ScheduleCard } from "@/components/companys/internal/schedule/schedule-card";

export const ScheduleBoard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="md:flex">
          <div className="border-r md:w-4/6 px-5">
            <MinimalCalendar
              mode="single"
              selected={date}
              onSelect={setDate}
              // modifiers={{ hasEvent: isDayWithEvent }}
              modifiersClassNames={{
                hasEvent:
                  "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:bg-lapis-text after:rounded-full",
              }}
            />
          </div>
          <div className="p-6 space-y-4 md:w-2/6">
            <div className="flex items-center gap-2 justify-between ">
              <div className="flex gap-2 ">
                <CalendarClock className="text-muted-foreground" />
                <h3 className="text-xl font-medium">
                  {date
                    ? date.toLocaleDateString("th-TH", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Select a date"}
                </h3>
              </div>
              <DialogCreateSchedule datetime={date || new Date()} />
            </div>
            <ScheduleCard/>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
