"use client";

import { useEffect, useState } from "react";
import { Member } from "@/types/member";
import { ApiError } from "@/types/api-error";
import { MemberRegisterSchema } from "@/schemas";
import * as z from "zod";

export const useMembers = (companyId: string) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}/members`);

        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setMembers(Array.isArray(data) ? data : []);
        }

      } catch (error) {
        console.error("GET_MEMBER_ACCOUNT", error);
        setError({
          error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          description: "โปรดลองใหม่อีกครั้ง",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [companyId]);

  return { members, error, isLoading };
};

export const createMembers = async (
  values: z.infer<typeof MemberRegisterSchema>,
  companyId: string
) => {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/members`, {
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
    console.error("[CREATE_MEMBER_ACCOUNT]", error);
    return {
      error: "ไม่สามารถสร้างบัญชีพนักงานได้",
      description: "โปรดติดต่อผู้ดูแลระบบ",
    };
   }
}
