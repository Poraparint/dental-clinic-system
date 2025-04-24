import { db } from "@/lib/db";

export const getManagerById = async (id: string) => {
  try {
    const manager = await db.manager.findUnique({
      where: { id },
      include: {
        companies: true,
      },
    });
    
    return manager;
  } catch {
    return null;
  }
};
