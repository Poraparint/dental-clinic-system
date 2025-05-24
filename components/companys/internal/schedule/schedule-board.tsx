"use client";

import { useEffect, useState } from "react";
import { DialogCreateSchedule } from "@/components/dialog/internal/dialog-create-schedule";
import { ScheduleCard } from "@/components/companys/internal/schedule/schedule-card";
import { useSchedules } from "@/hooks/internal/company/use-schedule";
import { CalendarBoard } from "@/components/props/wrapper/calendar-board";
import { useRechecks } from "@/hooks/internal/company/use-recheck";
import { useCombinedAppointments } from "@/hooks/internal/filter/use-combined-apm";
import { useCompany } from "@/context/context";

export const ScheduleBoard = () => {
  const { companyId } = useCompany();
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const {
    schedules,
    error: scheduleError,
    isLoading: scheduleLoading,
  } = useSchedules(companyId, refreshKey);
  const {
    rechecks,
    error: recheckError,
    isLoading: recheckLoading,
  } = useRechecks(companyId);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!recheckLoading && !scheduleLoading && isRefreshing) {
      setIsRefreshing(false);
    }
  }, [recheckLoading, scheduleLoading, isRefreshing]);

  const { combinedEvents } = useCombinedAppointments({ schedules, rechecks });

  const isLoading = scheduleLoading && recheckLoading;
  const hasError = scheduleError && recheckError;

  return (
    <CalendarBoard
      data={combinedEvents}
      date={date}
      onDateChange={setDate}
      onRefresh={handleRefresh}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      getDateFromItem={(item) => new Date(item.datetime)}
      headerActions={
        <DialogCreateSchedule
          datetime={date || new Date()}
          onSuccess={handleRefresh}
        />
      }
    >
      <ScheduleCard
        date={date || new Date()}
        error={hasError}
        isLoading={isLoading}
        events={combinedEvents}
      />
    </CalendarBoard>
  );
};
