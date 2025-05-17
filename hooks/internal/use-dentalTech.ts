"use client";


import { useEffect, useState } from "react";
import { DentalTech } from "@/types/dentaltech";
import { ApiError } from "@/types/api-error";

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
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
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
