"use client";

import { DialogCreatePatient } from "@/components/dialog/internal/dialog-patient";
import { PeriodTabs } from "@/components/shared/dashboard/period-tab";
import { Card, CardHeader } from "@/components/ui/card";
import { useDentalTechs } from "@/hooks/internal/company/use-dentalTech";
import { useAllPatients } from "@/hooks/internal/company/use-patient";
import { useState } from "react";
import { DashboardStat } from "@/components/companys/internal/dashboard/dashboard-stat";
import { Period } from "@/lib/utils/stat/stat";
import { useSchedules } from "@/hooks/internal/company/use-schedule";
import {
  useRecheckLists,
  useRechecks,
} from "@/hooks/internal/company/use-recheck";
import { useCompany } from "@/context/context";

export const Dashboard = () => {
  const { companyId } = useCompany();
  const [period, setPeriod] = useState<Period>("month");

  const { patients } = useAllPatients(companyId);
  const { dentalTechs } = useDentalTechs(companyId);
  const { schedules } = useSchedules(companyId);
  const { rechecks } = useRechecks(companyId);
  const { recheckLists } = useRecheckLists(companyId);

  return (
    <Card className="px-5">
      <CardHeader className="flex justify-between">
        <h1 className="text-2xl font-bold">แดชบอร์ด / ภาพรวมคลินิค</h1>
        <DialogCreatePatient />
      </CardHeader>

      <PeriodTabs period={period} onChange={setPeriod} />
      <DashboardStat
        patients={patients}
        dentalTechs={dentalTechs}
        period={period}
        schedules={schedules}
        rechecks={rechecks}
        recheckLists={recheckLists}
      />
    </Card>
  );
};
