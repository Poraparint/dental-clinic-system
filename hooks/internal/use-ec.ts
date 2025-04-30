"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: Date;
}
interface ApiError {
  error?: string;
  description?: string;
  url?: string;
  urlname?: string;
}

export const useExpensesCategories = (companyId: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/category/expenses`
        );

        const data = await response.json();
       if (!response.ok) {
         setError(data);
         setCategories([]); // clear categories
       } else {
         setCategories(data);
         setError(null);
       }
      } catch {
        setError({
          error: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (companyId) {
      fetchCategories();
    }
  }, [companyId]);

  return { categories, isLoading, error };
};
