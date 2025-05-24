"use client";

import { useEffect, useState } from "react";
import { Patients } from "@/types/patient";
import { ApiError } from "@/types/api-error";
import { CreatePatientSchema } from "@/schemas";
import * as z from "zod";

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
          setError(data);
        } else {
          setPatients(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("[GET_PATIENT]", error);
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


export const createPatient = async (
  values: z.infer<typeof CreatePatientSchema>,
  companyId: string
) => {
  try {
    const response = await fetch(`/api/companies/${companyId}/patients`, {
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
    console.error("[CREATE_PATIENT]", error);
    return {
      error: "ไม่สามารถสร้างบัตรใหม่ได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};
