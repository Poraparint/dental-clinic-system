import { getCategoryTotals, Period } from "@/lib/utils/stat/stat";
import { Transaction } from "@/types/transaction";
import { Expenses } from "@/types/expenses";
import { FinancialChart } from "./financial-chart";

export const FinancialContent = ({
  expenses,
  transactions,
  period,
}: {
  transactions: Transaction[];
  expenses: Expenses[];
  period: Period;
}) => {
  const categoryChartData = getCategoryTotals(
    transactions,
    period,
    "datetime",
    "transactionCategory.name",
    "price"
  );
  const ExpensesChartData = getCategoryTotals(
    expenses,
    period,
    "datetime",
    "expensesCategory.name",
    "amount"
  );
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <FinancialChart data={categoryChartData} />
      <FinancialChart data={ExpensesChartData} />
    </div>
  );
};
