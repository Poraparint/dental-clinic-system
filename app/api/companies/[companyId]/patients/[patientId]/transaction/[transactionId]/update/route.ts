import {
  getPatientByCompanyId,
} from "@/data/internal/patient";
import { getCreatorIdByTransactionId, getPatientByTransactionId } from "@/data/internal/transaction";
import { db } from "@/lib/db";
import { validateManagerAndDentist } from "@/lib/utils/validation/member";
import { UpdateTransactionSchema } from "@/schemas";
import { CompanyRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      companyId: string;
      patientId: string;
      transactionId: string;
    }>;
  }
) {
  const { companyId, patientId, transactionId } = await params;

  const values = await request.json();

  const accessToPatch = await validateManagerAndDentist(companyId);

  if (accessToPatch instanceof Response) {
    return accessToPatch;
  }

  const { member } = accessToPatch;

  if (member.role === CompanyRole.DENTIST) {
    const creator = await getCreatorIdByTransactionId(patientId, transactionId);

    if (!creator) {
      return NextResponse.json(
        {
          error: "ไม่พบข้อมูลคนไข้",
          description: "ไม่สามารถตรวจสอบผู้สร้างได้",
        },
        { status: 404 }
      );
    }
    if (creator.creatorUserId !== member.id) {
      return NextResponse.json(
        {
          error: "คุณไม่มีสิทธิ์แก้ไขคนไข้รายนี้",
          description: "เฉพาะผู้สร้างรายการเท่านั้นที่สามารถแก้ไขได้",
        },
        { status: 403 }
      );
    }
  }

  const existingTransaction = await getPatientByTransactionId(transactionId);

  if (!existingTransaction || existingTransaction.patientId !== patientId) {
    return NextResponse.json(
      {
        error: "ไม่พบธุรกรรมนี้ในคนไข้ที่ระบุ",
      },
      { status: 404 }
    );
  }

  const validation = UpdateTransactionSchema.safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
      },
      { status: 400 }
    );
  }

  const dataToUpdate = validation.data;

  const existingPatient = await getPatientByCompanyId(companyId, patientId);

  if (!existingPatient) {
    return NextResponse.json({ error: "ไม่พบคนไข้ที่ระบุ" }, { status: 404 });
  }

  try {
    await db.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        ...dataToUpdate,
        updaterUserId: member.id,
      },
    });
    return NextResponse.json(
      {
        success: `อัปเดตข้อมูลธุรกรรมสำเร็จ`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[TRANSACTION_PATCH]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถอัพเดตรายการธุรกรรมได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
