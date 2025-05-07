import { db } from "@/lib/db";

export const getPatientByTransactionId = async (transactionId: string) => {
  const transaction = await db.transaction.findUnique({
    where: {
      id: transactionId,
    },
    select: {
      patient: true,
    }
  });
  return transaction;
};
