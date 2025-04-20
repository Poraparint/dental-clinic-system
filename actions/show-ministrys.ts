"use server";
import { currentManager } from "@/lib/auth";
import { db } from "@/lib/db";

export const ShowMinistrys = async () => {
  try {
    const existingManager = await currentManager();

    if (!existingManager) {
      return {
        data: [],
        error: "Manager not authenticated",
      };
    }

    const companys = await db.company.findMany({
      where: { managerId: existingManager.id },
    });

    if (companys.length === 0) {
      return {
        error: "ยินดีต้อนรับสู่แดชบอร์ด",
        description: "เริ่มต้นใช้งานด้วยการสร้างหน่วยงานแรก",
        url: "/dashboard/create-ministry",
        urlname: "Create Ministry",
      };
    }
    return companys;
  } catch (error) {
    console.error("Error in ShowCompanys:", error);
    return { error: "Failed to fetch ministries" };
  }
};
