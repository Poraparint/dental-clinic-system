import { db } from "@/lib/db";

export const getCompanyByManagerId = async (companyId: string ,managerId: string) => {
  try {
    const company = await db.company.findUnique({
      where: {
        id: companyId,
        managerId
      },
    });

    if (!company) {
      console.error("No company found")
      return null;
    }
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
    if (!company) {
      console.warn(`No company found with ID: ${companyId}`);
      return null;
    }

    return company;
  } catch (error) {
    console.error(`Error fetching company by ID (${companyId}):`, error)
    return null;
  }
}
