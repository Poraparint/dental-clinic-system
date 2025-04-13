import { db } from "@/lib/db";

export const getCompanyByManagerId = async (managerId: string) => {
  try {
    const manager = await db.company.findUnique({
      where: { managerId },
    });
    return manager;
  } catch {
    return null;
  }
};
