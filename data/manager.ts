import { db } from "@/lib/db";

export const getManagerByEmail = async (email: string) => {
  try {
    const manager = await db.user.findUnique({ where: { email } });

    return manager;
  } catch {
    return null;
  }
};

export const getManagerById = async (id: string) => {
  try {
    const manager = await db.user.findUnique({ where: { id } });
    return manager;
  } catch {
    return null;
  }
};


