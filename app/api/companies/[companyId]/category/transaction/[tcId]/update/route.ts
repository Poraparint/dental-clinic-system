import { db } from "@/lib/db";
import { validateManager } from "@/lib/utils/validation/manager";
import { CreateTransactionCategorySchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; tcId: string }> }
) {
  const { companyId, tcId } = await params;

  const values = await request.json();

  const accessToPatch = await validateManager(companyId);

  if (accessToPatch instanceof Response) {
    return accessToPatch;
  }

  const validation = CreateTransactionCategorySchema.partial().safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
      },
      { status: 400 }
    );
  }

  const dataToUpdate = validation.data;

  try {
    await db.transactionCategory.update({
        where: {
          id: tcId,
        companyId,
      },
      data: {
        ...dataToUpdate,
      },
    });
    return NextResponse.json(
      {
        success: `อัปเดตข้อมูลหมวดหมู่ทำฟันสำเร็จ`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PATIENT_PATCH]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถอัพเดตข้อมูลหมวดหมู่ได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
