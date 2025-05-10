"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@/types/transaction";

export const useTransaction = (companyId: string, patientId: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/patients/${patientId}/transaction`
        );

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [companyId, patientId]);

  return { transactions, isLoading };
};
