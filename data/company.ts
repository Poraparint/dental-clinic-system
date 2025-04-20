import { db } from "@/lib/db";

export const getCompanyByManagerId = async (companyId: string ,managerId: string) => {
  try {
    const company = await db.company.findUnique({
      where: {
        id: companyId,
        managerId
      },
    });
    return company;
  } catch {
    return null;
  }
};

export const getCompanyById = async (companyId: string) => {
  try {
    const company = await db.company.findUnique({
      where: {
        id: companyId,
      }
    });
  
    return company;
  } catch  {
    
    return null;
  }
}
