import { CategoryBarChart } from "@/components/shared/chart/bar-chart";
import { Card } from "@/components/ui/card";
import { getCategoryTotals, Period } from "@/lib/utils/stat/stat";
import { Transaction } from "@/types/transaction";
import { FinancialChart } from "./financial-chart";

export const FinancialContent = ({
  transactions,
  period,
}: {
  transactions: Transaction[];
  period: Period;
}) => {
  const categoryChartData = getCategoryTotals(
    transactions,
    period,
    "datetime",
    "transactionCategory.name",
    "price"
  );
  return (
    <Card className="px-5 grid md:grid-cols-2">
      <FinancialChart/>
      <CategoryBarChart data={categoryChartData} />
    </Card>
  );
};
