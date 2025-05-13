"use client";

import { useEffect, useState } from "react";
import { Expenses } from "@/types/expenses";
import { ApiError } from "@/types/api-error";

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
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
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
