"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction";
import { ApiError } from "@/types/api-error";

export const useTransaction = (companyId: string, patientId: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/patients/${patientId}/transaction`
        );
        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setTransactions(Array.isArray(data) ? data : []);
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

    fetchTransactions();
  }, [companyId, patientId]);

  return { transactions, error, isLoading };
};
