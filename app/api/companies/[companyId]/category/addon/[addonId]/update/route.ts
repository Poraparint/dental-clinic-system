import { db } from "@/lib/db";
import { validateManager } from "@/lib/utils/validation/manager";
import { CreateAddOnCategorySchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; addonId: string }> }
) {
  const { companyId, addonId } = await params;

  const values = await request.json();

  const accessToPatch = await validateManager(companyId);

  if (accessToPatch instanceof Response) {
    return accessToPatch;
  }

  const validation = CreateAddOnCategorySchema.safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
      },
      { status: 400 }
    );
  }

  const dataToUpdate = validation.data;
  const { price, ...rest } = dataToUpdate;

  try {
    await db.addonItem.update({
      where: {
        id: addonId,

        companyId,
      },
      data: {
        ...rest,
        unitPrice: price,
      },
    });
    return NextResponse.json(
      {
        success: `อัปเดตข้อมูลหมวดหมู่สินค้าสำเร็จ`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[ADDON_PATCH]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถอัพเดตข้อมูลหมวดหมู่ได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
