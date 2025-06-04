"use client";

import { FormNotFound } from "@/components/form-not-found";
import { Loading } from "@/components/loading";
import { DentalAppointment, ApiError, RefreshableProps } from "@/types";
import { CalendarEventCard } from "@/components/props/component/card/event-card";
import { Calendar, LampDesk } from "lucide-react";
import { useFilteredAppointments } from "@/hooks/internal/filter/use-filtered-apm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { softDeleteSchedule } from "@/hooks";
import { toast } from "sonner";
import { useCompany } from "@/context/context";

type TypeEventCard = RefreshableProps & {
  date: Date;
  events: DentalAppointment[];
  error: ApiError | null;
  isLoading: boolean;
};

export const ScheduleCard = ({
  date,
  events,
  error,
  isLoading,
  handleRefresh,
}: TypeEventCard
) => {
  const { companyId } = useCompany();
  const filtered = useFilteredAppointments(events, date);

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
      <ScrollArea className="h-[36rem]">
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
            badgeTooltip={
              item.isRecheck ? "รายการรีเช็ค / แบ่งชำระ" : "รายการนัด"
            }
            datetime={item.datetime}
            name={item.patientName || "ไม่ทราบชื่อ"}
            phone={item.phone}
            detail={item.detail}
            categoryName={item.transactionCategory.name || "-"}
            schedule={item.scheduleCategory.name || "-"}
            dentist={item.isRecheck ? item.creator?.name : item.dentist?.name}
            creator={item.creator.name || "ไม่ทราบชื่อ"}
            extraLabel={item.isRecheck ? "🩺 Recheck" : undefined}
            item={ item }
            onSoftDelete={!item.isRecheck ? async (item: DentalAppointment) =>
              softDeleteSchedule(companyId, item.id)
             : undefined}
            onDeleteResult={({ success, error, description }) => {
              if (success) {
                toast.success(success);
                handleRefresh?.();
              } else {
                toast.error(error, {
                  description,
                });
              }
            }}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
