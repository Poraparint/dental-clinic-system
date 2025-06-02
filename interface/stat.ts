import {
  CategoryChartItem,
  ComparisonResult,
  MonthlyComparisonItem,
  Period,
} from "@/lib/utils/stat/stat";
import {
  Recheck,
  RecheckList,
  Schedule,
  DentalTech,
  Expenses,
  Patients,
  Transaction,
} from "@/types";

export interface DashboardStatProps {
  patients: Patients[];
  dentalTechs: DentalTech[];
  period: Period;
  schedules: Schedule[];
  rechecks: Recheck[];
  recheckLists: RecheckList[];
}

export interface FinancialStatProps {
  transactions: Transaction[];
  expenses: Expenses[];
  period: Period;
}

export interface TopCategoryComparisonResult {
  name: string;
  value: number;
  compareLabel: string;
  percentChange: number;
}

export interface AllFinancialStats {
  revenue: ComparisonResult;
  profit: ComparisonResult;
  avgTransaction: ComparisonResult;
  topTransactionCategory: TopCategoryComparisonResult;
  totalExpenses: ComparisonResult;
  categoryChartData: CategoryChartItem[];
  expensesChartData: CategoryChartItem[];
  monthlyComparison: MonthlyComparisonItem[];
}
