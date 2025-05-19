import { currentAllStaffExceptTechnician } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const existingUser = await currentAllStaffExceptTechnician();

  if (!existingUser) {
    return NextResponse.json({
      status: 403,
    });
  }

  const { companyId } = await params;

  if (!companyId) {
    return NextResponse.json(
      {
        error: "ไม่พบ companyId",
        description: "URL ไม่ถูกต้อง",
      },
      { status: 400 }
    );
  }

  try {
    const schedules = await db.schedule.findMany({
      where: { companyId },
      select: {
        id: true,
        datetime: true,
        patientName: true,
        phone: true,
        detail: true,
        transactionCategory: {
          select: {
            name: true,
          },
        },
        scheduleCategory: {
          select: {
            name: true,
            order: true,
          },
        },
        creator: {
          select: {
            name: true,
          },
        },
        dentist: {
          select: {
            name: true,
          },
        },
      },
      
    });
    if (schedules.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลรายการ",
        description: "เริ่มต้นด้วยการสร้างรายการนัดหมายในวันนี้",
      });
    }
    return NextResponse.json(
      schedules.map((item) => ({
        ...item,
        datetime: item.datetime
      }))
    );
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลงานทันตกรรมได้", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลงานทันตกรรมได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
