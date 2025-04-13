import { db } from "@/lib/db";

export const getTwoFactorConfirmationByManagerId = async (managerId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { managerId },
    });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};

export const getTwoFactorConfirmationByMemberId = async (memberId: string) => {
  try {
    const twoFactorConfirmation = await db.memberTwoFactorConfirmation.findUnique({
      where:{memberId},
    })
    return twoFactorConfirmation;
  } catch {
    return null;
  }
}