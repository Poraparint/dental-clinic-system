"use client";

import { useEffect, useState } from "react";
import { Patients } from "@/types/patient";

export const usePatients = (companyId: string) => {
  const [patients, setPatients] = useState<Patients[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}/patients`);

        const data = await response.json();
        setPatients(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching patients:", error);
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, [companyId]);

  return { patients, isLoading };
};
