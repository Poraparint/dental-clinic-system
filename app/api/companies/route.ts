import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentManager } from "@/lib/auth";

export async function GET() {
  try {
    const manager = await currentManager();

    const companys = await db.company.findMany({
      where: {
        managerId: manager.id,
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (companys.length < 1) {
      return NextResponse.json({
        error: "ยินดีต้อนรับสู่แดชบอร์ด",
        description: "เริ่มต้นใช้งานด้วยการสร้างหน่วยงานแรก",
      });
    }

    return NextResponse.json(companys);
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลบริษัทได้", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลบริษัทได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
