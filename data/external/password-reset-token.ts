import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const paswordResetToken = db.passwordResetToken.findUnique({
      where: { token },
    });

    return paswordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const paswordResetToken = db.passwordResetToken.findFirst({
      where: { email },
    });

    return paswordResetToken;
  } catch {
    return null;
  }
};