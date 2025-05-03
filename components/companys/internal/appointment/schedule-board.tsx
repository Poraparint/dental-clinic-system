


import { ScheduleTable } from "@/components/companys/internal/appointment/schedule-table";
import { ScheduleDialog } from "@/components/dialog/internal/dialog-create-schedule";

export const ScheduleBoard = () => {

  return (
    <div className="flex">
      <ScheduleDialog/>
      <ScheduleTable />
    </div>
  );
};
