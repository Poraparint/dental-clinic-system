"use client";

import { useEffect, useState } from "react";
import { Transaction, ApiError } from "@/types";
import { CreateTransactionSchema } from "@/schemas";
import * as z from "zod";

export const useTransaction = (companyId: string, patientId: string, refreshKey?: number) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/patients/${patientId}/transaction`
        );
        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setTransactions(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("[GET_TRANSACTION_PATIENT]", error);
        setError({
          error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          description: "โปรดลองใหม่อีกครั้ง",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [companyId, patientId, refreshKey]);

  return { transactions, error, isLoading };
};

export const createTransaction = async (
  values: z.infer<typeof CreateTransactionSchema>,
  companyId: string,
  patientId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/patients/${patientId}/transaction`,
      {
        method: "POST",
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
    console.error("[CREATE_TRANSACTION_PATIENT]", error);
    return {
      error: "ไม่สามารถสร้างรายการธุรกรรมได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};

export const useAllTransaction = (companyId: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/transactions`
        );
        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setTransactions(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("[GET_ALL_TRANSACTION]", error);
        setError({
          error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          description: "โปรดลองใหม่อีกครั้ง",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [companyId]);

  return { transactions, error, isLoading };
};

export const updateTransaction = async (
  values: Partial<z.infer<typeof CreateTransactionSchema>>,
  companyId: string,
  patientId: string,
  transactionId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/patients/${patientId}/transaction/${transactionId}/update`,
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
    console.error("[UPDATE_TRANSACTION]", error);
    return {
      error: "ไม่สามารถอัพเดตรายการธุรกรรมได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};