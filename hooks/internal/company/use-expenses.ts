"use client";

import { useEffect, useState } from "react";
import { Expenses } from "@/types/expenses";
import { ApiError } from "@/types/api-error";
import { CreateExpensesSchema } from "@/schemas";
import * as z from "zod";

export const useExpenses = (companyId: string, month?: string) => {
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const url = `/api/companies/${companyId}/expenses${
          month ? `?month=${month}` : ""
        }`;
        const response = await fetch(url);

        const json = await response.json();
        if (!response.ok || json.error) {
          setError(json)
        } else {
          setExpenses(Array.isArray(json.data) ? json.data : []);
        }

      } catch (error) {
        console.error("[GET_EXPENSES]", error);
        setError({
          error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          description: "โปรดลองใหม่อีกครั้ง",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (companyId) {
      fetchExpenses();
    }
  }, [companyId, month]);

  return { expenses, error, isLoading };
};

export const createExpenses = async (
  values: z.infer<typeof CreateExpensesSchema>,
  companyId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
    );

    const data = await response.json();
    if (!response.ok) {
      return { error: data.error};
    }

    return { success: data.success };
  } catch (error) { 
    console.error("[CREATE_EXPENSES]", error);
    return {
      error: "ไม่สามารถสร้างรายการได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
   }
}
