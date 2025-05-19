"use client";

import { FormNotFound } from "@/components/form-not-found";
import { Loading } from "@/components/loading";
import { ApiError } from "@/types/api-error";
import { useMemo } from "react";
import { DentalAppointment } from "@/types/appointment";
import { CalendarEventCard } from "@/components/props/component/card/event-card";
import { Calendar, LampDesk } from "lucide-react";

export const ScheduleCard = ({
  date,
  events,
  error,
  isLoading,
}: {
  date: Date ;
  events: DentalAppointment[];
  error: ApiError | null;
  isLoading: boolean;
}) => {
  const filtered = useMemo(() => {
    return events.filter((item) => {
      const itemDate = new Date(item.datetime);
      return (
        itemDate.getFullYear() === date.getFullYear() &&
        itemDate.getMonth() === date.getMonth() &&
        itemDate.getDate() === date.getDate()
      );
    });
  }, [events, date]);

  if (isLoading) return <Loading />;

  if (error || !filtered.length) {
    return (
      <FormNotFound
        message={error?.error || "ไม่พบข้อมูล"}
        description={"ไม่มีรายการในวันนี้"}
      />
    );
  }

  return (
    <div className="space-y-3">
      {filtered.map((item) => (
        <CalendarEventCard
          key={item.id}
          avatar={item.scheduleCategory?.name}
          badge={
            item.isRecheck ? (
              <div className="absolute top-2 right-2 bg-amethyst-bg border border-amethyst-border p-2 rounded-full">
                <LampDesk size={12} className="text-amethyst-text" />
              </div>
            ) : (
              <div className="absolute top-2 right-2 bg-azurite-bg border border-azurite-border p-2 rounded-full">
                <Calendar size={12} className="text-azurite-text" />
              </div>
            )
          }
          badgeTooltip={item.isRecheck ? "รายการรีเช็ค / แบ่งชำระ" : "รายการนัด"}
          datetime={item.datetime}
          name={item.patientName}
          phone={item.phone}
          detail={item.detail}
          categoryName={item.transactionCategory.name || "-"}
          schedule={item.scheduleCategory.name || "-"}
          dentist={item.isRecheck ? item.creator?.name : item.dentist?.name}
          creator={item.creator.name}
          extraLabel={item.isRecheck ? "🩺 Recheck" : undefined}
        />
      ))}
    </div>
  );
};
