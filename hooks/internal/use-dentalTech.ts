"use client";


import { useEffect, useState } from "react";
import { DentalTech } from "@/types/dentaltech";

interface ApiError {
  error?: string;
  description?: string;
}

export const useDentalTechs = (companyId: string) => {
  const [dentalTechs, setMembers] = useState<DentalTech[] | ApiError>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDentalTechs = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}/dentaltechs`);

        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching techs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDentalTechs();
  }, [companyId]);

  return { dentalTechs, isLoading };
};
