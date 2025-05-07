import { db } from "@/lib/db";

export const getRecheckByCompanyId = async (
  transactionId: string,
  companyId: string
) => {
  const patient = await db.recheck.findUnique({
    where: {
      id: transactionId,
      companyId,
    },
  });
  return patient;
};

