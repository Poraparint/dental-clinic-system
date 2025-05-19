"use client";

import { useEffect, useMemo, useState } from "react";
import { DialogCreateSchedule } from "@/components/dialog/internal/dialog-create-schedule";
import { ScheduleCard } from "@/components/companys/internal/schedule/schedule-card";
import { useSchedules } from "@/hooks/internal/use-schedule";
import { useParams } from "next/navigation";
import { CalendarBoard } from "@/components/props/wrapper/calendar-board";
import { useRechecks } from "@/hooks/internal/use-recheck";

export const ScheduleBoard = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const { schedules, error: scheduleError, isLoading: scheduleLoading } = useSchedules(companyId, refreshKey);
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
  }, [recheckLoading , scheduleLoading, isRefreshing]);

  const combinedEvents = useMemo(() => {
    const recheckItems =
      rechecks?.flatMap((recheck) =>
        recheck.recheckList.map((item) => ({
          type: "recheck" as const,
          id: `${recheck.id}-${item.datetime}`,
          patientName: recheck.patient.name,
          phone: recheck.patient.phone,
          datetime: new Date(item.datetime),

          detail: item.detail,
          transactionCategory: {
            name: item.transactionCategory.name,
          },
          scheduleCategory: {
            name: item.scheduleCategory.name,
            order: item.scheduleCategory.order,
          },
          price: item?.price,

          dentist: recheck.creator,
          creator: recheck.creator,
          isRecheck: true,

          isConfirmed: item.isConfirmed, // ✅ raw field
          status: item.isConfirmed === true ? "ยืนยันแล้ว" : "รอยืนยัน",
        }))
      ) ?? [];

    const scheduleItems =
      schedules?.map((s) => ({
        type: "schedule" as const,
        ...s,
        scheduleCategory: {
          ...s.scheduleCategory,
          order: s.scheduleCategory?.order, 
        },
        isRecheck: false,
      })) ?? [];

    const all = [...scheduleItems, ...recheckItems];

    return all.sort((a, b) => {
      const orderA = a.scheduleCategory?.order || 0;
      const orderB = b.scheduleCategory?.order || 0;
      return orderA - orderB; 
    });
  }, [schedules, rechecks]);

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
