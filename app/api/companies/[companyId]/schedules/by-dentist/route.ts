import { db } from "@/lib/db";
import { validateCurrentMember } from "@/lib/utils/validation/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const { companyId } = await params;

  const accessToGet = await validateCurrentMember(companyId);

  if (accessToGet instanceof Response) {
    return accessToGet;
  }
  try {
    const patients = await db.patient.findMany({
      where: {
        companyId,
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        phone: true,
      },
    });

    if (patients.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลคนไข้",
        description: "ไม่มีนัดหมายในวันนี้",
      });
    }

    return NextResponse.json(patients);
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลหมวดหมู่ได้", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลหมวดหมู่ได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
