"use client";

import { useEffect, useState } from "react";

interface Patient {
  id: string;
  name: string;
  phone: string;
  createdAt: Date;
  creator: {
    name: string;
  };
}



export const usePatients = (companyId: string) => {
  const [patients, setPatients] = useState<Patient[]>([]);
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
