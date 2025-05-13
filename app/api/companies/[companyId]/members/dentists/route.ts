import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { currentAllStaffExceptTechnician } from "@/lib/auth";
import { CompanyRole } from "@prisma/client";

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
    const dentists = await db.member.findMany({
      where: {
        companyId,
        role: CompanyRole.DENTIST,
        isDeleted: false,
      },
      select: {
        id: true,
        role: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (dentists.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลทันตแพทย์",
        description: "ติดต่อผู้ดูแลระบบ",
      });
    }

    return NextResponse.json(dentists);
  } catch (error) {
    console.error("Error fetching dentist:", error);
    return NextResponse.json(
      {
        error: "ไม่พบข้อมูลทันตแพทย์",
        description: "ติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
