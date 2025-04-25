"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
}



export const useTransactionCategories = (companyId: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/category/transaction`
        );

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("ไม่พบข้อมูลหมวดหมู่", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (companyId) {
      fetchCategories();
    }
  }, [companyId]);

  return { categories, isLoading };
};
