"use client";

import { useEffect, useState } from "react";
import { ApiError, AddOnCategoryWithManager } from "@/types";
import { CreateAddOnCategorySchema } from "@/schemas";
import * as z from "zod";

export const useAddOnCategories = (companyId: string, refreshKey?: number) => {
  const [categories, setCategories] = useState<
    AddOnCategoryWithManager[]
  >([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/category/addon`
        );

        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setCategories(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("[GET_ADDON_CATEGORY]", error);
        setError({
          error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          description: "โปรดลองใหม่อีกครั้ง",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (companyId) {
      fetchCategories();
    }
  }, [companyId, refreshKey]);

  return { categories, error, isLoading };
};

export const createAddOnCategory = async (
  values: z.infer<typeof CreateAddOnCategorySchema>,
  companyId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/category/addon`, {
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
    console.error("[CREATE_ADDON_CATEGORY]", error);
    return {
      error: "ไม่สามารถสร้างหมวดหมู่ได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
   }
}

export const updateAddOnCategory = async (
  values: Partial<z.infer<typeof CreateAddOnCategorySchema>>,
  companyId: string,
  addonId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/category/addon/${addonId}/update`,
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
    console.error("[UPDATE_ADDON_CATEGORY]", error);
    return {
      error: "ไม่สามารถอัปเดตข้อมูลได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};