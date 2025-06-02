"use client";

import { DentalTechTable } from "@/components/companys/internal/dentaltech/dentaltech-table";
import { CalendarBoard } from "@/components/props/wrapper/calendar-board";
import { useCompany } from "@/context/context";
import { useDentalTechs, useRefreshable } from "@/hooks";
import { useState } from "react";

export const DentalTechBoard = () => {
  const { companyId } = useCompany();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { refreshKey, handleRefresh, isRefreshing } = useRefreshable(false);
  const { dentalTechs, error, isLoading } = useDentalTechs(
    companyId,
    refreshKey
  );

  useRefreshable(isLoading);

  return (
    <CalendarBoard
      data={dentalTechs || []}
      date={date}
      onDateChange={setDate}
      onRefresh={handleRefresh}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      getDateFromItem={(d) => new Date(d.deadline)}
    >
      <DentalTechTable
        date={date || new Date()}
        error={error}
        isLoading={isLoading}
        dentalTechs={dentalTechs}
      />
    </CalendarBoard>
  );
};
