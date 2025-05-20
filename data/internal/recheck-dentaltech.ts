import { db } from "@/lib/db";

export const getRecheckByCompanyId = async (
  companyId: string,
  transactionId: string
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
  companyId: string,
  transactionId: string

) => {
  const transaction = await db.dentaltech.findUnique({
    where: {
      id: transactionId,
      companyId
    },
  });
  return transaction;
}

