import { db } from "@/lib/db";

export const getTransactionName = async (name: string, companyId: string) => {
  const category = await db.transactionCategory.findUnique({
    where: {
      name_companyId: {
        name,
        companyId,
      },
    },
  });
  return category;
};

export const getDentalTechByName = async (name: string, companyId: string) => {
  const category = await db.dentalTechCategory.findUnique({
    where: {
      name_companyId: {
        name,
        companyId,
      },
    },
  });
  return category;
}
