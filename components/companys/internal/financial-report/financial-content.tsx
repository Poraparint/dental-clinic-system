import { DollarSign, PiggyBank, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/shared/dashboard/stat-card";
import { AllFinancialStats } from "@/interface/stat";
import { Card } from "@/components/ui/card";
import { FinancialChart } from "./financial-chart";
import { RevenueExpenseComparisonChart } from "@/components/shared/chart/two-bar-chart";
import { CategoryBarChart } from "@/components/shared/chart/bar-chart";

export const FinancialContent = ({
  revenue,
  totalExpenses,
  profit,
  monthlyComparison,
  categoryChartData,
  expensesChartData,
}: Pick<
  AllFinancialStats,
  | "revenue"
  | "totalExpenses"
  | "profit"
  | "monthlyComparison"
  | "categoryChartData"
  | "expensesChartData"
>) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 lg:grid-rows-5 gap-5">
      <div className="md:col-span-4 md:row-span-3">
        {expensesChartData.length > 0 && (
          <RevenueExpenseComparisonChart
            data={monthlyComparison}
            title="เปรียบเทียบรายรับรายจ่ายรายเดือน"
            description="ย้อนหลัง 6 เดือน"
          />
        )}
      </div>
      <Card className="grid grid-cols-3 gap-2 lg:col-span-3 lg:col-start-5 lg:row-start-1">
        <StatCard
          title="รายรับทั้งหมด"
          icon={<DollarSign />}
          currentValue={revenue.currentValue}
          percentChange={revenue.percentChange}
          isPositive={revenue.isPositive}
          compareLabel={revenue.compareLabel}
          valueType="currency"
          suffix="฿"
          className="rounded-md bg-emerald-bg border-emerald-border text-emerald-text"
        />

        <StatCard
          title="รายจ่ายทั้งหมด"
          icon={<PiggyBank />}
          currentValue={totalExpenses.currentValue}
          percentChange={totalExpenses.percentChange}
          isPositive={!totalExpenses.isPositive}
          compareLabel={totalExpenses.compareLabel}
          valueType="currency"
          suffix="฿"
          className="rounded-md bg-destructive text-destructive-foreground border-destructive-foreground"
        />
        <StatCard
          title="กำไรสุทธิ"
          icon={<TrendingUp />}
          currentValue={profit.currentValue}
          percentChange={profit.percentChange}
          isPositive={profit.isPositive}
          compareLabel={profit.compareLabel}
          valueType="currency"
          suffix="฿"
          className="rounded-md bg-amethyst-bg border-amethyst-border text-amethyst-text"
        />
      </Card>
      <div className="lg:col-span-3 lg:row-span-3 lg:col-start-5 lg:row-start-2">
        {categoryChartData.length > 0 && (
          <FinancialChart
            title="รายได้ทั้งหมด"
            chart={<CategoryBarChart data={categoryChartData} />}
          />
        )}
      </div>
    </div>
  );
};
