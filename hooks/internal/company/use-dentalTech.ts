"use client";


import { useEffect, useState } from "react";
import { DentalTech } from "@/types/dentaltech";
import { ApiError } from "@/types/api-error";
import { CreateDentalTechSchema } from "@/schemas";
import * as z from "zod";

export const useDentalTechs = (companyId: string, refreshKey?: number) => {
  const [dentalTechs, setDentaltechs] = useState<DentalTech[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDentalTechs = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}/dentaltechs`);

        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data)
        } else {
          setDentaltechs(Array.isArray(data) ? data : []);
        }
        
      } catch (error) {
        console.error("[CREATE_DENTALTECH]", error);
        setError({
          error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          description: "โปรดลองใหม่อีกครั้ง",
        });
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchDentalTechs();
  }, [companyId, refreshKey]);

  return { dentalTechs, error, isLoading };
};


export const createDentalTech = async (
  values: z.infer<typeof CreateDentalTechSchema>,
  companyId: string
) => {
  try {
    const response = await fetch(`/api/companies/${companyId}/dentaltechs`, {
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
    console.error("[CREATE_DENTALTECH]", error);
    return {
      error: "ไม่สามารถสร้างรายการทันตกรรมได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};
