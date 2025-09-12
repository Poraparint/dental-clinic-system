import { db } from "@/lib/db";
import { validateManager } from "@/lib/utils/validation/manager";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const { companyId } = await params;

  const accessToGet = await validateManager(companyId);

  if (accessToGet instanceof Response) {
    return accessToGet;
  }
  
  try {
    const patients = await db.patient.findMany({
      where: {
        companyId,
        isDeleted: true,
      },

      include: {
        creator: {
          select: {
            name: true,
          },
        },
        updater: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
       
    });

    if (patients.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลคนไข้",
        description: "เริ่มต้นด้วยการสร้างบัตรคนไข้แรก",
      });
    }

    return NextResponse.json({
      data: patients,
    });
  } catch (error) {
    console.error("[PATIENT_GET]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลคนไข้ได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}