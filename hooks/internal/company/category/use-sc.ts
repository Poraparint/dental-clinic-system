"use client";

import { useEffect, useState } from "react";
import { ScheduleCategoryWithManager, ApiError } from "@/types";
import { CreateCommonCategorySchema } from "@/schemas";
import * as z from "zod";

//GET
export const useScheduleCategories = (companyId: string) => {
  const [categories, setCategories] = useState<ScheduleCategoryWithManager[]>(
    []
  );
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/category/schedule`
        );

        const data = await response.json();
       if (!response.ok || data.error) {
         setError(data);
       } else {
         setCategories(Array.isArray(data) ? data : []);
       }
      } catch (error) {
        console.error("[GET_SCHEDULE_CATEGORY]", error);
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
  }, [companyId]);

  return { categories, error, isLoading };
};

//CREATE
export const createScheduleCategory = async (
  values: z.infer<typeof CreateCommonCategorySchema>,
  companyId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/category/schedule`, {
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
    console.error("[CREATE_SCHEDULE_CATEGORY]", error);
    return {
      error: "ไม่สามารถสร้างหมวดหมู่ได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
   }
}

//UPDATE
export const onReorderScheduleCategory = async (
  companyId: string,
  orderedIds: string[]
) => {
  try {
    const response = await fetch(`/api/companies/${companyId}/category/schedule/reorder`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderedIds }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.error) {
      return { error: data.error || "เกิดข้อผิดพลาดไม่สามารถอัปเดตข้อมูลได้" };
    }

    return { success: data.success }
  } catch (error) {
    console.error("[UPDATE_SCHEDULE_CATEGORY]", error);
    return {
      error: "ไม่สามารถอัปเดตข้อมูลได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
  }
};
