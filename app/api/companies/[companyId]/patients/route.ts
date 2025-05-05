import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { currentAllStaffExceptTechnician } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const existingManager = await currentAllStaffExceptTechnician();

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
    const patients = await db.patient.findMany({
      where: {
        companyId,
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        createdAt: true,
        cd: true,
        drug: true,
        creator: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (patients.length < 1) {
      return NextResponse.json(
        {
          error: "ไม่พบข้อมูลคนไข้",
          description: "เริ่มต้นด้วยการสร้างบัตรคนไข้แรก",
        }
      );
    }

    return NextResponse.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      {
        error: "ไม่พบข้อมูลคนไข้",
        description: "เริ่มต้นด้วยการสร้างบัตรคนไข้แรก",
      },
      { status: 500 }
    );
  }
}
