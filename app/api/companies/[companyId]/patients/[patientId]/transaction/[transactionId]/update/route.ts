import {
  getPatientByCompanyId,
} from "@/data/internal/patient";
import { getPatientByTransactionId } from "@/data/internal/transaction";
import { db } from "@/lib/db";
import { validateManagerAndComanager } from "@/lib/utils/validation/member";
import { UpdateTransactionSchema } from "@/schemas";
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

  const accessToPatch = await validateManagerAndComanager(companyId);

  if (accessToPatch instanceof Response) {
    return accessToPatch;
  }

  const { member } = accessToPatch;

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

  const { addonItems, ...transactionData } = validation.data;

  const existingPatient = await getPatientByCompanyId(companyId, patientId);

  if (!existingPatient) {
    return NextResponse.json({ error: "ไม่พบคนไข้ที่ระบุ" }, { status: 404 });
  }

  try {
    await db.$transaction(async (values) => {
      if(Object.keys(transactionData).length > 0) {
        await values.transaction.update({
          where: {
            id: transactionId,
          },
          data: {
            ...transactionData,
            updaterUserId: member.id,
          },
        });
      }

      if (addonItems) {
        await values.transactionAddon.deleteMany({
          where: {
            transactionId
          },
        });

        if (addonItems.length > 0) {
          await values.transactionAddon.createMany({
            data: addonItems.map((item) => ({
              transactionId,
              addonItemId: item.addonItemId,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
            })),
          });
        }
      }
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
