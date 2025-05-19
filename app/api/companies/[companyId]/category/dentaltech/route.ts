import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { validateManagerAndTechnician } from "@/lib/utils/validation/member";
import { getDentalTechCategoryByName } from "@/data/internal/category";
import { CreateDentalTechCategorySchema } from "@/schemas";
import { validateManager } from "@/lib/utils/validation/manager";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const { companyId } = await params;
  
    const accessToGet = await validateManagerAndTechnician(companyId);
  
    if (accessToGet instanceof NextResponse) {
      return accessToGet;
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
      return NextResponse.json({
        error: "ไม่พบข้อมูลหมวดหมู่",
        description: "เริ่มต้นด้วยการสร้างหมวดหมู่งานทันตกรรม",
      });
    }

    return NextResponse.json(categorys);
  } catch (error) {
    console.error("[DENTALTECH_CATEGORY_GET]", error);
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

  const validation = CreateDentalTechCategorySchema.safeParse(values);
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

  const existingCategory = await getDentalTechCategoryByName(name, companyId);

  if (existingCategory) {
    return NextResponse.json({ error: "ชื่อนี้ถูกใช้ไปแล้ว" }, { status: 409 });
  }

  try {
    const categories = await db.dentalTechCategory.create({
      data: {
        name,
        description,
        companyId,
        creatorUserId: manager.id,
      },
    });

    return NextResponse.json(
      {
        success: "เพิ่มหมวดหมู่รายการทันตกรรมสำเร็จ",
        categories,
      },
      { status: 201 }
    );
  } catch (error){
    console.error("[DENTALTECH_CATEGORY_POST]", error);
    return NextResponse.json (
      {
        error: "ไม่สามารถสร้างหมวดหมู่ได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500
      }
    )
  }
}
