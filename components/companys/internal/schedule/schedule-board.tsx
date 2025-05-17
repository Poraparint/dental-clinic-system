"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";
import { useEffect, useState } from "react";
import { DialogCreateSchedule } from "@/components/dialog/internal/dialog-create-schedule";
import { ScheduleCard } from "@/components/companys/internal/schedule/schedule-card";
import { useSchedules } from "@/hooks/internal/use-schedule";
import { useParams } from "next/navigation";
import { RefreshButton } from "@/components/props/component/button/refresh-button";
import { MinimalCalendar } from "@/components/ui/minimalcalendar";

export const ScheduleBoard = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { schedules, error, isLoading } = useSchedules(companyId, refreshKey);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isLoading && isRefreshing) {
      setIsRefreshing(false);
    }
  }, [isLoading, isRefreshing]);

  console.log(date);
  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="md:flex space-y-2">
          <div className="md:w-4/6 px-3 relative">
            <MinimalCalendar
              data={schedules}
              getDate={(s) => new Date(s.datetime)}
              selected={date}
              onSelect={setDate}
            />
            <div className="absolute top-1 right-4 flex gap-2">
              <RefreshButton
                onClick={handleRefresh}
                isLoading={isLoading}
                isRefreshing={isRefreshing}
              />
              <DialogCreateSchedule
                datetime={date || new Date()}
                onSuccess={handleRefresh}
              />
            </div>
          </div>
          <div className="p-6 space-y-4 md:w-2/6">
            <div className="flex items-center">
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
            </div>
            <ScheduleCard
              date={date || new Date()}
              error={error}
              isLoading={isLoading}
              schedules={schedules}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
