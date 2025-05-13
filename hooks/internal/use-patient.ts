"use client";

import { useEffect, useState } from "react";
import { Patients } from "@/types/patient";
import { ApiError } from "@/types/api-error";

export const usePatients = (companyId: string) => {
  const [patients, setPatients] = useState<Patients[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}/patients`);

        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data)
        } else {
          setPatients(Array.isArray(data) ? data : []);
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

    fetchPatients();
  }, [companyId]);

  return { patients, error, isLoading };
};
