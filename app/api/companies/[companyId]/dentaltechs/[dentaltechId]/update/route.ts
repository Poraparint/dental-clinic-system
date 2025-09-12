import { db } from "@/lib/db";
import { validateManagerAndTechnician } from "@/lib/utils/validation/member";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; dentaltechId: string }> }
) {
  const { companyId, dentaltechId } = await params;

  const accessToPatch = await validateManagerAndTechnician(companyId);

  if (accessToPatch instanceof Response) {
    return accessToPatch;
  }

  const { member } = accessToPatch;

  const { status } = await request.json();

  try {
    await db.dentaltech.update({
      where: {
        id_companyId: {
          id: dentaltechId,
          companyId: companyId,
        },
      },
      data: {
        status,
        updaterUserId: member.id,
      },
    });
    return NextResponse.json(
      {
        success: "อัปเดตสถานะเรียบร้อยแล้ว",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PATCH_DENTALTECH_STATUS]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถอัปเดตสถานะได้",
        description: "โปรดลองใหม่หรือแจ้งผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
