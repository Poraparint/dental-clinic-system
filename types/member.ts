import { CompanyRole } from "@prisma/client";

export type Member = {
    
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