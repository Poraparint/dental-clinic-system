"use client";

import { useEffect, useState } from "react";
import { Patients, ApiError } from "@/types";
import { CreatePatientSchema } from "@/schemas";
import * as z from "zod";

export const useAllPatients = (companyId: string, refreshKey?: number) => {
  const [patients, setPatients] = useState<Patients[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/companies/${companyId}/patients`);
        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setPatients(Array.isArray(data) ? data : data.data || []);
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
  }, [companyId, refreshKey]);

  return { patients, error, isLoading };
};

export const useDeletedPatients = (companyId: string, refreshKey?: number) => {
  const [patients, setPatients] = useState<Patients[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/companies/${companyId}/patients/isDeleted`);
        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setPatients(Array.isArray(data) ? data : data.data || []);
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
  }, [companyId, refreshKey]);

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

export const softRecoveryPatient = async (
  companyId: string,
  patientId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/patients/${patientId}/recovery`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDeleted: false }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error };
    }

    return { success: data.success };
  } catch (error) {
    console.error("[RECOVERY_PATIENT]", error);
    return {
      error: "ไม่สามารถกู้คืนข้อมูลคนไข้ได้",
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
