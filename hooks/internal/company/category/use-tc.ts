"use client";

import { useEffect, useState } from "react";
import { TransactionCategoryWithManager, ApiError } from "@/types";
import { CreateTransactionCategorySchema } from "@/schemas";
import * as z from "zod";

export const useTransactionCategories = (companyId: string, refreshKey?: number) => {
  const [categories, setCategories] = useState<
    TransactionCategoryWithManager[]
  >([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/category/transaction`
        );

        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setCategories(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("[GET_TRANSACTION_CATEGORY]", error);
        setError({
          error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          description: "โปรดลองใหม่อีกครั้ง",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (companyId) {
      fetchCategories();
    }
  }, [companyId, refreshKey]);

  return { categories, error, isLoading };
};

export const createTransactionCategory = async (
  values: z.infer<typeof CreateTransactionCategorySchema>,
  companyId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/category/transaction`, {
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
    console.error("[CREATE_TRANSACTION_CATEGORY]", error);
    return {
      error: "ไม่สามารถสร้างหมวดหมู่ได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
   }
}

export const updateTransactionCategory = async (
  values: Partial<z.infer<typeof CreateTransactionCategorySchema>>,
  companyId: string,
  tcId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/category/transaction/${tcId}/update`,
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
    console.error("[UPDATE_TRANSACTION_CATEGORY]", error);
    return {
      error: "ไม่สามารถอัปเดตข้อมูลได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};