import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { CreateCommonCategorySchema } from "@/schemas";
import { getScheduleCategoryName } from "@/data/internal/category";
import { validateManager } from "@/lib/utils/validation/manager";
import { validateAllExceptTechnician } from "@/lib/utils/validation/member";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const { companyId } = await params;

  const accessToGet = await validateAllExceptTechnician(companyId);

  if (accessToGet instanceof NextResponse) {
    return accessToGet;
  }

  try {
    const categorys = await db.scheduleCategory.findMany({
      where: {
        companyId,
        isDeleted: false,
      },
      orderBy: {
        order: "asc",
      },
    });

    if (categorys.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลหมวดหมู่",
        description: "เริ่มต้นด้วยการสร้างหมวดหมู่รายการนัด",
      });
    }

    return NextResponse.json(categorys);
  } catch (error) {
    console.error("[SCHEDULE_CATEGORY_GET]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลหมวดหมู่ได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const values = await request.json();

  const { companyId } = await params;

  const accessToPost = await validateManager(companyId);

  if (accessToPost instanceof NextResponse) {
    return accessToPost;
  }

  const { manager } = accessToPost;

  const validation = CreateCommonCategorySchema.safeParse(values);
  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
        description: "โปรดตรวจสอบข้อมูลที่กรอก",
      },
      { status: 400 }
    );
  }

  const { name } = validation.data;

  const existingCategory = await getScheduleCategoryName(name, companyId);

  if (existingCategory) {
    return NextResponse.json({ error: "ชื่อนี้ถูกใช้ไปแล้ว" }, { status: 409 });
  }

  try {
    const lastCategory = await db.scheduleCategory.findFirst({
      where: {
        companyId,
        isDeleted: false,
      },
      orderBy: {
        order: "desc",
      },
    });

    const newOrder = lastCategory ? lastCategory.order + 1 : 1;

    const categories = await db.scheduleCategory.create({
      data: {
        name,
        companyId,
        managerId: manager.id,
        order: newOrder,
      },
    });

    return NextResponse.json(
      {
        success: "เพิ่มหมวดหมู่เวลานัดสำเร็จ",
        categories,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[SCHEDULE_CATEGORY_POST]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถสร้างหมวดหมู่ได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
