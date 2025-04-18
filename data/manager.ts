import { db } from "@/lib/db";

export const getManagerByEmail = async (email: string) => {
  try {
    const manager = await db.user.findUnique({
      where: { email },
      include: {
        companies: true,
      },
    });
    if (manager?.role !== "MANAGER") {
      return null; // ไม่ใช่ Manager
    }

    return manager;
  } catch (error) {
    console.error(`Error fetching manager by email (${email}):`, error);
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
    if (manager?.role !== "MANAGER") {
      return null; // ไม่ใช่ Manager
    }
    return manager;
  } catch {
    return null;
  }
};
