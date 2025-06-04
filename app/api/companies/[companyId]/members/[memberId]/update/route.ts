import { db } from "@/lib/db";
import { validateManager } from "@/lib/utils/validation/manager";
import { CompanyRole } from "@prisma/client";
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

  const { role } = await request.json();

  if (!Object.values(CompanyRole).includes(role)) {
    return NextResponse.json({ error: "ตำแหน่งไม่ถูกต้อง" }, { status: 400 });
  }

  if (role === CompanyRole.MANAGER) {
    return NextResponse.json(
      {
        error: "ไม่สามารถเพิ่มเป็นตำแหน่งนี้ได้",
        description: "สามารถเพิ่มเป็น COMANAGER แทนได้",
      },
      { status: 401 }
    );
  }

  try {
    await db.member.update({
      where: {
        id: memberId,
        companyId,
      },
      data: {
        role
      },
    });
    return NextResponse.json(
      {
        success: "อัปเดตตำแหน่งเรียบร้อยแล้ว",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PATCH_MEMBER_ROLE]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถอัปเดตตำแหน่งได้",
        description: "โปรดลองใหม่หรือแจ้งผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
