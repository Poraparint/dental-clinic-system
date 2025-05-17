"use client";

import { FormNotFound } from "@/components/form-not-found";
import { Loading } from "@/components/loading";
import { ApiError } from "@/types/api-error";
import { Schedule } from "@/types/schedule";
import { useMemo } from "react";
import { CalendarEventCard } from "@/components/props/component/card/event-card";

export const ScheduleCard = ({
  date,
  schedules,
  error,
  isLoading,
}: {
  date: Date;
  schedules: Schedule[];
  error: ApiError | null;
  isLoading: boolean;
}) => {
  const filteredSchedules = useMemo(() => {
    return schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.datetime);
      return (
        scheduleDate.getFullYear() === date.getFullYear() &&
        scheduleDate.getMonth() === date.getMonth() &&
        scheduleDate.getDate() === date.getDate()
      );
    });
  }, [schedules, date]);

  if (isLoading) return <Loading />;

  if (error || !filteredSchedules.length) {
    return (
      <FormNotFound
        message={error?.error || "ไม่พบข้อมูล"}
        description={error?.description || "ไม่มีรายการนัดหมายในวันนี้"}
      />
    );
  }

  return (
    <div className="space-y-3">
      {filteredSchedules.map((schedule) => (
        <CalendarEventCard
          key={schedule.id}
          avatar={schedule.scheduleCategory.name}
          datetime={schedule.datetime}
          name={schedule.patientName}
          phone={schedule.phone}
          detail={schedule.detail}
          categoryName={schedule.transactionCategory.name || "-"}
          schedule={schedule.scheduleCategory.name || "-"}
          dentist={schedule.dentist.name || "-"}
          creator={schedule.creator.name || "-"}
        />
      ))}
    </div>
  );
};