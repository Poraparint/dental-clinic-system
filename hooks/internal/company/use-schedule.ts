"use client";

import { useEffect, useState } from "react";
import { Schedule, ApiError } from "@/types";
import { CreateScheduleSchema } from "@/schemas";
import * as z from "zod";

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
        console.error("[GET_SCHEDULE]", error);
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

export const createSchedule = async (
  values: z.infer<typeof CreateScheduleSchema>,
  companyId: string
) => {
  try {
    const response = await fetch(`/api/companies/${companyId}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data.error };
    }

    return { success: data.success };
  } catch (error) {
    console.error("[CREATE_SCHEDULE]", error);
    return {
      error: "ไม่สามารถสร้างรายการนัดได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};
