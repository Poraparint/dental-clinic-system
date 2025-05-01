"use client";

import { useEffect, useState } from "react";

interface Ministry {
  id: string;
  name: string;
  description: string;
}

interface ApiError {
  error?: string;
  description?: string;
}

export const useMinistry = () => {
  const [ministries, setMinistries] = useState<Ministry[] | ApiError>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMinistry = async () => {
      try {
        const response = await fetch("/api/companies");

        const data = await response.json();
        setMinistries(data);
      } catch (error) {
        console.error("ไม่พบข้อมูลบริษัท", error);
      } finally {
        setIsLoading(false);
      }
    };
      fetchMinistry();
  }, []);

  return { ministries, isLoading };
};
