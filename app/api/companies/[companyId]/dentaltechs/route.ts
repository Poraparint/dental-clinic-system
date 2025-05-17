import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { currentAllStaffExceptAssistant } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const existingManager = await currentAllStaffExceptAssistant();

  if (!existingManager) {
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

    const dentalTech = await db.dentaltech.findMany({
      where: {
        companyId,
      },
      select: {
        id: true,
        deadline: true,
        detail: true,
        level: true,
        status: true,
        teeth: true,
        creator: {
          select: {
          name: true
        },
      },
        patient: {
          select: {
            name: true,
            phone: true,
          },
        },
        dentalTechCategory: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        deadline: "asc",
      },
    });

    if (dentalTech.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลงานทันตกรรม",
        description: "เริ่มต้นด้วยการสร้างรายการทันตกรรม",
      });
    }

    return NextResponse.json(
      dentalTech.map((item) => ({
        ...item,
        deadline: item.deadline
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
