"use client";

import { useEffect, useState } from "react";

interface Expense {
  id: string;
  datetime: string;
  name: string;
  expensesCategory: {
    id: string;
    name: string;
    color: string;
  }
  payment: string;
  amount: number;
}



export const useExpenses = (companyId: string, month?: string) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const url = `/api/companies/${companyId}/expenses${
          month ? `?month=${month}` : ""
        }`;
        const response = await fetch(url);

        const json = await response.json();
        if (Array.isArray(json.data)) {
          setExpenses(json.data);
        } else {
          setExpenses([]);
        }

      } catch (error) {
        console.error("ไม่พบข้อมูล", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (companyId) {
      fetchExpenses();
    }
  }, [companyId, month]);

  return { expenses, isLoading };
};
