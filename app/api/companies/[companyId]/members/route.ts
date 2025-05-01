import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { currentManager } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const existingManager = await currentManager();

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

    const members = await db.member.findMany({
      where: {
        companyId,
        isDeleted: false,
      },
      select: {
        id: true,
        memberCode: true,
        role: true,
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            isTwoFactorEnabled: true,
          },
        },
        createdAt: true,
      },
    });

    if (members.length < 1) {
      return NextResponse.json(
        {
          error: "ไม่พบข้อมูลพนักงาน",
          description: "เริ่มต้นด้วยการสร้างบัญชีพนักงาน",
        }
      );
    }

    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      {
        error: "ไม่พบข้อมูลพนักงาน",
        description: "เริ่มต้นด้วยการสร้างบัญชีพนักงาน",
      },
      { status: 500 }
    );
  }
}
