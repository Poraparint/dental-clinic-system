"use client";
import { PeriodTabs } from "@/components/shared/dashboard/period-tab";
import { Card, CardHeader } from "@/components/ui/card";
import { useExpenses } from "@/hooks/internal/company/use-expenses";
import { useAllTransaction } from "@/hooks/internal/company/use-transaction";
import { Period } from "@/lib/utils/stat/stat";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FinancialStat } from "./financial-stat";
import { FinancialContent } from "./financial-content";

export const FinancialReport = () => {
  const params = useParams();
  const companyId = params.companyId as string;
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
      <FinancialContent transactions={transactions} period={period} />
    </Card>
  );
};
