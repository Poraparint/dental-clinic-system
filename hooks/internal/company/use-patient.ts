"use client";

import { useEffect, useState } from "react";
import { Patients, ApiError } from "@/types";
import { CreatePatientSchema } from "@/schemas";
import * as z from "zod";

interface UsePatientsOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  refreshKey?: number;
}

export const useAllPatients = (companyId: string, options?: UsePatientsOptions) => {
  const [patients, setPatients] = useState<Patients[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const { page, pageSize, search, refreshKey } = options || {};

  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if (page) params.append("page", page.toString());
      if (pageSize) params.append("pageSize", pageSize.toString());
      if (search) params.append("search", search);

      const query = params.toString();
      const url = `/api/companies/${companyId}/patients${query ? `?${query}` : ""}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setPatients(Array.isArray(data) ? data : data.data || []);
          setTotal(data.total || null);
          setTotalPages(data.totalPages || null);
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
  }, [companyId, page, pageSize, search, refreshKey]);

  return { patients, total, totalPages, error, isLoading };
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

export const updatePatient = async (
  values: Partial<z.infer<typeof CreatePatientSchema>>,
  companyId: string,
  patientId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/patients/${patientId}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error };
    }

    return { success: data.success };
  } catch (error) {
    console.error("[UPDATE_PATIENT]", error);
    return {
      error: "ไม่สามารถอัปเดตข้อมูลคนไข้ได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};

export const softDeletePatient = async (
  companyId: string,
  patientId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/patients/${patientId}/delete`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDeleted: true }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error };
    }

    return { success: data.success };
  } catch (error) {
    console.error("[DELETE_PATIENT]", error);
    return {
      error: "ไม่สามารถลบข้อมูลคนไข้ได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};


export const usePatient = (
  companyId: string,
  patientId: string,
  refreshKey?: number
) => {
  const [patient, setPatient] = useState<Patients>();
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/patients/${patientId}`
        );

        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setPatient(data);
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

    fetchPatient();
  }, [companyId, patientId, refreshKey]);

  return { patient, error, isLoading };
};
