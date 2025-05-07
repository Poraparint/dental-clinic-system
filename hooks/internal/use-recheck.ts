"use client";

import { useEffect, useState } from "react";

interface Rechecks {
  id: string;
  patientId: string;
  createdAt: Date;
  recheckList: {
    datetime: Date;
    detail: string;
    price: number;
    transactionCategory: {
      name: string;
    }
  }[];
  patient: {
    name: string;
    phone: string;
  };
  transaction: {
    transactionCategory: {
      name: string;
    };
    detail: string;
    price: number;
    paid: number;
  };
  creator: {
    name: string;
  };
}

export const useRechecks = (companyId: string) => {
  const [rechecks, setRechecks] = useState<Rechecks[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRechecks = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}/rechecks`);

        const data = await response.json();
        setRechecks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching rechecks", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRechecks();
  }, [companyId]);
  return { rechecks, isLoading };
};
