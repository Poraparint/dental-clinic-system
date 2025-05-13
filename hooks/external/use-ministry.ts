"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/types/api-error";

interface Ministry {
  id: string;
  name: string;
  description: string;
}

export const useMinistry = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMinistry = async () => {
      try {
        const response = await fetch("/api/companies");

        const data = await response.json();
        if (!response.ok || data.error) {
          setError(data);
        } else {
          setMinistries(Array.isArray(data) ? data : []);
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
    fetchMinistry();
  }, []);

  return { ministries, error, isLoading };
};
