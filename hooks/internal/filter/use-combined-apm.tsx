import { Recheck, Schedule } from "@/types/appointment";
import { useMemo } from "react";

interface CombinedEvent {
  schedules: Schedule[];
rechecks: Recheck[];
}

export const useCombinedAppointments = ({
    schedules,
    rechecks,
}: CombinedEvent) => {

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
          isConfirmed: item.isConfirmed,
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

  return {
    combinedEvents,
  };
};
