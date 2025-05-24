"use client";

import { DentalTechTable } from "@/components/companys/internal/dentaltech/dentaltech-table";
import { CalendarBoard } from "@/components/props/wrapper/calendar-board";
import { useDentalTechs } from "@/hooks/internal/company/use-dentalTech";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const DentalTechBoard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const params = useParams();
  const companyId = params.companyId as string;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { dentalTechs, error, isLoading } = useDentalTechs(
    companyId,
    refreshKey
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isLoading && isRefreshing) {
      setIsRefreshing(false);
    }
  }, [isLoading, isRefreshing]);

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
