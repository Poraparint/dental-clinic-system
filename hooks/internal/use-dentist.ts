"use client";

import { useEffect, useState } from "react";

type Dentist = {
  id: string;
  user?: {
    name: string;
  };
  role: string;
};

export const useDentists = (companyId: string) => {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}/members/dentists`);

        const data = await response.json();
        setDentists(data);
      } catch (error) {
        console.error("Error fetching dentists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [companyId]);

  return { dentists, isLoading };
};
