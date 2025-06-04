import { db } from "@/lib/db";
import { validateManagerAndComanager } from "@/lib/utils/validation/member";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; patientId: string }> }
) {
  const { companyId, patientId } = await params;

  const accessToPatch = await validateManagerAndComanager(companyId);

  if (accessToPatch instanceof Response) {
    return accessToPatch;
  }

  const { member } = accessToPatch;

  try {
    await db.patient.update({
      where: {
        id: patientId,
        companyId,
      },
      data: {
        isDeleted: true,
        updaterUserId: member.id,
      },
    });
    return NextResponse.json(
      {
        success: "ลบข้อมูลคนไข้เรียบร้อยแล้ว",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PATIENT_SOFT_DELETE]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถลบข้อมูลคนไข้ได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
