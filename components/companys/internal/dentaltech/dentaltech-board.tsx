"use client";

import { DentalTechTable } from "@/components/companys/internal/dentaltech/dentaltech-table";
import { RefreshButton } from "@/components/props/component/button/refresh-button";
import { Card, CardContent } from "@/components/ui/card";
import { MinimalCalendar } from "@/components/ui/minimalcalendar";
import { useDentalTechs } from "@/hooks/internal/use-dentalTech";
import { CalendarClock } from "lucide-react";
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
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="md:flex space-y-2">
          <div className="md:w-4/6 px-3 relative">
            <MinimalCalendar
              data={dentalTechs || []}
              getDate={(d) => new Date(d.deadline)}
              selected={date}
              onSelect={setDate}
            />
            <div className="absolute top-1 right-4">
              <RefreshButton
                onClick={handleRefresh}
                isLoading={isLoading}
                isRefreshing={isRefreshing}
              />
            </div>
          </div>
          <div className="p-6 space-y-4 md:w-2/6">
            <div className="flex items-center ">
              <div className="flex gap-2">
                <CalendarClock className="text-muted-foreground" />
                <h3 className="text-xl font-medium">
                  {date
                    ? date.toLocaleDateString("th-TH", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "เลือกวันที่"}
                </h3>
              </div>
            </div>
            <DentalTechTable
              date={date || new Date()}
              error={error}
              isLoading={isLoading}
              dentalTechs={dentalTechs}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
