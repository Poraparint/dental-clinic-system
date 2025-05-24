"use client";
import { useMemo } from "react";
import { FinancialStatProps, DashboardStatProps } from "@/interface/stat";
import {
  calculateAverageComparison,
  calculateCountComparison,
  calculateProfitComparison,
  calculateRevenueComparison,
  getTopCategoryComparison,
} from "@/lib/utils/stat/stat";
import { useCombinedAppointments } from "@/hooks/internal/filter/use-combined-apm";
import { useFilteredAppointments } from "@/hooks/internal/filter/use-filtered-apm";

export const useFinancialStats = ({
  transactions,
  expenses,
  period,
}: FinancialStatProps) => {
  const stats = useMemo(() => {
    const revenue = calculateRevenueComparison(
      transactions,
      period,
      "datetime",
      "paid"
    );

    const profit = calculateProfitComparison(
      transactions,
      expenses,
      period,
      "datetime",
      "paid",
      "datetime",
      "amount"
    );

    const avgTransaction = calculateAverageComparison(
      transactions,
      period,
      "datetime",
      "price"
    );

    const topTransactionCategory = getTopCategoryComparison(
      transactions,
      period,
      "datetime",
      "transactionCategory.name",
      "price"
    );

    const totalExpenses = calculateRevenueComparison(
      expenses,
      period,
      "datetime",
      "amount"
    );

    return {
      revenue,
      profit,
      avgTransaction,
      topTransactionCategory,
      totalExpenses,
    };

   
  }, [transactions, expenses, period]);

  return {
    ...stats,
  };
};

export const useDashboardStats = ({
  patients,
  period,
  dentalTechs,
  schedules,
  rechecks,
  recheckLists,
}: DashboardStatProps) => {

  const { combinedEvents } = useCombinedAppointments({ schedules, rechecks });
  const todayAppointments = useFilteredAppointments(combinedEvents, new Date());
  const stats = useMemo(() => {
    const patientCount = calculateCountComparison(
      patients,
      period,
      "createdAt"
    );

    const overdueDentaltech = calculateCountComparison(
      dentalTechs,
      period,
      "deadline"
    );

    const recheckListCount = calculateCountComparison(
      recheckLists,
      period,
      "datetime"
    );

    return {
      patientCount,
      overdueDentaltech,
      recheckListCount,
      
    };
  }, [patients, period, dentalTechs, recheckLists]);

  return {
    todayAppointments,
    ...stats,
  };
};

