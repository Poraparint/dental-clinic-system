import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const companyId = pathSegments[pathSegments.indexOf("companies") + 1];

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

    if (members.length === 0) {
      return NextResponse.json(
        {
          error: "ไม่พบข้อมูลพนักงาน",
          description: "เริ่มต้นด้วยการสร้างบัญชีพนักงาน",
          url: `/dashboard/${companyId}/create-patient`,
          urlname: "สร้างบัญชีพนักงาน",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      {
        error: "ไม่พบข้อมูลพนักงาน",
        description: "เริ่มต้นด้วยการสร้างบัญชีพนักงาน",
        url: `/dashboard/create-patient`,
        urlname: "สร้างบัญชีพนักงาน",
      },
      { status: 500 }
    );
  }
}
