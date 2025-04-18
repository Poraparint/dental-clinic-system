import {
  getTwoFactorConfirmationByManagerId,
  getTwoFactorConfirmationByMemberId,
} from "@/data/two-factor-confirmation";
import { db } from "./db";

export const verifyTwoFactorConfirmation = async (
  userId: string,
  userType: "manager" | "member"
) => {
  const twoFactorConfirmation =
    userType === "manager"
      ? await getTwoFactorConfirmationByManagerId(userId)
      : await getTwoFactorConfirmationByMemberId(userId);

  if (!twoFactorConfirmation) {
    return false;
  }

  // ลบ twoFactorConfirmation หลังจากใช้งาน
  if (userType === "manager") {
    await db.twoFactorConfirmation.delete({
      where: {
        id: twoFactorConfirmation.id,
      },
    });
  } else {
    await db.memberTwoFactorConfirmation.delete({
      where: {
        id: twoFactorConfirmation.id,
      },
    });
  }

  return true;
};
