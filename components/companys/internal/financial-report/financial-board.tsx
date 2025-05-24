"use client";
import { PeriodTabs } from "@/components/shared/dashboard/period-tab";
import { Card, CardHeader } from "@/components/ui/card";
import { useExpenses } from "@/hooks/internal/company/use-expenses";
import { useAllTransaction } from "@/hooks/internal/company/use-transaction";
import { Period } from "@/lib/utils/stat/stat";
import { useState } from "react";
import { FinancialStat } from "./financial-stat";
import { FinancialContent } from "./financial-content";
import { useCompany } from "@/context/context";

export const FinancialReport = () => {
  const { companyId } = useCompany();
  const [period, setPeriod] = useState<Period>("month");
  const { transactions } = useAllTransaction(companyId);
  const { expenses } = useExpenses(companyId);

  return (
    <Card className="px-5">
      <CardHeader className="flex justify-between">
        <h1 className="text-2xl font-bold">รายงานการเงิน / ภาพรวมการเงิน</h1>
      </CardHeader>
      <hr />
      <PeriodTabs period={period} onChange={setPeriod} />
      
      <FinancialStat
        transactions={transactions}
        expenses={expenses}
        period={period}
      />
      <FinancialContent transactions={transactions} expenses={ expenses } period={period} />
    </Card>
  );
};
