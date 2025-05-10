import { db } from "@/lib/db";

export const getRecheckByCompanyId = async (
  transactionId: string,
  companyId: string
) => {
  const transaction = await db.recheck.findUnique({
    where: {
      id: transactionId,
      companyId,
    },
  });
  return transaction;
};

export const getDentalTechByCompanyId = async (
  transactionId: string,
companyId: string
) => {
  const transaction = await db.dentaltech.findUnique({
    where: {
      id: transactionId,
      companyId
    },
  });
  return transaction;
}

