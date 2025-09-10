"use client";

import { useEffect, useState } from "react";
import { DentalTechCategoryWithCreator, ApiError } from "@/types";
import { CreateCommonCategorySchema } from "@/schemas";
import * as z from "zod";


export const useDentaltTechCategories = (companyId: string, refreshKey?: number) => {
  const [categories, setCategories] = useState<DentalTechCategoryWithCreator[]>(
    []
  );
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/category/dentaltech`
        );

        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setCategories(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("GET_DENTALTECH_CATEGORY", error);
        setError({
          error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          description: "โปรดลองใหม่อีกครั้ง",
        });
      } finally {
        setIsLoading(false);
      }
    };
      fetchCategories();
  }, [companyId, refreshKey]);

  return { categories, error, isLoading };
};

export const createDentalTechCategory = async (
  values: z.infer<typeof CreateCommonCategorySchema>,
  companyId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/category/dentaltech`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
    );

    const data = await response.json();
    if (!response.ok) {
      return { error: data.error};
    }

    return { success: data.success };
  } catch (error) { 
    console.error("[CREATE_DENTALTECH_CATEGORY]", error);
    return {
      error: "ไม่สามารถสร้างหมวดหมู่ได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
   }
}

export const updateDentalTechCategory = async (
  values: Partial<z.infer<typeof CreateCommonCategorySchema>>,
  companyId: string,
  dcId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/category/dentaltech/${dcId}/update`,
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
    console.error("[UPDATE_DENTALTECH_CATEGORY]", error);
    return {
      error: "ไม่สามารถอัปเดตข้อมูลได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};

export const SoftDeleteDentalTechCategory = async (
  companyId: string,
  dcId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/category/dentaltech/${dcId}/delete`,
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
    console.error("[DELETE_DENTALTECH_CATEGORY]", error);
    return {
      error: "ไม่สามารถลบข้อมูลหมวดหมู่ได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};