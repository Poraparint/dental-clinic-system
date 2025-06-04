"use client";

import { useState } from "react";
import { DialogCreateSchedule } from "@/components/dialog/internal/dialog-schedule";
import { ScheduleCard } from "@/components/companys/internal/schedule/schedule-card";
import { CalendarBoard } from "@/components/props/wrapper/calendar-board";
import {
  useSchedules,
  useRechecks,
  useCombinedAppointments,
  useRefreshable,
} from "@/hooks";
import { useCompany } from "@/context/context";

export const ScheduleBoard = () => {
  const { companyId } = useCompany();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { refreshKey, handleRefresh, isRefreshing } = useRefreshable();

  const {
    schedules,
    error: scheduleError,
    isLoading: scheduleLoading,
  } = useSchedules(companyId, refreshKey);
  const {
    rechecks,
    error: recheckError,
    isLoading: recheckLoading,
  } = useRechecks(companyId, refreshKey);

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
        handleRefresh={ handleRefresh }
      />
    </CalendarBoard>
  );
};
