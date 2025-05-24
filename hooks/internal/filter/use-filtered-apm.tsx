import { useMemo } from "react";
import { filterEventsByDate } from "@/lib/utils/date/date";

export const useFilteredAppointments = <T extends { datetime: string | Date }>(
  appointments: T[],
  date: Date
) => {
  return useMemo(
    () => filterEventsByDate(appointments, date),
    [appointments, date]
  );
};
