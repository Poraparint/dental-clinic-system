"use client";

import { DialogCreatePatient } from "@/components/dialog/internal/dialog-create-patient";
import { PeriodTabs } from "@/components/shared/dashboard/period-tab";
import { Card, CardHeader } from "@/components/ui/card";
import { useDentalTechs } from "@/hooks/internal/company/use-dentalTech";
import { usePatients } from "@/hooks/internal/company/use-patient";
import { useParams } from "next/navigation";
import { useState } from "react";
import { DashboardStat } from "@/components/companys/internal/dashboard/dashboard-stat";
import { Period } from "@/lib/utils/stat/stat";
import { useSchedules } from "@/hooks/internal/company/use-schedule";
import {
  useRecheckLists,
  useRechecks,
} from "@/hooks/internal/company/use-recheck";

export const Dashboard = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const [period, setPeriod] = useState<Period>("month");

  const { patients } = usePatients(companyId);
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
