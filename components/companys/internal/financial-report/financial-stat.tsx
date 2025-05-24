import { Activity, DollarSign, PiggyBank, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/shared/dashboard/stat-card";
import { FinancialStatProps } from "@/interface/stat";
import { useFinancialStats } from "@/hooks/internal/memorize/stat";

export const FinancialStat = ({
  transactions,
  expenses,
  period,
}: FinancialStatProps) => {
  const { ...stats } = useFinancialStats({ transactions, expenses, period });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard
        title="รายรับทั้งหมด"
        icon={<DollarSign />}
        currentValue={stats.revenue.currentValue}
        percentChange={stats.revenue.percentChange}
        isPositive={stats.revenue.isPositive}
        compareLabel={stats.revenue.compareLabel}
        valueType="currency"
        suffix="฿"
        className="rounded-md bg-emerald-bg border-emerald-border text-emerald-text"
      />

      <StatCard
        title="รายรับเฉลี่ย/รายการ"
        icon={<TrendingUp />}
        currentValue={stats.avgTransaction.currentValue}
        percentChange={stats.avgTransaction.percentChange}
        isPositive={stats.avgTransaction.isPositive}
        compareLabel={stats.avgTransaction.compareLabel}
        valueType="currency"
        suffix="฿"
        className="rounded-md bg-amethyst-bg border-amethyst-border text-amethyst-text"
      />
      <StatCard
        title="รายจ่ายทั้งหมด"
        icon={<PiggyBank />}
        currentValue={stats.totalExpenses.currentValue}
        percentChange={stats.totalExpenses.percentChange}
        isPositive={!stats.totalExpenses.isPositive}
        compareLabel={stats.totalExpenses.compareLabel}
        valueType="currency"
        suffix="฿"
        className="rounded-md bg-destructive text-destructive-foreground border-destructive-foreground"
      />
      <StatCard
        title="หมวดหมู่ยอดนิยม"
        icon={<Activity />}
        currentValue={stats.topTransactionCategory.currentValue}
        percentChange={stats.topTransactionCategory.percentChange}
        isPositive={stats.topTransactionCategory.isPositive}
        compareLabel={stats.topTransactionCategory.compareLabel}
        customValue={stats.topTransactionCategory.categoryName}
        showTrend={false}
        className="rounded-md bg-amber-bg border-amber-border text-amber-text"
      />
    </div>
  );
};
