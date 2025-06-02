"use client";

import { useEffect, useState } from "react";
import { ExpensesCategoryWithManager, ApiError } from "@/types";
import { CreateCommonCategorySchema } from "@/schemas";
import * as z from "zod";

export const useExpensesCategories = (companyId: string, refreshKey?: number) => {
  const [categories, setCategories] = useState<ExpensesCategoryWithManager[]>(
    []
  );
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/category/expenses`
        );
        const data = await response.json();
       if (!response.ok || data.error) {
         setError(data);
       } else {
         setCategories(Array.isArray(data) ? data : []);
       }
      } catch (error){
        console.error("[GET_EXPENSES_CATEGORY]", error);
        setError({
          error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          description: "โปรดลองใหม่อีกครั้ง",
        });
      } finally {
        setIsLoading(false);
      }
    };

      fetchCategories();
  }, [companyId, refreshKey]);

  return { categories, error, isLoading };
};

export const createExpensesCategory = async (
  values: z.infer<typeof CreateCommonCategorySchema>,
  companyId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/category/expenses`, {
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
    console.error("[CREATE_EXPENSES_CATEGORY]", error);
    return {
      error: "ไม่สามารถสร้างหมวดหมู่ได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
   }
}

export const updateExpensesCategory = async (
  values: Partial<z.infer<typeof CreateCommonCategorySchema>>,
  companyId: string,
  ecId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/category/expenses/${ecId}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error };
    }

    return { success: data.success };
  } catch (error) {
    console.error("[UPDATE_EXPENSES_CATEGORY]", error);
    return {
      error: "ไม่สามารถอัปเดตข้อมูลได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};