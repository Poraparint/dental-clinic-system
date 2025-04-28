"use client";

import { CompanyRole } from "@prisma/client";
import { useEffect, useState } from "react";

interface Member {
  id: string;
  createdAt: Date;
  memberCode: string;
  role: CompanyRole;
  user: {
    name: string;
    email: string;
    phone: string;
    isTwoFactorEnabled: boolean;
  };
}

export const useMembers = (companyId: string) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`/api/companies/${companyId}/members`);

        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, [companyId]);

  return { members, isLoading };
};
