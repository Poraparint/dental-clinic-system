"use server";

import * as z from "zod";

//database
import { db } from "@/lib/db";

//schemas
import { CreateRecheckSchema } from "@/schemas";

//lib
import { currentManagerAndDentist } from "@/lib/auth";
import { getCompanyById } from "@/data/internal/company";
import { getPatientByTransactionId } from "@/data/internal/transaction";
import { getRecheckByCompanyId } from "@/data/internal/recheck-dentaltech";
import { formatDateOnly } from "@/lib/utils/utils";

export const Recheck = async (
  values: z.infer<typeof CreateRecheckSchema>,
  companyId: string
) => {
  const validateFields = CreateRecheckSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { transactionId, recheckList } = validateFields.data;

  const existingRecheck = await getRecheckByCompanyId(transactionId, companyId);

  if (existingRecheck) {
    return { error: "รหัสธุรกรรมนี้ถูกใช้ไปแล้ว" };
  }

  const existingUser = await currentManagerAndDentist();
  if (!existingUser) {
    return { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" };
  }

  const existingCompany = await getCompanyById(companyId);
  if (!existingCompany) {
    return { error: "Company not found!" };
  }

  const patientId = await getPatientByTransactionId(transactionId);

  if (!patientId) {
    return { error: "รหัสธุรกรรมไม่ถูกต้องหรือไม่มีรหัสธุรกรรมนี้" };
  }

  try {
    const recheck = await db.recheck.create({
      data: {
        id: transactionId,
        companyId,
        patientId: patientId.patient.id,
        creatorUserId: existingUser.id,
      },
    });

    const recheckListData = recheckList.map((item) => ({
      recheckId: recheck.id,
      datetime: formatDateOnly(item.datetime),
      detail: item.detail,
      price: item.price,
      transactionCategoryId: item.tcId,
      scheduleId: item.scheduleId,
    }));

    await db.$transaction([
      ...recheckListData.map((data) => db.recheckList.create({ data })),
    ]);

    return { success: "เพิ่มรายการใหม่สำเร็จ" };
  } catch {
    return { error: "เกิดข้อผิดพลาดขณะสร้างรายการ" };
  }
};
