import { getDentistIdByScheduleId } from "@/data/internal/schedule";
import { db } from "@/lib/db";
import { validateManagerAndDentist } from "@/lib/utils/validation/member";
import { CompanyRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; scheduleId: string; }> }
) {
  const { companyId, scheduleId } = await params;

  const accessToPatch = await validateManagerAndDentist(companyId);

  if (accessToPatch instanceof Response) {
    return accessToPatch;
  }

  const { member } = accessToPatch;

  if (member.role === CompanyRole.DENTIST) {
    const dentist = await getDentistIdByScheduleId(companyId, scheduleId);

    if (!dentist) {
      return NextResponse.json(
        {
          error: "ไม่พบข้อมูลนัดหมาย",
          description: "ไม่สามารถตรวจสอบผู้สร้างได้",
        },
        { status: 404 }
      );
    }
    if (dentist.memberId !== member.id) {
      return NextResponse.json(
        {
          error: "คุณไม่มีสิทธิ์แก้ไขรายการนัดหมายนี้",
          description: "เฉพาะทันตแพทย์ผู้รับผิดชอบเท่านั้นที่สามารถแก้ไขได้",
        },
        { status: 403 }
      );
    }
  }

  try {
    await db.schedule.update({
      where: {
        id: scheduleId,
        companyId,
      },
      data: {
        isDeleted: true,
        updaterUserId: member.id,
      },
    });
    return NextResponse.json(
      {
        success: "ลบข้อมูลรายการนัดเรียบร้อยแล้ว",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[SCHEDULE_SOFT_DELETE]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถลบข้อมูลรายการนัดได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
