import { db } from "@/lib/db";
import { validateManager } from "@/lib/utils/validation/manager";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; transactionId: string }> }
) {
  const { companyId, transactionId } = await params;

  const accessToPatch = await validateManager(companyId);

  if (accessToPatch instanceof Response) {
    return accessToPatch;
  }

  try {
    await db.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        isDelete: true,
      },
    });
    return NextResponse.json(
      {
        success: "ลบข้อมูลรายการธุรกรรมเรียบร้อยแล้ว",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[TRANSACTION_SOFT_DELETE]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถลบข้อมูลรายการธุรกรรมได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
