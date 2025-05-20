import { db } from "@/lib/db";
import { validateManager } from "@/lib/utils/validation/manager";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const { companyId } = await params;
  const accessToPatch = await validateManager(companyId);

  if (accessToPatch instanceof NextResponse) {
    return accessToPatch;
  }

  const values = await request.json();
  const { orderedIds }: { orderedIds: string[] } = values;

  if (!Array.isArray(orderedIds)) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
        description: "โปรดตรวจสอบข้อมูลที่ส่งมา",
      },
      { status: 400 }
    );
  }

  try {
    const updateCategories = orderedIds.map((id, index) =>
      db.scheduleCategory.update({
        where: { id, companyId },
        data: { order: index },
      })
    );

    await Promise.all(updateCategories);

    return NextResponse.json({
      success: "อัปเดตข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("[SCHEDULE_CATEGORY_REORDER]", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดขณะการอัปเดตข้อมูล",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
