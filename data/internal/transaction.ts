import { db } from "@/lib/db";

export const getPatientByTransactionId = async (transactionId: string) => {
  const transaction = await db.transaction.findUnique({
    where: {
      id: transactionId,
    },
    select: {
      patientId: true,
    }
  });
  return transaction;
};

export const getCreatorIdByTransactionId = async (
  patientId: string,
  transactionId: string
) => {
  const transaction = await db.transaction.findFirst({
    where: {
      id: transactionId,
      patientId,
    },
    select: {
      creatorUserId: true,
    },
  });
  return transaction;
};
