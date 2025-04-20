import { db } from "@/lib/db";

export const getManagerByEmail = async (email: string) => {
  try {
    const manager = await db.user.findUnique({
      where: { email },
      include: {
        companies: true,
      },
    });
    return manager;
  } catch {
    return null;
  }
};

export const getManagerById = async (id: string) => {
  try {
    const manager = await db.user.findUnique({
      where: { id },
      include: {
        companies: true,
        accounts: true,
      },
    });
    
    return manager;
  } catch {
    return null;
  }
};
