import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentManager } from "@/lib/auth";
import { CreateCompanySchema } from "@/schemas";

export async function GET() {
  try {
    const manager = await currentManager();

    if (!manager) {
        return NextResponse.json(
          { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" },
          { status: 403 }
        );
      }

    const companys = await db.company.findMany({
      where: {
        managerId: manager.id,
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (companys.length < 1) {
      return NextResponse.json({
        error: "ยินดีต้อนรับสู่แดชบอร์ด",
        description: "เริ่มต้นใช้งานด้วยการสร้างหน่วยงานแรก",
      });
    }

    return NextResponse.json(companys);
  } catch (error) {
    console.error("[GET_MINISTRY]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลบริษัทได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  const manager = await currentManager();

  if (!manager) {
    return NextResponse.json(
      { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" },
      { status: 403 }
    );
  }

  const values = await request.json();

  const validation = CreateCompanySchema.safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
        description: "โปรดตรวจสอบข้อมูลที่กรอก",
      },
      { status: 400 }
    );
  }

  const { name, description } = validation.data;

  try {
    await db.company.create({
      data: {
        name,
        description,
        managerId: manager.id,
      },
    });

    return NextResponse.json({
      success: "สร้างบอร์ดสำเร็จ"
    })
    
  } catch (error) {
    console.error("[POST_MINISTRY]", error)
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลบริษัทได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
