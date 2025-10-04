"use client";

import { useEffect, useState } from "react";
import { ApiError, Expenses } from "@/types";
import { z } from "zod";
import { CreateExpensesSchema } from "@/schemas";

export const useExpenses = (companyId: string, refreshKey?: number) => {
  const [allExpenses, setAllExpenses] = useState<Expenses[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/companies/${companyId}/expenses`);
        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setAllExpenses(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("GET_MEMBER_ACCOUNT", error);
        setError({
          error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          description: "โปรดลองใหม่อีกครั้ง",
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (companyId) fetchExpenses();
  }, [companyId, refreshKey]);

  const getExpensesByMonth = (year: number, month: number) => {
    const filtered = allExpenses.filter((e) => {
      const d = new Date(e.datetime);
      return d.getFullYear() === year && d.getMonth() === month;
    });

    const total = filtered.reduce((sum, e) => sum + Number(e.amount), 0);
    const byCategory = filtered.reduce((acc: Record<string, number>, e) => {
      acc[e.expensesCategory.id] =
        (acc[e.expensesCategory.id] || 0) + Number(e.amount);
      return acc;
    }, {});
    return {
      expenses: filtered,
      overview: {
        total,
        byCategory: Object.entries(byCategory).map(([categoryId, total]) => ({
          categoryId,
          total,
        })),
      },
    };
  };

  return { allExpenses, getExpensesByMonth, isLoading, error };
};

export const createExpenses = async (
  values: z.infer<typeof CreateExpensesSchema>,
  companyId: string
) => {
  try {
    const response = await fetch(`/api/companies/${companyId}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data.error };
    }

    return { success: data.success };
  } catch (error) {
    console.error("[CREATE_EXPENSES]", error);
    return {
      error: "ไม่สามารถสร้างรายการรายจ่ายได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};
