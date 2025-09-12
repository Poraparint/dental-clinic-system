import { db } from "@/lib/db";
import { validateManager } from "@/lib/utils/validation/manager";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; patientId: string }> }
) {
  const { companyId, patientId } = await params;

  const accessToPatch = await validateManager(companyId);

  if (accessToPatch instanceof Response) {
    return accessToPatch;
  }

  try {
    await db.patient.update({
      where: {
        id: patientId,
        companyId,
      },
      data: {
        isDeleted: false
      },
    });
    return NextResponse.json(
      {
        success: "กู้คืนข้อมูลคนไข้เรียบร้อยแล้ว",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PATIENT_SOFT_RECOVERY]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถกู้คืนข้อมูลคนไข้ได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
