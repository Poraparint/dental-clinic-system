"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/types/api-error";
import * as z from "zod";
import { CreateCompanySchema } from "@/schemas";

interface Ministry {
  id: string;
  name: string;
  description: string;
}

export const useMinistry = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMinistry = async () => {
      try {
        const response = await fetch("/api/companies");

        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setMinistries(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("[GET_MINISTRY]", error);
        setError({
          error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          description: "โปรดลองใหม่อีกครั้ง",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchMinistry();
  }, []);

  return { ministries, error, isLoading };
};

export const createMinistry = async (
  values: z.infer<typeof CreateCompanySchema>
) => {
  try {
    const response = await fetch("/api/companies", {
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
    console.error("[CREATE_MINISTRY]", error);
    return {
      error: "ไม่สามารถสร้างบอร์ดได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
}
}
