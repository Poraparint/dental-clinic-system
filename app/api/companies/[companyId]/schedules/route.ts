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
    const rechecks = await db.schedule.findMany({
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
    if (rechecks.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลรายการ",
        description: "เริ่มต้นด้วยการสร้างรายการรีเช็ค / แบ่งจ่าย",
      });
    }
    return NextResponse.json(rechecks);
  } catch (error) {
    console.error("Error fetching rechecks:", error);
    return NextResponse.json(
      {
        error: "ไม่พบข้อมูลรายการ",
        description: "เริ่มต้นด้วยการสร้างรายการรีเช็ค / แบ่งจ่าย",
      },
      { status: 500 }
    );
  }
}
