"use server";

import * as z from "zod";

//database
import { db } from "@/lib/db";

//schemas
import { CreateTransactionSchema } from "@/schemas";

//lib
import { currentManagerAndDentist } from "@/lib/auth";
import { getPatientByCompanyId } from "@/data/internal/patient";

export const createTransaction = async (
  values: z.infer<typeof CreateTransactionSchema>,
  patientId: string,
  companyId: string
) => {
  const validateFields = CreateTransactionSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { datetime, transactionCategoryId, detail, price, paid } =
    validateFields.data;

  try {
    const existingUser = await currentManagerAndDentist();
    if (!existingUser) {
      console.log(`Manager with ID ${existingUser} not found`);
      return { error: "คุณไม่มีสิทธิเข้าถึงข้อมูลน้ี" };
    }
      
      

    const existingCompany = await getPatientByCompanyId(patientId, companyId);
    if (!existingCompany) {
      return { error: "Company not found!" };
    }

    await db.transaction.create({
      data: {
        datetime: new Date(datetime),
        transactionCategoryId,
        detail,
        price,
        paid,
        patientId,
        creatorUserId: existingUser.id,
      },
    });

    return { success: "เพิ่มรายการใหม่สำเร็จ" };
  } catch {
    return { error: "เกิดข้อผิดพลาดขณะสร้างรายการ" };
  }
};
