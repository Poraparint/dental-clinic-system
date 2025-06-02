import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { validateManager } from "@/lib/utils/validation/manager";
import { CreateCommonCategorySchema } from "@/schemas";
import { getExpensesCategoryName } from "@/data/internal/category";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const { companyId } = await params;

  const accessToGet = await validateManager(companyId);

  if (accessToGet instanceof NextResponse) {
    return accessToGet;
  }
  try {
    const categorys = await db.expensesCategory.findMany({
      where: {
        companyId,
        isDeleted: false,
      },
    });

    if (categorys.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลหมวดหมู่",
        description: "เริ่มต้นด้วยการสร้างหมวดหมู่รายจ่าย",
      });
    }

    return NextResponse.json(categorys);
  } catch (error) {
    console.error("[EXPENSES_CATEGORY_GET]", error);
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

  if (accessToPost instanceof Response) {
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

  const { name, description, color } = validation.data;

  const existingCategory = await getExpensesCategoryName(name, companyId);

  if (existingCategory) {
    return NextResponse.json({ error: "ชื่อนี้ถูกใช้ไปแล้ว" }, { status: 409 });
  }

  try {
    const categories = await db.expensesCategory.create({
      data: {
        name,
        description,
        color,
        companyId,
        managerId: manager.id,
      },
    });

    return NextResponse.json(
      {
        success: "เพิ่มหมวดหมู่รายการรายจ่ายสำเร็จ",
        categories,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[EXPENSES_CATEGORY_POST]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถสร้างหมวดหมู่ได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
