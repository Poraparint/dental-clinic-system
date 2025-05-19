"use client";

import { useEffect, useState } from "react";
import { Recheck } from "@/types/appointment";
import { ApiError } from "@/types/api-error";

export const useRechecks = (companyId: string, refreshKey?: number) => {
  const [rechecks, setRechecks] = useState<Recheck[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRechecks = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}/rechecks`);

        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setRechecks(Array.isArray(data) ? data : []);
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
    fetchRechecks();
  }, [companyId, refreshKey]);
  return { rechecks, error, isLoading };
};
