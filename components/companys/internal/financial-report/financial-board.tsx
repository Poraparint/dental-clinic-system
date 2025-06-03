"use client";
import { PeriodTabs } from "@/components/shared/dashboard/period-tab";
import { Card, CardHeader } from "@/components/ui/card";
import { useExpenses } from "@/hooks/internal/company/use-expenses";
import { useAllTransaction } from "@/hooks/internal/company/use-transaction";
import { Period } from "@/lib/utils/stat/stat";
import { useState } from "react";
import { FinancialContent } from "@/components/companys/internal/financial-report/financial-content";
import { useCompany } from "@/context/context";
import { useFinancialStats } from "@/hooks/internal/memorize/use-stat";
import { useDentalTechs } from "@/hooks";

export const FinancialReport = () => {
  const { companyId } = useCompany();
  const [period, setPeriod] = useState<Period>("month");
  const { transactions } = useAllTransaction(companyId);
  const { expenses } = useExpenses(companyId);
  const { dentalTechs } = useDentalTechs(companyId);
  const { ...stats } = useFinancialStats({ transactions, expenses, dentalTechs, period });

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <h1 className="text-2xl font-bold">รายงานการเงิน / ภาพรวมการเงิน</h1>
      </CardHeader>
      <hr />
      <PeriodTabs period={period} onChange={setPeriod} />

      <FinancialContent {...stats} />
    </Card>
  );
};
