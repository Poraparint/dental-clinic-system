"use client";

import { DentalTechTable } from "@/components/companys/internal/dentaltech/dentaltech-table";
import { CalendarBoard } from "@/components/props/wrapper/calendar-board";
import { useCompany } from "@/context/context";
import {
  updateDentalTechStatus,
  useDentalTechs,
  useRefreshable,
} from "@/hooks";
import { useState } from "react";
import { toast } from "sonner";

export const DentalTechBoard = () => {
  const { companyId } = useCompany();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { refreshKey, handleRefresh, isRefreshing } = useRefreshable(false);
  const { dentalTechs, error, isLoading } = useDentalTechs(
    companyId,
    refreshKey
  );
  const updateRole = async (dentalTechId: string, status: string) => {
    const response = await updateDentalTechStatus(
      companyId,
      dentalTechId,
      status
    );
    if (response.error) {
      toast.error(response.error, { description: response.description });
    } else {
      toast.success(response.success);
      handleRefresh?.();
    }
  };

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
        onStatusChange={updateRole}
      />
    </CalendarBoard>
  );
};
