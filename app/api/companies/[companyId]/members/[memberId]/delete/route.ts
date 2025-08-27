import { db } from "@/lib/db";
import { validateManager } from "@/lib/utils/validation/manager";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
    { params }: { params: Promise<{ companyId: string; memberId: string }> }
) {
  const { companyId, memberId } = await params;

  const accessToPatch = await validateManager(companyId);

  if (accessToPatch instanceof Response) {
    return accessToPatch;
  }

  try {
    await db.member.update({
      where: {
        id: memberId,
        companyId,
      },
      data: {
        isDeleted: true,
      },
    });
    return NextResponse.json(
      {
        success: "ลบข้อมูลสมาชิกเรียบร้อยแล้ว",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[MEMBER_SOFT_DELETE]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถลบข้อมูลสมาชิกได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
