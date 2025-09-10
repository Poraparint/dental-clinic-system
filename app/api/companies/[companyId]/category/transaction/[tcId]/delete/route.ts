import { db } from "@/lib/db";
import { validateManager } from "@/lib/utils/validation/manager";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; tcId: string }> }
) {
  const { companyId, tcId } = await params;

  const accessToPatch = await validateManager(companyId);

  if (accessToPatch instanceof Response) {
    return accessToPatch;
  }

  try {
    await db.transactionCategory.update({
      where: {
        id: tcId,
        companyId,
      },
      data: {
        isDeleted: true,
      },
    });
    return NextResponse.json(
      {
        success: "ลบข้อมูลหมวดหมู่เรียบร้อยแล้ว",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[TRANSACTION_CATEGORY_SOFT_DELETE]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถลบข้อมูลหมวดหมู่ได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
