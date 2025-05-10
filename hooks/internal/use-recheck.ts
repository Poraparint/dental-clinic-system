"use client";

import { useEffect, useState } from "react";
import { Recheck } from "@/types/recheck";

export const useRechecks = (companyId: string) => {
  const [rechecks, setRechecks] = useState<Recheck[]>([]);
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
