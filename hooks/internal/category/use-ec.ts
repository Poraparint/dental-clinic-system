"use client";

import { ApiError } from "@/types/api-error";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";

export const useExpensesCategories = (companyId: string, refreshKey?: number) => {
  const [categories, setCategories] = useState<Category[]>([]);
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
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
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
