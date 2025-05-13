"use client";

import { useEffect, useState } from "react";
import { Member } from "@/types/member";
import { ApiError } from "@/types/api-error";

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
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
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
