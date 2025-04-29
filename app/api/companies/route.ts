import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentManager } from "@/lib/auth";

export async function GET() {
  try {
    const manager = await currentManager();

    const companys = await db.company.findMany({
      where: {
        managerId: manager.id,
      },
    });

    if (companys.length < 1) {
      return NextResponse.json(
        {
          error: "ยินดีต้อนรับสู่แดชบอร์ด",
          description: "เริ่มต้นใช้งานด้วยการสร้างหน่วยงานแรก",
          url: "/dashboard/create-ministry",
          urlname: "Create Ministry",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(companys);
  } catch (error) {
    console.error("Error fetching ministrys:", error);
    return NextResponse.json(
      { error: "Failed to fetch ministries" },
      { status: 500 }
    );
  }
}
