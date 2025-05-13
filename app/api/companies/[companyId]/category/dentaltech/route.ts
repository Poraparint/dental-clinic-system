import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { currentManagerAndTechnician } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const existingManager = await currentManagerAndTechnician();

  if (!existingManager) {
    return NextResponse.json({
      status: 403,
    });
  }
  const { companyId } = await params;

  if (!companyId) {
    return NextResponse.json(
      {
        error: "ไม่พบ id บริษัท",
        description: "URL ไม่ถูกต้อง",
      },
      { status: 400 }
    );
  }

  try {
    if (!companyId) {
      return NextResponse.json({
        status: 404,
      });
    }
    const categorys = await db.dentalTechCategory.findMany({
      where: {
        companyId,
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        creator: {
          select: {
            name: true,
          },
        },
      },
    });

    if (categorys.length < 1) {
      return NextResponse.json(
        {
          error: "ไม่พบข้อมูลหมวดหมู่",
          description: "ไม่พบข้อมูลหมวดหมู่",
        }
      );
    }

    return NextResponse.json(categorys);
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
