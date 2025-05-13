"use client";

import { MinimalCalendar } from "@/components/ui/minimalcalendar";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock, RefreshCw } from "lucide-react";
import { useState } from "react";
import { DialogCreateSchedule } from "@/components/dialog/internal/dialog-create-schedule";
import { ScheduleCard } from "@/components/companys/internal/schedule/schedule-card";
import { Button } from "@/components/ui/button";
import { useSchedules } from "@/hooks/internal/use-schedule";
import { useParams } from "next/navigation";


export const ScheduleBoard = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { schedules, error, isLoading } = useSchedules(companyId);

  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="md:flex space-y-2">
          <div className="border-r md:w-4/6 px-5">
            <MinimalCalendar
              mode="single"
              selected={date}
              onSelect={setDate}
              eventCounts={schedules.reduce(
                (acc, schedule) => {
                  const key = new Date(schedule.datetime)
                    .toISOString()
                    .split("T")[0];
                  acc[key] = (acc[key] || 0) + 1;
                  return acc;
                },
                {} as Record<string, number>
              )}
            />
          </div>
          <div className="p-6 space-y-4 md:w-2/6">
            <div className="flex items-center gap-2 justify-between">
              <div className="flex gap-2">
                <CalendarClock className="text-muted-foreground" />
                <h3 className="text-xl font-medium">
                  {date
                    ? date.toLocaleDateString("th-TH", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "เลือกวันที่"}
                </h3>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <DialogCreateSchedule datetime={date || new Date()} />
              </div>
            </div>
            <ScheduleCard date={date || new Date()} error={error} isLoading={isLoading} schedules={schedules} key={refreshKey} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
