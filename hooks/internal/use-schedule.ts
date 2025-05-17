"use client";

import { useEffect, useState } from "react";
import { Schedule } from "@/types/schedule";
import { ApiError } from "@/types/api-error";

export const useSchedules = (companyId: string, refreshkey?: number) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}/schedules`);

        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setSchedules(Array.isArray(data) ? data : []);
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

    fetchSchedules();
  }, [companyId, refreshkey]);

  return { schedules, error, isLoading };
};
