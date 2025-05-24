"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

export const useExpensesOverview = (companyId: string, currentMonth:Date, refreshkey:number) => {
  const [expensesOverview, setExpensesOverview] = useState<{
    total: number;
    byCategory: { categoryId: string; total: number }[];
  }>({ total: 0, byCategory: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchExpensesOverview = async () => {
      try {
        const month = format(currentMonth, "yyyy-MM");
        const response = await fetch(
          `/api/companies/${companyId}/expenses/overview?month=${month}`
        );

        const data = await response.json();
        setExpensesOverview(data);
      } catch (error) {
        console.error("ไม่พบข้อมูล", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (companyId) {
      fetchExpensesOverview();
    }
  }, [companyId, currentMonth, refreshkey]);

  return { expensesOverview, isLoading };
};
