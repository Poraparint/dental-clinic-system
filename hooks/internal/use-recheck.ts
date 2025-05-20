"use client";

import { useEffect, useState } from "react";
import { Recheck } from "@/types/appointment";
import { ApiError } from "@/types/api-error";
import { CreateRecheckSchema } from "@/schemas";
import * as z from "zod";

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
        console.error("[GET_RECHECKS]", error);
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

export const createRecheck = async (
  values: z.infer<typeof CreateRecheckSchema>,
  companyId: string
) => {
  try {
    const response = await fetch(`/api/companies/${companyId}/rechecks`, {
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
    console.error("[CREATE_RECHECK]", error);
    return {
      error: "ไม่สามารถสร้างรายการรีเช็ค / แบ่งจ่ายได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};
